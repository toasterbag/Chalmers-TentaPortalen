import fetch from "node-fetch";
import cheerio from "cheerio";
import { getYear, getMonth } from "date-fns";

import {
  scrape_all_programmes,
  get_active_programmes,
} from "@app/import/programmes";
import { scrape_periods } from "@app/import/periods";

import { scrape_instances_for_id } from "@app/import/instance";
import { scrape_survey } from "@app/import/survey";
import { date_to_academic_year, Queue } from "@app/utils";
import { Logger } from "@app/logger";

const Log = new Logger({ label: "Studieportalen" });
const CONCURRENCY = 16;
// We COULD go further back but there won't be any exams or surveys at that point
const START_YEAR = 2010;

// WARNING ACHTUNG
// This code is dangerous!!!
// Parsing the student portal is difficult because everything is just html tables
// and you can't expect it to conform to anything really.
// I will try my best to comment the code below. Please don't judge me too harshly

const get_all_course_ids = async () => {
  const CURRENT_YEAR = getYear(new Date());

  // TODO this might break during the spring semester
  // the problem is that during the autumn we want to look at 
  // CURRENT_YEAR + 2 and during the spring its CURRENT_YEAR + 1
  // This is an easy fix but I am always scared when I have to change
  // stuff in the import code :(
  const years = Array(CURRENT_YEAR + 2 - START_YEAR)
    .fill(0)
    .map((_, i) => new Date(i + START_YEAR, 1))
    .map((e) => date_to_academic_year(e));

  const queue = new Queue(years);
  let instance_ids = await queue.start(async (academic_year) => {
    console.log(academic_year);
    const ids = [];
    const base_url = `https://www.student.chalmers.se/sp/course_list`;
    const query = {
      flag: 1,
      sortorder: "CODE",
      //search_course_code: "SSY080",
      search_ac_year: academic_year,
      query_start: 0,
      batch_size: 5000, // We will never have this many courses so it should give all of them in one page
    };

    let queryString = Object.entries(query)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    let res = await fetch(`${base_url}?${queryString}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    let finished = false;
    $("tbody tbody").each((i, table) => {
      // If we fount the right table already we skip the rest
      if (finished == true) return;
      // If this element exists within the table it means we got the right one
      const header = $(table).find("td.tableHeader:contains('Kod')");
      if (header.length > 0) {
        $("tr:nth-child(n+3)", table).each((i, row) => {
          const course_link = $(row).find("td:first-child a");
          const id = $(course_link).attr("href").replace(/.*=/, "");
          const code = $(course_link).text();
          ids.push({ code, id });
        });
        finished = true;
      }
    });
    return ids;
  }, CONCURRENCY);

  return instance_ids.flat();
};

const import_programmes = async (context) => {
  const programmes = await scrape_all_programmes(context, 2010);
  await context.prisma.programme.createMany({
    data: programmes,
    skipDuplicates: true,
  });
  Log.success("Finished importing programmes");
};

const import_instances = async (context) => {
  const programme_codes = (
    await context.prisma.programme.findMany({
      select: {
        code: true,
      },
    })
  ).map((e) => e.code);

  let instances_in_db = (await context.prisma.courseInstance.findMany({})).map(
    (i) => i.study_portal_id,
  );
  instances_in_db = new Set(instances_in_db);
  const all_instance_ids = await get_all_course_ids();
  const missing_instances = all_instance_ids.filter(
    ({ id }) => !instances_in_db.has(id),
  );

  Log.info(
    `Got ${all_instance_ids.length} course instances, filtered down to ${missing_instances.length}`,
  );
  const queue = new Queue(missing_instances);
  await queue.start(async ({ code, id }) => {
    let { instances, course, department } = await scrape_instances_for_id(
      code,
      id,
    );
    if (instances.isEmpty()) {
      Log.warn(`No instances found for ${course.course_code}`);
      return;
    }
    // Skip all non-chalmers courses, GU programmes owns a couple
    // and we can't match against those as they aren't included in our ladok reports
    // Example: KBT050 2009/2010 is owned by FARGU
    if (!programme_codes.includes(course.owner_code)) {
      Log.warn(
        `Skipping ${course.course_code}, ${instances[0].academic_year}. Programme '${course.owner_code}' does not exist in database`,
      );
      return;
    }
    await context.prisma.department.upsert({
      where: { id: department.id },
      create: department,
      update: department,
    });

    await context.prisma.course.upsert({
      where: { course_code: course.course_code },
      create: course,
      update: course,
    });

    await context.prisma.courseInstance.createMany({
      data: instances,
      skipDuplicates: true,
    });

    Log.info(`Imported ${course.course_code}, ${instances[0].academic_year}`);
  }, CONCURRENCY);

  Log.success("Finished importing courses and instances");
};

const import_surveys = async (context) => {
  // Filter out instances that we already have surveys for
  let instances = await context.prisma.courseInstance.findMany();
  const surveys_in_database = await context.prisma.survey.findMany({});
  instances = instances
    .filter(
      (i) =>
        !surveys_in_database.some(
          (s) =>
            s.course_code == i.course_code &&
            s.academic_year == i.academic_year &&
            s.start_period == i.start_period,
        ),
    )
    .filter((i) => Number(i.academic_year.split("/")[0]) >= 2012);

  const queue = new Queue(instances);
  await queue.start(async (instance) => {
    const survey = await scrape_survey(context, instance);
    if (survey && survey.minutes_url) {
      delete survey.minutes_url;
      await context.prisma.survey.createMany({
        data: [survey],
        skipDuplicates: true,
      });
    }
    return survey;
  }, CONCURRENCY);
  Log.success("Finished importing surveys");
};

// Chalmers IT hate him!!!
// This guy scraped ALL courses in JUST seven MINUTES
// with this ONE WIERD TRICK
// No but really running this the first time takes forever.
// Chalmers servers are really slow (chalmers.se is running Windows Server 2008)
// As long as the terminal is printing everything is fine, expect this to take up to 24 hours
// I haven't been rate limited yet but I can just feel it coming, run it behind a VPN or something
const scrape_everything = async (context) => {
  Log.info("Started scraping");

  const periods = await scrape_periods();
  const collisions = {};
  for (const p of periods) {
    if (collisions[p.academic_year + p.study_period + p.type]) {
      console.log(collisions[p.academic_year + p.study_period + p.type], p);
    } else {
      collisions[p.academic_year + p.study_period + p.type] = p;
    }
  }

  await context.prisma.period.createMany({
    data: periods,
    skipDuplicates: true,
  });
  Log.info("Finished fetching exam periods");

  await import_programmes(context);
  await context.prisma.programme.updateMany({ data: { active: false } });
  for (const code of await get_active_programmes()) {
    await context.prisma.programme.update({
      data: { active: true },
      where: { code },
    });
  }

  await import_instances(context);
  await import_surveys(context);

  Log.success("Finished scraping the study portal");
};
export { scrape_everything };

import fetch from "node-fetch";
import cheerio from "cheerio";
import { ERROR_TYPES as ImportError } from "./error";
import { Logger } from "@app/logger";
const Log = new Logger({ label: "Studieportalen" });

class Instance {
  constructor(obj) {
    for (let [key, val] of Object.entries(obj)) {
      this[key] = val;
    }
  }
  print_label() {
    `[${this.course_code}, ${this.academic_year} SP${this.start_period}-SP${this.end_period}]`;
  }
}

// Assumptions about courses and the course page layout you might think hold but really don't

// - Every course is held once a year or has a different course code otherwise
// No! A course might be held once every study period and if thats the case
// the course page layout will be different
// Example TDA384

// - A course has to be held every year.
// No! The department responsible for the course may for a variety of
// reasons decide not to arrange the course, sometimes with short notice.

// - A course will always be held in the same study period
// No! Sometimes they change what study period a course is held in.

// - A course is always one study period.
// No! And that is why parsing which study period a course is held in is difficult.
// The only way that the page display what study period a course might be held in is during which
// study period each examination moment is held in.
// Example DATX02

const scrape_instances_for_id = async (course_code, study_portal_id) => {
  if (study_portal_id === ImportError.COURSE_INSTANCE_NOT_FOUND) {
    return ImportError.COURSE_INSTANCE_NOT_FOUND;
  }
  //const url = `https://www.student.chalmers.se/sp/print_course?course_id=${study_portal_id}`;

  let result = [];
  try {
    const [res_sv, res_en] = await Promise.all([
      fetch(
        `https://student.portal.chalmers.se/sv/chalmersstudier/minkursinformation/Sidor/SokKurs.aspx?course_id=${study_portal_id}&parsergrp=3`,
        { timeout: 30_000 + Math.random() * 5000 },
      ),
      fetch(
        `https://student.portal.chalmers.se/en/chalmersstudies/courseinformation/Pages/SearchCourse.aspx?course_id=${study_portal_id}&parsergrp=3`,
        {
          timeout: 30_000 + Math.random() * 5000,
        },
      ),
    ]);
    result = await Promise.all([res_sv.text(), res_en.text()]);
  } catch (e) {
    if (e.type == "request-timeout") {
      Log.warn(
        `Timeout requesting the page for '${course_code}' instance ${study_portal_id}. Retrying...`,
      );
      return scrape_instances_for_id(course_code, study_portal_id);
    }
  }
  const [html_sv, html_en] = result;

  const $ = cheerio.load(html_sv);
  const $en = cheerio.load(html_en);

  const instances = [];

  const academic_year = $("select[name='course_id'] option[selected]")
    .text()
    .trim();
  const owner_code = $(".H5").text().replace(/.*:/, "").trim();
  const name_sv = $(".H3").text().replace(/.*?-/, "").trim();
  const name_en = $en(".H3").text().replace(/.*?-/, "").trim();
  let department_id;
  let department_sv;
  let department_en;

  $("table table tr tr")
    .toArray()
    .forEach((e) => {
      if ($(e).text().includes("Institution")) {
        const x = $(e)
          .text()
          .trim()
          .replace(/.*:/, "")
          .split(" - ")
          .map((s) => s.trim());
        department_id = Number(x[0]);
        department_sv = x[1];
      }
    });

  $en("table table tr tr")
    .toArray()
    .forEach((e) => {
      if ($en(e).text().includes("Department:")) {
        const x = $en(e)
          .text()
          .trim()
          .replace(/.*:/, "")
          .split(" - ", 2)
          .map((s) => s.trim());
        department_en = x[1];
      }
    });

  $("table table").each((i, e) => {
    const is_study_period_table = $(e).find(
      "td > img[src='https://www.student.chalmers.se/sp/images/ico_info.gif']",
    );
    if (is_study_period_table.length) {
      const instance = new Instance({
        course_code,
        study_portal_id,
      });
      const is_sp1 =
        $(e).find("tr:nth-child(n+3) td:nth-child(6)").html().trim().length > 0;
      const is_sp2 =
        $(e).find("tr:nth-child(n+3) td:nth-child(7)").html().trim().length > 0;
      const is_sp3 =
        $(e).find("tr:nth-child(n+3) td:nth-child(8)").html().trim().length > 0;
      const is_sp4 =
        $(e).find("tr:nth-child(n+3) td:nth-child(9)").html().trim().length > 0;
      const is_summer =
        $(e).find("tr:nth-child(n+3) td:nth-child(10)").html().trim().length >
        0;

      // Study period 0 means its a summer course
      const magic = [is_summer, is_sp1, is_sp2, is_sp3, is_sp4];
      instance.start_period = magic.indexOf(true);
      instance.end_period = magic.lastIndexOf(true);
      instances.push(instance);
    }
  });

  instances.forEach((i) => Object.assign(i, { academic_year }));

  if (department_id === undefined) {
    throw new Error(`Course '${study_portal_id}' missing departmend_id`);
  }

  if (department_sv === undefined) {
    throw new Error(`Course '${study_portal_id}' missing departmend_sv`);
  }

  if (department_en === undefined) {
    throw new Error(`Course '${study_portal_id}' missing department_en`);
  }

  return {
    department: {
      id: department_id,
      name_sv: department_sv,
      name_en: department_en,
    },
    instances: instances,
    course: { course_code, owner_code, name_sv, name_en, department_id },
  };
};

export { scrape_instances_for_id };

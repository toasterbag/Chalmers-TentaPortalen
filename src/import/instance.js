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
  const url = `https://www.student.chalmers.se/sp/print_course?course_id=${study_portal_id}`;
  //const url = `https://student.portal.chalmers.se/sv/chalmersstudier/minkursinformation/Sidor/SokKurs.aspx?course_id=${study_portal_id}&parsergrp=3`

  const [res_sv, res_en] = await Promise.all([
    fetch(url),
    fetch(url, { headers: { Cookie: "lang='en'" } }),
  ]);
  const [html_sv, html_en] = await Promise.all([res_sv.text(), res_en.text()]);

  const $ = cheerio.load(html_sv);
  const $en = cheerio.load(html_en);

  const instances = [];

  $("table").each((i, e) => {
    const is_study_period_table = $(e).find(
      "td > img[src='images/ico_info.gif']",
    );
    if (is_study_period_table.length) {
      const instance = new Instance({
        course_code,
        study_portal_id,
        academic_year,
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

  const academic_year = $("select[name='course_id'] option[selected]").text();
  const owner_code = $(".H5").text().replace(/.*:/, "").trim();
  const name_sv = $(".H3").text().replace(/.*-/, "").trim();

  const name_en = $en(".H3").text().replace(/.*-/, "").trim();

  instances.forEach((i) => Object.assign(i, { academic_year }));

  return {
    instances: instances,
    course: { course_code, owner_code, name_sv, name_en },
  };
};

export { scrape_instances_for_id };

import fetch from "node-fetch";
import cheerio from "cheerio";
import { get_user_agent, is_defined } from "@app/utils/index";
import {
  CourseInstance,
  CourseModule,
  Electivity,
  Examiner,
  ModuleDates,
  ProgrammePlanEntry,
} from "@prisma/client";

// class Instance {
//   constructor(obj) {
//     for (let [key, val] of Object.entries(obj)) {
//       this[key] = val;
//     }
//   }
//   print_label() {
//     `[${this.course_code}, ${this.academic_year} SP${this.start_period}-SP${this.end_period}]`;
//   }
// }

// Assumptions about courses and the course page layout you might think hold but really don't
// TODO move this to the github wiki

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

export type ErrorKind =
  | "CouldNotParseEnglishDepartmentName"
  | "CouldNotParseSwedishDepartmentName"
  | "CouldNotParseTeachingLanguage"
  | "CouldNotParseExaminer"
  | "CourseIsGymnasieLevel"
  | "CourseIsPreeducationLevel"
  | "CourseInstanceCancelled"
  | "NoInstancesFound";

class InstanceFetchError extends Error {
  public readonly kind: ErrorKind;

  public readonly study_portal_id: string;

  constructor(kind: ErrorKind, study_portal_id: string) {
    super();
    this.kind = kind;
    this.study_portal_id = study_portal_id;
  }

  toString() {
    return `Error: ${this.kind} for id '${this.study_portal_id}'`;
  }
}

const is_examiner = (obj: any): obj is Examiner => {
  return obj.cid && obj.name;
};
const thesis_regex = /[[A-Z]{3}X[0-9]{2}]/;

const months: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  Maj: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Okt: "10",
  Nov: "11",
  Dec: "12",
};
const month_map = (month: string) =>
  month in months ? months[month] : undefined;

const date_regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const parse_exam_date = (s: string) => {
  const date = s.slice(0, 2);
  const month = month_map(s.slice(3, 6));
  const year = s.slice(7, 11);
  const expr = `${year}-${month}-${date}`;
  if (date_regex.test(expr)) return expr;
  return null;
};

const fetch_course_instance_page = async (
  study_portal_id: string,
): Promise<[string, string]> => {
  try {
    const [res_sv, res_en] = await Promise.all([
      fetch(
        `https://student.portal.chalmers.se/sv/chalmersstudier/minkursinformation/Sidor/SokKurs.aspx?course_id=${study_portal_id}&parsergrp=3`,
        {
          timeout: 30_000 + Math.random() * 5000,
          headers: {
            "User-Agent": get_user_agent(),
          },
        },
      ),
      fetch(
        `https://student.portal.chalmers.se/en/chalmersstudies/courseinformation/Pages/SearchCourse.aspx?course_id=${study_portal_id}&parsergrp=3`,
        {
          timeout: 30_000 + Math.random() * 5000,
          headers: {
            "User-Agent": get_user_agent(),
          },
        },
      ),
    ]);
    return await Promise.all([res_sv.text(), res_en.text()]);
  } catch (e: any) {
    if (e.type === "request-timeout") {
      console.warn(
        `Timeout requesting the page for instance ${study_portal_id}. Retrying...`,
      );
      return await fetch_course_instance_page(study_portal_id);
    }

    console.error("Unknown error when fetching course instance page");
    console.error(e);
    throw e;
  }
};

interface Instance {
  department: {
    id: number;
    name_sv: string;
    name_en: string;
  };
  instances: Array<CourseInstance>;
  modules: Array<CourseModule>;
  module_dates: Array<ModuleDates>;
  course: {
    course_code: string;
    owner_code: string;
    name_sv: string;
    name_en: string;
    department_id: number;
  };
  programme_plan_entries: Array<ProgrammePlanEntry>;
  examiners: Array<Examiner>;
}

const parse_electivity = (s: string): Electivity => {
  switch (s) {
    case "compulsory":
      return Electivity.Compulsory;
    case "elective":
      return Electivity.Elective;
    case "compulsory elective":
      return Electivity.ElectiveCompulsory;
    default:
      return Electivity.NotApplicable;
  }
};

const scrape_instances_for_id = async (
  course_code: string,
  study_portal_id: string,
): Promise<Instance | InstanceFetchError> => {
  const [html_sv, html_en] = await fetch_course_instance_page(study_portal_id);

  // if (html_sv.includes("kan ej ingå i Chalmersexamen")) {
  //   return new InstanceFetchError("CourseIsGymnasieLevel", study_portal_id);
  // }

  if (html_sv.includes("<b>Utbildningsnivå:</b>&nbsp;Gymnasial nivå")) {
    return new InstanceFetchError("CourseIsGymnasieLevel", study_portal_id);
  }

  if (html_sv.includes("<b>Utbildningsnivå:</b>&nbsp;Förutbildningsnivå")) {
    return new InstanceFetchError("CourseIsPreeducationLevel", study_portal_id);
  }

  if (html_sv.includes("Detta kurstillfälle är inställt")) {
    return new InstanceFetchError("CourseInstanceCancelled", study_portal_id);
  }

  const $sv = cheerio.load(html_sv);
  const $en = cheerio.load(html_en);

  const academic_year = $sv("select[name='course_id'] option[selected]")
    .text()
    .trim();
  const owner_code = $sv(".H5").text().replace(/.*:/, "").trim();
  const name_sv = $sv(".H3").text().replace(/.*?-/, "").trim();
  const name_en = $en(".H3").text().replace(/.*?-/, "").trim();

  const res = $sv("table table tr tr")
    .toArray()
    .find((e) => {
      if ($sv(e).text().includes("Institution")) {
        return true;
      }
      return false;
    });
  if (res === undefined) {
    return new InstanceFetchError(
      "CouldNotParseSwedishDepartmentName",
      study_portal_id,
    );
  }

  const [department_id, department_sv] = $sv(res)
    .text()
    .trim()
    .replace(/.*:/, "")
    .split(" - ")
    .map((s) => s.trim());

  const en_department_el = $en("table table tr tr")
    .toArray()
    .find((e) => {
      if ($en(e).text().includes("Department:")) {
        return true;
      }
      return false;
    });

  if (en_department_el === undefined) {
    return new InstanceFetchError(
      "CouldNotParseEnglishDepartmentName",
      study_portal_id,
    );
  }

  const department_en = $en(en_department_el)
    .text()
    .trim()
    .replace(/.*:/, "")
    .split(" - ", 2)
    .map((s) => s.trim())[1];

  const examiners = $sv("a")
    .toArray()
    .filter((e) => {
      if (
        $sv(e)
          .attr("href")
          ?.includes(
            "http://www.chalmers.se/_layouts/ChalmersPublicWeb/ProfilePage.aspx",
          )
      ) {
        return true;
      }
      return false;
    })
    .map((el) => ({
      cid: $sv(el)
        .attr("href")
        ?.split("?")[1]
        ?.split("&")
        .find((s) => s.startsWith("cid="))
        ?.replace("cid=", ""),
      name: $sv(el).text().trim(),
    }))
    .filter(is_examiner);

  if (examiners.isEmpty()) {
    return new InstanceFetchError("CouldNotParseExaminer", study_portal_id);
  }

  const lang_el = $en("table table p")
    .toArray()
    .find((e) => {
      const text = $en(e).text();
      if (text.includes("Teaching language:")) {
        return true;
      }
      return false;
    });

  let language: string;
  if (lang_el) {
    language = $en(lang_el)
      .text()
      .split("\n")
      .filter((x) => x.includes("Teaching language:"))[0]
      .replace(/.*:/, "")
      .trim();
  } else if (thesis_regex.test(course_code)) {
    language = "English";
  } else {
    return new InstanceFetchError(
      "CouldNotParseTeachingLanguage",
      study_portal_id,
    );
  }

  const instances = $sv(".table-responsive > table > tbody")
    .toArray()
    .map((e) => {
      const is_study_period_table = $sv(e).find(
        "td > img[src='https://www.student.chalmers.se/sp/images/ico_info.gif']",
      );
      if (is_study_period_table.length) {
        const modules = $sv("tr:nth-child(n+3)", e)
          .toArray()
          .map((module_el) => {
            if ($sv(module_el).text().includes("Ansvarig")) {
              return undefined;
            }

            const get_cell = (index: number) =>
              $sv(`td:nth-child(${index})`, module_el).text();
            const get_points = (index: number) => {
              const el = get_cell(index);
              return el.includes("hp")
                ? el.replace(",", ".").replace("hp", "").trim()
                : undefined;
            };
            const module_id = get_cell(1);
            const kind = get_cell(2);
            const points = Number(
              get_cell(3).replace(",", ".").replace("hp", "").trim(),
            );

            const sp1_points = get_points(6);
            const sp2_points = get_points(7);
            const sp3_points = get_points(8);
            const sp4_points = get_points(9);
            const summer_points = get_points(10);
            // const misc_points = get_points(11);

            const primary_date = parse_exam_date(get_cell(13).trim());
            const secondary_date = parse_exam_date(get_cell(14).trim());
            const tertiary_date = parse_exam_date(get_cell(15).trim());

            // Study period 0 means its a summer course
            const study_periods = [
              is_defined(summer_points),
              is_defined(sp1_points),
              is_defined(sp2_points),
              is_defined(sp3_points),
              is_defined(sp4_points),
            ];
            return {
              module: {
                course_instance_id: study_portal_id,
                module_id,
                kind,
                points: Number(points) * 10,
                start_period: study_periods.indexOf(true),
                end_period: study_periods.lastIndexOf(true),
              },
              dates:
                primary_date !== null
                  ? {
                      course_instance_id: study_portal_id,
                      module_id,
                      primary_date,
                      secondary_date,
                      tertiary_date,
                    }
                  : undefined,
            };
          })
          .filter(is_defined);

        return {
          instance: {
            course_code,
            study_portal_id,
            language,
            academic_year,
            start_period: modules.reduce(
              (start, { module }) =>
                module.start_period > start ? module.start_period : start,
              0,
            ),
            end_period: modules.reduce(
              (end, { module }) =>
                module.end_period > end ? module.end_period : end,
              0,
            ),
            examiner_cid: examiners[0].cid,
          },
          modules,
        };
      }
      return undefined;
    })
    .filter(is_defined);

  if (instances.isEmpty()) {
    return new InstanceFetchError("NoInstancesFound", study_portal_id);
  }

  const programme_plan_entries = $en("table table a")
    .toArray()
    .filter(
      (e) =>
        $en(e)
          .attr("href")
          ?.includes(
            "/en/chalmersstudies/courseinformation/Pages/SearchCourse.aspx",
          ) && $en(e).text().includes("Year"),
    )
    .map((e) => {
      const text = $en(e).text().trim();
      // console.log(text, study_portal_id);
      const href = $en(e).attr("href") as string;
      const href_query: Map<string, string> = href
        .replace(/.*\?/g, "")
        .split("&")
        .map((kv) => kv.split("="))
        .reduce((map, [k, v]) => {
          map.set(k, v);
          return map;
        }, new Map());
      return {
        programme_code: text.split(/\s/)[0].trim(),
        programme_instance_id: href_query.get("program_id") ?? "ERROR",

        course_code,
        course_instance_id: study_portal_id,
        grade: Number(
          text.split(/,/).last().replace("Year", "").replace(/\(.*/, "").trim(),
        ),

        electivity: parse_electivity(
          (text.split("(")[1] ?? "N/A").replace(")", "").trim(),
        ),
      };
    });
  // console.log(programme_plan_entries);

  return {
    department: {
      id: Number(department_id),
      name_sv: department_sv,
      name_en: department_en,
    },
    instances: instances.map((e) => e.instance),
    modules: instances.flatMap((i) => i.modules.map((m) => m.module)),
    module_dates: instances.flatMap((i) =>
      i.modules.map((m) => m.dates).filter(is_defined),
    ),
    course: {
      course_code,
      owner_code,
      name_sv,
      name_en,
      department_id: Number(department_id),
    },
    examiners,
    programme_plan_entries,
  };
};
// /en/chalmersstudies/courseinformation/Pages/SearchCourse.aspx?program_id=1702&grade=1&conc_id=-1&parsergrp=2
export { scrape_instances_for_id };

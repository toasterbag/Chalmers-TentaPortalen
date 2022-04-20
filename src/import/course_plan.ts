// import fetch, { Response } from "node-fetch";
// import cheerio from "cheerio";
// import { Logger } from "@app/logger";
// import { AcademicYear, getUserAgent } from "@app/utils";

// const url = "";
// const Log = new Logger({ label: "Import" });

// const retry_on_timeout = <R>(f: any, ...args: any[]): (() => R) => {
//   try {
//     return f();
//   } catch (e: any) {
//     if (e.type == "request-timeout") {
//       return f(...args);
//     }

//     Log.error("Unknown error when fetching programme overview page");
//     console.error(e);
//     process.exit(-1);
//   }
// };

// const fetch_course_plan_overview_page = async (
//   year: AcademicYear,
// ): Promise<Response> => {
//   const query = {
//     flag: 1,
//     query_start: 0,
//     batch_size: 200,
//     sortorder: "NAME",
//     search_ac_year: year.toString(),
//     parsergrp: 0,
//   };

//   const query_string = Object.entries(query)
//     .map(([k, v]) => `${k}=${v}`)
//     .join("&");
//   return fetch(
//     `https://student.portal.chalmers.se/sv/chalmersstudier/programinformation/Sidor/SokProgramutbudet.aspx?${query_string}`,
//     {
//       timeout: 30_000 + Math.random() * 5000,
//       headers: {
//         "User-Agent": getUserAgent(),
//       },
//     },
//   );
// };

// const fetch_course_plan_page = async (
//   id: string,
//   grade: number,
// ): Promise<Response> => {
//   const query = {
//     program_id: id,
//     parsergrp: 1,
//     grade,
//   };

//   const query_string = Object.entries(query)
//     .map(([k, v]) => `${k}=${v}`)
//     .join("&");
//   return fetch(
//     `https://student.portal.chalmers.se/sv/chalmersstudier/programinformation/Sidor/SokProgramutbudet.aspx?${query_string}`,
//     {
//       timeout: 30_000 + Math.random() * 5000,
//       headers: {
//         "User-Agent": getUserAgent(),
//       },
//     },
//   );
// };

// interface InstanceData {
//   course_code: string;
//   study_portal_id: string;
//   start_period: number;
//   end_period: number;
//   language: string;
// }

// function is_instance_data(obj: any): obj is InstanceData {
//   return (
//     obj
//     && obj.course_code
//     && obj.study_portal_id
//     && obj.start_period
//     && obj.end_period
//     && obj.language
//   );
// }

// const scrape_instances_for_id = async (
//   course_code: string,
//   study_portal_id: string,
// ) => {
//   const [html_sv, html_en] = await fetch_course_instance_page(study_portal_id);

//   const $sv = cheerio.load(html_sv);
//   const $en = cheerio.load(html_en);

//   const academic_year = $sv("select[name='course_id'] option[selected]")
//     .text()
//     .trim();
//   const owner_code = $sv(".H5").text().replace(/.*:/, "").trim();
//   const name_sv = $sv(".H3").text().replace(/.*?-/, "").trim();
//   const name_en = $en(".H3").text().replace(/.*?-/, "").trim();
//   let department_id;
//   let department_sv;
//   let department_en;
//   let language: string;

//   $sv("table table tr tr")
//     .toArray()
//     .forEach((e) => {
//       if ($sv(e).text().includes("Institution")) {
//         const x = $sv(e)
//           .text()
//           .trim()
//           .replace(/.*:/, "")
//           .split(" - ")
//           .map((s) => s.trim());
//         department_id = Number(x[0]);
//         department_sv = x[1];
//       }
//     });

//   $en("table table tr tr")
//     .toArray()
//     .forEach((e) => {
//       if ($en(e).text().includes("Department:")) {
//         const x = $en(e)
//           .text()
//           .trim()
//           .replace(/.*:/, "")
//           .split(" - ", 2)
//           .map((s) => s.trim());
//         department_en = x[1];
//       }
//     });

//   $en("table table p")
//     .toArray()
//     .forEach((e) => {
//       const text = $en(e).text();
//       if (text.includes("Teaching language:")) {
//         language = $en(e)
//           .text()
//           .split("\n")
//           .filter((x) => x.includes("Teaching language:"))[0]
//           .replace(/.*:/, "")
//           .trim();
//       }
//     });

//   const instances = $sv("table table")
//     .toArray()
//     .map((e) => {
//       const is_study_period_table = $sv(e).find(
//         "td > img[src='https://www.student.chalmers.se/sp/images/ico_info.gif']",
//       );
//       if (is_study_period_table.length) {
//         const is_sp1 = $sv("tr:nth-child(n+3) td:nth-child(6)", e)
//           .toArray()
//           .filter((cell) => $sv(cell).text().includes("hp")).length > 0;
//         const is_sp2 = $sv("tr:nth-child(n+3) td:nth-child(7)", e)
//           .toArray()
//           .filter((cell) => $sv(cell).text().includes("hp")).length > 0;
//         const is_sp3 = $sv("tr:nth-child(n+3) td:nth-child(8)", e)
//           .toArray()
//           .filter((cell) => $sv(cell).text().includes("hp")).length > 0;
//         const is_sp4 = $sv("tr:nth-child(n+3) td:nth-child(9)", e)
//           .toArray()
//           .filter((cell) => $sv(cell).text().includes("hp")).length > 0;
//         const is_summer = $sv("tr:nth-child(n+3) td:nth-child(10)", e)
//           .toArray()
//           .filter((cell) => $sv(cell).text().includes("hp")).length > 0;

//         // Study period 0 means its a summer course
//         const magic = [is_summer, is_sp1, is_sp2, is_sp3, is_sp4];

//         return {
//           course_code,
//           study_portal_id,
//           language,
//           start_period: magic.indexOf(true),
//           end_period: magic.lastIndexOf(true),
//         };
//       }
//       return undefined;
//     });

//   $sv("table table a")
//     .toArray()
//     .filter((e) => ($sv(e).attr("href") ?? "").startsWith("programplan"))
//     .map((e) => {
//       console.log($sv(e).text);
//     });

//   if (department_id === undefined) {
//     throw new Error(`Course '${study_portal_id}' missing department_id`);
//   }

//   if (department_sv === undefined) {
//     throw new Error(`Course '${study_portal_id}' missing department_sv`);
//   }

//   if (department_en === undefined) {
//     throw new Error(`Course '${study_portal_id}' missing department_en`);
//   }

//   return {
//     department: {
//       id: department_id,
//       name_sv: department_sv,
//       name_en: department_en,
//     },
//     instances: instances
//       .filter(is_instance_data)
//       .map((x) => Object.assign(x, { academic_year })),
//     course: {
//       course_code, owner_code, name_sv, name_en, department_id,
//     },
//     course_plan_entries: [],
//   };
// };

// export { scrape_instances_for_id };

import chalk from "chalk";
import { Context } from "@app/context";
import { AcademicYear, is_defined } from "@app/utils";
import type { WorkSheet } from "xlsx";
import XLSX from "xlsx";
import { ModuleResult } from ".prisma/client";

type Grade = "TG" | "G" | "U" | "3" | "4" | "5";

const grade_to_column_name = (grade: Grade) => {
  switch (grade) {
    case "3":
      return "three";
    case "G":
      return "three";
    case "4":
      return "four";
    case "5":
      return "five";
    case "U":
      return "failed";
    default:
      throw Error(`Invalid grade identifier '${grade}'`);
  }
};

function get_cell_data(sheet: any, column: string, row: string) {
  const key = `${column}${row}`;
  if (key in sheet) {
    return sheet[key].w;
  }
  return "";
}

function parse_row(sheet: any, row: any) {
  let date = get_cell_data(sheet, "H", row);
  if (date.includes("/")) {
    const units = date.split("/");
    date = `${units[2]}-${units[0].padStart(2, "0")}-${units[1].padStart(
      2,
      "0",
    )}`;
    if (date.length === 8) {
      date = `20${date}`;
    }
  }

  return {
    code: get_cell_data(sheet, "A", row),
    name: get_cell_data(sheet, "B", row),
    owner: get_cell_data(sheet, "C", row),
    module_id: get_cell_data(sheet, "E", row),
    module_name: get_cell_data(sheet, "F", row),
    points: Number(get_cell_data(sheet, "G", row)).mul(10),
    date,
    student_count: get_cell_data(sheet, "J", row),
    grade: get_cell_data(sheet, "I", row),
  };
}

const parse_data_sheet = (sheet: WorkSheet) => {
  const modules: Record<
    string,
    Record<string, Record<string, ModuleResult>>
  > = {};

  const row_count = sheet["!ref"]?.split(":")[1].substr(1);
  if (row_count === undefined) return undefined;

  for (const row_index of range(2, Number(row_count))) {
    const data = parse_row(sheet, row_index);
    if (data === undefined) {
      console.error(`Couldn't parse row ${row_index}`);
      continue;
    } else if (
      // GU courses
      data.owner === "FARGU" ||
      // Tillgodoräknat
      data.grade === "TG" ||
      // Formal passing grade (Not in general use at Chalmers)
      data.grade === "D"
    ) {
      continue;
    }

    if (!(data.code in modules)) {
      modules[data.code] = {};
    }

    const by_course = modules[data.code];

    if (!(data.date in by_course)) {
      by_course[data.date] = {};
    }

    const by_date = by_course[data.date];

    if (!(data.module_id in by_date)) {
      by_date[data.module_id] = {
        academic_year: AcademicYear.from_date(new Date(data.date)).toString(),
        module_id: data.module_id,
        course_code: data.code,
        date: data.date,
        grading_system: "ThreeFourFive",
        name: data.module_name,
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
        points: data.points,
      };
    }

    const module = by_date[data.module_id];

    if (data.grade === "G") {
      module.grading_system = "PassFail";
    }

    const grading_key = grade_to_column_name(data.grade);
    module[grading_key] = Number(data.student_count);
  }
  return modules;
};

const parse_xlsx = (src: string) =>
  Object.values(XLSX.readFile(src).Sheets)
    .map((sheet: WorkSheet) => {
      if (sheet.A1?.v.toLowerCase() === "kurs") {
        return parse_data_sheet(sheet);
      }
      return undefined;
    })
    .filter(is_defined);

const success = (text: string) => chalk.green(`✔ ${text}`);

export default async (ctx: Context) => {
  ctx.log.info("Started import..");
  const temp = ctx.config.paths.exam_sheet_temp;

  ctx.log.info("Parsing data..");
  let data = parse_xlsx(temp);

  data = Object.values(data);

  ctx.log.info("Inserting exams..");
  const results = Object.values(data)
    .flatMap((x) => Object.values(x))
    .flatMap((x) => Object.values(x))
    .flatMap((x) => Object.values(x));

  const exams = results
    .filter((module) => module.name === "Tentamen")
    .map((module) => ({
      course_code: module.course_code,
      date: module.date,
      academic_year: module.academic_year,
      failed: module.failed,
      three: module.three,
      four: module.four,
      five: module.five,
    }));

  const courses = await ctx.prisma.course.findMany({
    select: { course_code: true },
  });
  const course_codes = new Set(courses.map((e) => e.course_code));

  for (const exam of exams) {
    if (!course_codes.has(exam.course_code)) {
      ctx.log.warn(
        `Course code '${exam.course_code}' (${exam.date}) does not exist in the database, skipping.`,
      );
    }
  }

  await ctx.prisma.exam.createMany({
    data: exams.filter((exam) => course_codes.has(exam.course_code)),
    skipDuplicates: true,
  });

  await ctx.prisma.moduleResult.createMany({
    data: results.filter((result) => course_codes.has(result.course_code)),
    skipDuplicates: true,
  });

  ctx.log.info(success("Successfully imported all data!"));
};

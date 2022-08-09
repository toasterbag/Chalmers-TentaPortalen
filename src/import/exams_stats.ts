import chalk from "chalk";
import { Context } from "@app/context";
import { AcademicYear, isDefined } from "@app/utils";
import type { WorkSheet } from "xlsx";
import XLSX from "xlsx";
import { ModuleResult } from "@app/prisma/clients/common";
import { range } from "@app/std";

type Grade = "TG" | "G" | "U" | "3" | "4" | "5";

const validGrades = new Set(["3", "G", "4", "5", "U"]);

const gradeToColumnName = (grade: Grade) => {
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

function getCellData(sheet: any, column: string, row: string) {
  const key = `${column}${row}`;
  if (key in sheet) {
    return sheet[key].w;
  }
  return "";
}

function parseRow(sheet: any, row: any) {
  let date = getCellData(sheet, "H", row);
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
    code: getCellData(sheet, "A", row),
    name: getCellData(sheet, "B", row),
    owner: getCellData(sheet, "C", row),
    module_id: getCellData(sheet, "E", row),
    module_name: getCellData(sheet, "F", row),
    points: Number(getCellData(sheet, "G", row)).mul(10),
    date,
    student_count: getCellData(sheet, "J", row),
    grade: getCellData(sheet, "I", row),
  };
}

const parseDataSheet = (sheet: WorkSheet) => {
  const modules: Record<
    string,
    Record<string, Record<string, ModuleResult>>
  > = {};

  const rowCount = sheet["!ref"]?.split(":")[1].substring(1);
  if (rowCount === undefined) return undefined;

  for (const rowIndex of range(2, Number(rowCount))) {
    const data = parseRow(sheet, rowIndex);
    if (data === undefined) {
      console.error(`Couldn't parse row ${rowIndex}`);
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

    const byCourse = modules[data.code];

    if (!(data.date in byCourse)) {
      byCourse[data.date] = {};
    }

    const byDate = byCourse[data.date];

    if (!validGrades.has(data.grade)) {
      console.warn("Found invalid grade for:", data);
      continue;
    }

    if (!(data.module_id in byDate)) {
      byDate[data.module_id] = {
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

    const module = byDate[data.module_id];

    if (data.grade === "G") {
      module.grading_system = "PassFail";
    }

    const gradingKey = gradeToColumnName(data.grade);
    module[gradingKey] = Number(data.student_count);
  }
  return modules;
};

const parseXlsx = (src: string) =>
  Object.values(XLSX.readFile(src).Sheets)
    .map((sheet: WorkSheet) => {
      if (sheet.A1?.v.toLowerCase() === "kurs") {
        return parseDataSheet(sheet);
      }
      return undefined;
    })
    .filter(isDefined);

const success = (text: string) => chalk.green(`✔ ${text}`);

export default async (ctx: Context) => {
  ctx.log.info("Started import..");
  const temp = ctx.config.paths.exam_sheet_temp;

  ctx.log.info("Parsing data..");
  let data = parseXlsx(temp);

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

  const courses = await ctx.prisma.common.course.findMany({
    select: { course_code: true },
  });
  const courseCodes = new Set(courses.map((e) => e.course_code));

  for (const exam of exams) {
    if (!courseCodes.has(exam.course_code)) {
      ctx.log.warn(
        `Course code '${exam.course_code}' (${exam.date}) does not exist in the database, skipping.`,
      );
    }
  }

  await ctx.prisma.common.exam.createMany({
    data: exams.filter((exam) => courseCodes.has(exam.course_code)),
    skipDuplicates: true,
  });

  await ctx.prisma.common.moduleResult.createMany({
    data: results.filter((result) => courseCodes.has(result.course_code)),
    skipDuplicates: true,
  });

  ctx.log.info(success("Successfully imported all data!"));
};

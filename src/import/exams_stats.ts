import chalk from "chalk";

import { Context } from "@app/context";
import { Logger } from "@app/logger";
import { date_to_academic_year } from "@app/utils";
import { format } from "date-fns";
import type { WorkSheet } from "xlsx";
const Log = new Logger({ label: "Import" });

import XLSX from "xlsx";

const gradeToColumnName = (grade: string) => {
  switch (grade) {
    case "3":
      return "three";
    case "4":
      return "four";
    case "5":
      return "five";
    case "u":
      return "failed";
    default:
      return false;
  }
};

function isValidDate(d: any) {
  return !isNaN(d) && d instanceof Date;
}

function _toDate(s: string) {
  let date = new Date(s);
  if (!isValidDate(date)) {
    return false;
  }
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  date = new Date(date.getTime() - userTimezoneOffset);

  return date;
}

function _getString(sheet: any, column: string, row: string) {
  const key = `${column}${row}`;
  if (key in sheet) {
    return sheet[key].w.toLowerCase();
  }
  return "";
}

function _parseRow(sheet: any, row: any) {
  const date = _toDate(_getString(sheet, "H", row));
  if (!date) return false;
  const grade = gradeToColumnName(_getString(sheet, "I", row));
  if (!grade) return false;
  return {
    code: _getString(sheet, "A", row).toUpperCase(),
    name: _getString(sheet, "B", row),
    grade,
    owner: _getString(sheet, "D", row),
    date: date,
    nrOfStudents: _getString(sheet, "J", row),
    type: _getString(sheet, "F", row),
  };
}

const parseDatasheet = (src: string) => {
  const workbook = XLSX.readFile(src);
  const collection = workbook.Sheets;

  const courses: any = {};
  // Itterate over sheets in excel doc

  Object.entries(collection).forEach(([name, sheet]: [string, WorkSheet]) => {
    if (sheet["A1"]?.v.toLowerCase() == "kurs") {
      if (sheet["!ref"] == undefined) {
        //range: [first column, last column]
        throw new Error(`Malformed xlsx sheet '${name}'`);
      }
      const range = sheet["!ref"].split(":");
      const numberOfRows = Number(range[1].substr(1));

      for (let row = 1; row < numberOfRows + 1; row++) {
        const rowData = _parseRow(sheet, row);
        if (!rowData) continue;
        // Check if row contains results from an exam (skips projects etc)
        if (rowData.type === "tentamen") {
          let course: any = rowData;
          if (!(course.code in courses)) {
            course.exams = [];
            courses[course.code] = course;
          }

          course = courses[course.code];

          let examIndex = course.exams.findIndex((e: any) => {
            return e.date.getTime() === rowData.date.getTime();
          });
          if (examIndex < 0) {
            examIndex = course.exams.length;
            course.exams.push({ date: rowData.date });
          }
          course.exams[examIndex][rowData.grade] = rowData.nrOfStudents;
        }
      }
    }
  });
  return courses;
};

// So it seems they changed the format?
const parseDatasheet2 = (src: string) => {
  const workbook = XLSX.readFile(src);
  const collection = workbook["Sheets"];

  const courses: any = {};
  Object.entries(collection).forEach(([name, sheet]: any) => {
    if (name == "Sheet1") {
      //range: [first column, last column]
      const range = sheet["!ref"].split(":");
      const numberOfRows = range[1].substr(1);

      for (let row = 1; row < numberOfRows + 1; row++) {
        const rowData = _parseRow(sheet, row);
        if (!rowData) continue;
        // Check if row contains results from an exam (skips projects etc)
        if (rowData.type === "tentamen") {
          let course: any = rowData;
          if (!(course.code in courses)) {
            course.exams = [];
            courses[course.code] = course;
          }

          course = courses[course.code];

          let examIndex = course.exams.findIndex((e: any) => {
            return e.date.getTime() === rowData.date.getTime();
          });
          if (examIndex < 0) {
            examIndex = course.exams.length;
            course.exams.push({ date: rowData.date });
          }
          course.exams[examIndex][rowData.grade] = rowData.nrOfStudents;
        }
      }
    }
  });
  return courses;
};

const success = (text: string) => chalk.green(`✔ ${text}`);

export default async (context: Context) => {
  Log.info("Started import..");
  const temp = context.config.paths.exam_sheet_temp;

  Log.info("Parsing data..");
  let data = parseDatasheet(temp);

  data = Object.values(data);

  Log.info("Inserting exams..");
  const exams: any = data.flatMap((course: any) =>
    course.exams.map((exam: any) => ({
      course_code: course.code,
      date: format(exam.date, "yyyy-MM-dd"),
      academic_year: date_to_academic_year(exam.date),
      failed: Number(exam.failed ?? 0),
      three: Number(exam.three ?? 0),
      four: Number(exam.four ?? 0),
      five: Number(exam.five ?? 0),
    })),
  );

  for (const exam of exams) {
    Log.warn(`Found exam '${exam.course_code}' (${exam.date}).`);
  }

  const courses = await context.prisma.course.findMany({
    select: { course_code: true },
  });
  const course_codes = new Set(courses.map((e: any) => e.course_code));

  for (const exam of exams) {
    if (!course_codes.has(exam.course_code)) {
      Log.warn(
        `Course code '${exam.course_code}' (${exam.date}) does not exist in the database, skipping.`,
      );
    }
  }

  await context.prisma.exam.createMany({
    data: exams.filter((exam: any) => course_codes.has(exam.course_code)),
    skipDuplicates: true,
  });

  const completed = new Date();
  context.status.exam_statistics.updated = completed;

  await context.prisma.scan.create({
    data: { title: "exam_statistics_datasheet", completed },
  });

  Log.info(success("Successfully imported all data!"));
};

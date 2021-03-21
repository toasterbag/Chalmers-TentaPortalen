import fetch from "node-fetch";
import fs from "fs";
import chalk from "chalk";

import Context from "@app/context";
import { makeLogger } from "@app/logger";
const Log = makeLogger({ label: "Import" });

const XLSX = require("xlsx");

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

const fetchDatasheet = async (src: string, dest: string) => {
  let res = await fetch(src);
  if (res.ok) {
    const file = fs.createWriteStream(dest);
    // Does this actually do anything?
    // Sometimes it just fails to parse the data, probably a race condition here
    res.body.pipe(file);
    return new Promise((resolve, reject) => {
      res.body.on("end", () => {
        resolve(true);
      });
      res.body.on("error", () => {
        reject();
      });
    });
  }
  throw new Error(
    `Could not download datasheet, ${res.status} ${res.statusText}`
  );
};

const parseDatasheet = (src: string) => {
  const workbook = XLSX.readFile(src);
  const collection = workbook["Sheets"];

  const courses: any = {};
  Object.entries(collection).forEach(([name, sheet]: any) => {
    const isCourseSheet = /20\d\d_20\d\d$/;
    // Itterate over sheets in excel doc
    if (isCourseSheet.test(name)) {
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
  const temp = "/tmp/tentastatistik.xlsx";

  Log.info("Parsing data..");
  let courses = parseDatasheet(temp);

  courses = Object.values(courses);

  Log.info("Inserting courses..");
  const course_rows = courses.map((c: any) => ({
    code: c.code,
    name: c.name,
    owner: c.owner,
  }));
  await context.prisma.course.createMany({
    data: course_rows,
    skipDuplicates: true,
  });

  Log.info("Inserting exams..");
  const exams: any = courses.flatMap((course: any) =>
    course.exams.map((exam: any) => ({
      code: course.code,
      date: exam.date,
      failed: Number(exam.failed ?? 0),
      three: Number(exam.three ?? 0),
      four: Number(exam.four ?? 0),
      five: Number(exam.five ?? 0),
    }))
  );
  await context.prisma.exam.createMany({ data: exams, skipDuplicates: true });

  Log.info(success("Successfully imported all data!"));
};

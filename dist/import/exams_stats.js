"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("../logger");
const utils_1 = require("../utils");
const date_fns_1 = require("date-fns");
const Log = new logger_1.Logger({ label: "Import" });
const xlsx_1 = __importDefault(require("xlsx"));
const gradeToColumnName = (grade) => {
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
function isValidDate(d) {
    return !isNaN(d) && d instanceof Date;
}
function _toDate(s) {
    let date = new Date(s);
    if (!isValidDate(date)) {
        return false;
    }
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    date = new Date(date.getTime() - userTimezoneOffset);
    return date;
}
function _getString(sheet, column, row) {
    const key = `${column}${row}`;
    if (key in sheet) {
        return sheet[key].w.toLowerCase();
    }
    return "";
}
function _parseRow(sheet, row) {
    const date = _toDate(_getString(sheet, "H", row));
    if (!date)
        return false;
    const grade = gradeToColumnName(_getString(sheet, "I", row));
    if (!grade)
        return false;
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
const parseDatasheet = (src) => {
    const workbook = xlsx_1.default.readFile(src);
    const collection = workbook.Sheets;
    const courses = {};
    // Itterate over sheets in excel doc
    Object.entries(collection).forEach(([name, sheet]) => {
        if (sheet["A1"]?.v.toLowerCase() == "kurs") {
            if (sheet["!ref"] == undefined) {
                //range: [first column, last column]
                throw new Error(`Malformed xlsx sheet '${name}'`);
            }
            const range = sheet["!ref"].split(":");
            const numberOfRows = Number(range[1].substr(1));
            for (let row = 1; row < numberOfRows + 1; row++) {
                const rowData = _parseRow(sheet, row);
                if (!rowData)
                    continue;
                // Check if row contains results from an exam (skips projects etc)
                if (rowData.type === "tentamen") {
                    let course = rowData;
                    if (!(course.code in courses)) {
                        course.exams = [];
                        courses[course.code] = course;
                    }
                    course = courses[course.code];
                    let examIndex = course.exams.findIndex((e) => {
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
const parseDatasheet2 = (src) => {
    const workbook = xlsx_1.default.readFile(src);
    const collection = workbook["Sheets"];
    const courses = {};
    Object.entries(collection).forEach(([name, sheet]) => {
        if (name == "Sheet1") {
            //range: [first column, last column]
            const range = sheet["!ref"].split(":");
            const numberOfRows = range[1].substr(1);
            for (let row = 1; row < numberOfRows + 1; row++) {
                const rowData = _parseRow(sheet, row);
                if (!rowData)
                    continue;
                // Check if row contains results from an exam (skips projects etc)
                if (rowData.type === "tentamen") {
                    let course = rowData;
                    if (!(course.code in courses)) {
                        course.exams = [];
                        courses[course.code] = course;
                    }
                    course = courses[course.code];
                    let examIndex = course.exams.findIndex((e) => {
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
const success = (text) => chalk_1.default.green(`✔ ${text}`);
exports.default = async (context) => {
    Log.info("Started import..");
    const temp = context.config.paths.exam_sheet_temp;
    Log.info("Parsing data..");
    let data = parseDatasheet(temp);
    data = Object.values(data);
    Log.info("Inserting exams..");
    const exams = data.flatMap((course) => course.exams.map((exam) => ({
        course_code: course.code,
        date: date_fns_1.format(exam.date, "yyyy-MM-dd"),
        academic_year: utils_1.date_to_academic_year(exam.date),
        failed: Number(exam.failed ?? 0),
        three: Number(exam.three ?? 0),
        four: Number(exam.four ?? 0),
        five: Number(exam.five ?? 0),
    })));
    for (const exam of exams) {
        Log.warn(`Found exam '${exam.course_code}' (${exam.date}).`);
    }
    const courses = await context.prisma.course.findMany({
        select: { course_code: true },
    });
    const course_codes = new Set(courses.map((e) => e.course_code));
    for (const exam of exams) {
        if (!course_codes.has(exam.course_code)) {
            Log.warn(`Course code '${exam.course_code}' (${exam.date}) does not exist in the database, skipping.`);
        }
    }
    await context.prisma.exam.createMany({
        data: exams.filter((exam) => course_codes.has(exam.course_code)),
        skipDuplicates: true,
    });
    const completed = new Date();
    context.status.exam_statistics.updated = completed;
    await context.prisma.scan.create({
        data: { title: "exam_statistics_datasheet", completed },
    });
    Log.info(success("Successfully imported all data!"));
};
//# sourceMappingURL=exams_stats.js.map
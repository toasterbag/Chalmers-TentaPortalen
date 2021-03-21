"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var logger_1 = require("./logger");
var Log = logger_1.makeLogger({ label: "Import" });
var XLSX = require("xlsx");
var gradeToColumnName = function (grade) {
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
    var date = new Date(s);
    if (!isValidDate(date)) {
        return false;
    }
    return date;
}
function _getString(sheet, column, row) {
    var key = "" + column + row;
    if (key in sheet) {
        return sheet[key].w.toLowerCase();
    }
    return "";
}
function _parseRow(sheet, row) {
    var date = _toDate(_getString(sheet, "H", row));
    if (!date)
        return false;
    var grade = gradeToColumnName(_getString(sheet, "I", row));
    if (!grade)
        return false;
    return {
        code: _getString(sheet, "A", row).toUpperCase(),
        name: _getString(sheet, "B", row),
        grade: grade,
        owner: _getString(sheet, "D", row),
        date: date,
        nrOfStudents: _getString(sheet, "J", row),
        type: _getString(sheet, "F", row)
    };
}
var fetchDatasheet = function (src, dest) { return __awaiter(void 0, void 0, void 0, function () {
    var res, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1["default"](src)];
            case 1:
                res = _a.sent();
                if (res.ok) {
                    file = fs_1["default"].createWriteStream(dest);
                    // Does this actually do anything?
                    // Sometimes it just fails to parse the data, probably a race condition here
                    res.body.pipe(file);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            res.body.on("end", function () {
                                resolve(true);
                            });
                            res.body.on("error", function () {
                                reject();
                            });
                        })];
                }
                throw new Error("Could not download datasheet, " + res.status + " " + res.statusText);
        }
    });
}); };
var parseDatasheet = function (src) {
    var workbook = XLSX.readFile(src);
    var collection = workbook["Sheets"];
    var courses = {};
    Object.entries(collection).forEach(function (_a) {
        var name = _a[0], sheet = _a[1];
        var isCourseSheet = /20\d\d_20\d\d$/;
        // Itterate over sheets in excel doc
        if (isCourseSheet.test(name)) {
            //range: [first column, last column]
            var range = sheet["!ref"].split(":");
            var numberOfRows = range[1].substr(1);
            var _loop_1 = function (row) {
                var rowData = _parseRow(sheet, row);
                if (!rowData)
                    return "continue";
                // Check if row contains results from an exam (skips projects etc)
                if (rowData.type === "tentamen") {
                    var course = rowData;
                    if (!(course.code in courses)) {
                        course.exams = [];
                        courses[course.code] = course;
                    }
                    course = courses[course.code];
                    var examIndex = course.exams.findIndex(function (e) {
                        return e.date.getTime() === rowData.date.getTime();
                    });
                    if (examIndex < 0) {
                        examIndex = course.exams.length;
                        course.exams.push({ date: rowData.date });
                    }
                    course.exams[examIndex][rowData.grade] = rowData.nrOfStudents;
                }
            };
            for (var row = 1; row < numberOfRows + 1; row++) {
                _loop_1(row);
            }
        }
    });
    return courses;
};
var success = function (text) { return chalk_1["default"].green("\u2714 " + text); };
exports["default"] = (function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var temp, courses, course_rows, exams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Log.info("Started import..");
                temp = "/tmp/tentastatistik.xlsx";
                Log.info("Parsing data..");
                courses = parseDatasheet(temp);
                courses = Object.values(courses);
                Log.info("Inserting courses..");
                course_rows = courses.map(function (c) { return ({
                    code: c.code,
                    name: c.name,
                    owner: c.owner
                }); });
                return [4 /*yield*/, context.prisma.course.createMany({
                        data: course_rows,
                        skipDuplicates: true
                    })];
            case 1:
                _a.sent();
                Log.info("Inserting exams..");
                exams = courses.flatMap(function (course) {
                    return course.exams.map(function (exam) {
                        var _a, _b, _c, _d;
                        return ({
                            code: course.code,
                            date: exam.date,
                            failed: Number((_a = exam.failed) !== null && _a !== void 0 ? _a : 0),
                            three: Number((_b = exam.three) !== null && _b !== void 0 ? _b : 0),
                            four: Number((_c = exam.four) !== null && _c !== void 0 ? _c : 0),
                            five: Number((_d = exam.five) !== null && _d !== void 0 ? _d : 0)
                        });
                    });
                });
                return [4 /*yield*/, context.prisma.exam.createMany({ data: exams, skipDuplicates: true })];
            case 2:
                _a.sent();
                Log.info(success("Successfully imported all data!"));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=import.js.map
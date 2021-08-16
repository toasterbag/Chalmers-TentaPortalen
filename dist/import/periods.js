"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape_periods = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const logger_1 = require("../logger");
const utils_1 = require("../utils");
const Log = new logger_1.Logger({ label: "Studieportalen" });
const map_date_to_study_period = (date) => {
    if (date.getMonth() === 7) {
        return 0;
    }
    else if (date.getMonth() === 9) {
        return 1;
    }
    else if (date.getMonth() === 11 || date.getMonth() === 0) {
        return 2;
    }
    else if (date.getMonth() === 2 || date.getMonth() === 3) {
        return 3;
    }
    else if (date.getMonth() === 4 || date.getMonth() === 5) {
        return 4;
    }
    return -1;
};
const scrape_periods_for_year = async (academic_year) => {
    const res = await node_fetch_1.default(`https://student.portal.chalmers.se/sv/chalmersstudier/Sidor/Lasarstider.aspx?year=${academic_year}`);
    const $ = cheerio_1.default.load(await res.text());
    const rows = $(".table > tbody > tr").toArray();
    const exam_periods = rows
        .filter((e) => $(e).text().includes("Tentamensperiod"))
        .filter((e) => !$(e).text().includes("påsk"))
        .map((e) => {
        const el = $(e);
        const start = new Date($("td:nth-child(3)", el).text().trim());
        return {
            type: "Exam period",
            study_period: map_date_to_study_period(start),
            academic_year: utils_1.date_to_academic_year(start),
            start,
            end: new Date($("td:nth-child(5)", el).text().trim()),
        };
    });
    const reexam_periods = rows
        .filter((e) => $(e).text().includes("Omtentamensperiod") ||
        $(e).text().includes("Tentamensperiod påsk"))
        .map((e) => {
        const el = $(e);
        const start = new Date($("td:nth-child(3)", el).text().trim());
        return {
            type: "Re-exam period",
            academic_year: utils_1.date_to_academic_year(start),
            study_period: map_date_to_study_period(start),
            start,
            end: new Date($("td:nth-child(5)", el).text().trim()),
        };
    });
    return [...exam_periods, ...reexam_periods];
};
const scrape_periods = async () => {
    const res = await node_fetch_1.default(`https://student.portal.chalmers.se/en/chalmersstudies/Pages/TheAcademicYear.aspx?year=2020/2021`);
    const $ = cheerio_1.default.load(await res.text());
    const requests = $("#ctl00_m_g_02ca6c5f_8739_4098_96a5_13cb22525441_ctl00_ddlAcademicYear > option")
        .toArray()
        .map((e) => $(e).attr("value") ?? "")
        // They decided not to use the term Omtentamen this year so you cant really parse whats what.
        // We don't have exams or surveys from back then so it doesn's really matter.
        .filter((year) => year != "2004/2005")
        .map((year) => scrape_periods_for_year(year));
    return (await Promise.all(requests)).flat();
};
exports.scrape_periods = scrape_periods;
//# sourceMappingURL=periods.js.map
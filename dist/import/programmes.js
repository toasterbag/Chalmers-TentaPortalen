"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_active_programmes = exports.scrape_all_programmes = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const date_fns_1 = require("date-fns");
const utils_1 = require("../utils");
const logger_1 = require("../logger");
const Log = new logger_1.Logger({ label: "Studieportalen" });
const lang_conf = {
    sv: {
        base_url: `https://student.portal.chalmers.se/sv/chalmersstudier/programinformation/Sidor/SokProgramutbudet.aspx`,
    },
    en: {
        base_url: `https://student.portal.chalmers.se/en/chalmersstudies/programme-information/Pages/SearchProgram.aspx`,
    },
};
const get_programme_list = async (academic_year, lang) => {
    if (!(lang in lang_conf))
        throw new Error(`Invalid language '${lang}'`);
    const base_url = lang_conf[lang].base_url;
    const query = {
        flag: 1,
        sortorder: "CODE",
        search_ac_year: academic_year,
        query_start: 0,
        batch_size: 3000, // We will never have this many programmes so it should give all of them in one page
    };
    let queryString = Object.entries(query)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join("&");
    try {
        const res = await node_fetch_1.default(`${base_url}?${queryString}`, { timeout: 30_000 });
        if (!res.ok) {
            throw new Error(`Error fetching programme list: ${res.status}, ${await res.text()}`);
        }
        return res;
    }
    catch (e) {
        if (e.type == "request-timeout") {
            Log.warn(`Timeout requesting the page for programmes in '${academic_year}'. Retrying...`);
            return get_programme_list(academic_year, lang);
        }
    }
};
const scrape_all_programmes = async (context, start_year = date_fns_1.getYear(new Date())) => {
    // We COULD go further back but we dont really care about that old stuff
    const CURRENT_YEAR = date_fns_1.getYear(new Date());
    let programme_jobs_sv = [];
    let programme_jobs_en = [];
    for (let year = start_year; year <= CURRENT_YEAR; year++) {
        const academic_year = utils_1.date_to_academic_year(new Date(year, 1));
        programme_jobs_sv.push([
            academic_year,
            get_programme_list(academic_year, "sv"),
        ]);
        programme_jobs_en.push([
            academic_year,
            get_programme_list(academic_year, "en"),
        ]);
    }
    const programmes = {};
    for (let [year, job] of programme_jobs_sv) {
        // Dont start all requests at the same time
        await wait(Math.random() * 1000);
        const res = await job;
        const html = await res.text();
        Log.info(`Fetched swedish programme list for ${year}`);
        const $ = cheerio_1.default.load(html);
        let finished = false;
        $("tbody tbody").each((i, table) => {
            // If we fount the right table already we skip the rest
            if (finished == true)
                return;
            // If this element exists within the table it means we got the right one
            const header = $(table).find("tr.tableHeader:contains('Kod')");
            if (header.length > 0) {
                $("tr:nth-child(n+3)", table).each((i, row) => {
                    let code = $(row).find("td:first-child a");
                    // const id = $(link).attr("href").replace(/.*=/, "");
                    code = $(code).text();
                    let name_sv = $(row).find("td:nth-child(2) a");
                    name_sv = $(name_sv).text().replace(", MASTERPROGRAM", "");
                    programmes[code] = { code, name_sv };
                });
                finished = true;
            }
        });
    }
    for (let [year, job] of programme_jobs_en) {
        const res = await job;
        const html = await res.text();
        Log.info(`Fetched english programme list for ${year}`);
        const $ = cheerio_1.default.load(html);
        let finished = false;
        $("tbody tbody").each((i, table) => {
            // If we fount the right table already we skip the rest
            if (finished == true)
                return;
            // If this element exists within the table it means we got the right one
            const header = $(table).find("tr.tableHeader:contains('Code')");
            if (header.length > 0) {
                $("tr:nth-child(n+3)", table).each((i, row) => {
                    let code = $(row).find("td:first-child a");
                    code = $(code).text();
                    let name_en = $(row).find("td:nth-child(2) a");
                    name_en = $(name_en).text().replace(", MSC PROGR", "");
                    programmes[code].name_en = name_en;
                });
                finished = true;
            }
        });
    }
    // Is this really necessary?
    delete programmes[null];
    return Object.values(programmes);
};
exports.scrape_all_programmes = scrape_all_programmes;
const get_active_programmes = async (context) => {
    return (await scrape_all_programmes(context)).map((p) => p.code);
};
exports.get_active_programmes = get_active_programmes;
//# sourceMappingURL=programmes.js.map
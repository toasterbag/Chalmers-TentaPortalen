"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape_survey = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const error_1 = require("./error");
const fs_1 = require("fs");
const logger_1 = require("../logger");
const Log = new logger_1.Logger({ label: "Studieportalen" });
const get_response_values = ($, id) => {
    const mean = $(`#${id} table[summary] tbody td:nth-child(2)`)
        .text()
        .replace(",", ".");
    const median = $(`#${id} table[summary] tbody td:nth-child(3)`)
        .text()
        .replace(",", ".");
    return { mean: Number(mean), median: Number(median) };
};
// The course survey is much easier to parse.
// However if we want individual values we will have to OCR them from the images 😬
const course_eval_url_se = (iteration) => `https://course-eval.portal.chalmers.se/sr/Reports/${iteration.course_code}/${iteration.academic_year}/LP${iteration.start_period}-LP${iteration.end_period}/UtanKommentarer`;
const course_eval_url_en = (iteration) => `https://course-eval.portal.chalmers.se/sr/Reports/${iteration.course_code}/${iteration.academic_year}/LP${iteration.start_period}-LP${iteration.end_period}/WithoutComments`;
const scrape_course_survey = async (course_iteration) => {
    const url = course_eval_url_se(course_iteration);
    const redir = await node_fetch_1.default(url, { redirect: "manual" });
    let res = await node_fetch_1.default(redir.headers.get("location"), {
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            Cookie: "AspxAutoDetectCookieSupport=1;",
        },
    });
    if (res.status == 404) {
        const url = course_eval_url_en(course_iteration);
        const redir = await node_fetch_1.default(url, { redirect: "manual" });
        res = await node_fetch_1.default(redir.headers.get("location"), {
            headers: {
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                Cookie: "AspxAutoDetectCookieSupport=1;",
            },
        });
        if (res.status == 404)
            return error_1.ERROR_TYPES.NO_SURVEY_AVAILABLE;
    }
    const html = await res.text();
    if (html.includes("Rapporten kan inte visas eftersom urvalet resulterade i för få respondenter") ||
        html.includes("Your filter selection resulted in too few answers") ||
        html.includes("The report you are looking for is unavailable")) {
        return error_1.ERROR_TYPES.NO_SURVEY_AVAILABLE;
    }
    if (html.includes("I am...")) {
        return error_1.ERROR_TYPES.SURVEY_FORMAT_TOO_OLD;
    }
    const $ = cheerio_1.default.load(html);
    const survey = {
        course_code: course_iteration.course_code,
        academic_year: course_iteration.academic_year,
        start_period: course_iteration.start_period,
        end_period: course_iteration.end_period,
        has_minutes: false,
    };
    // This is element with the number of respondents etc, as well as an empty p element
    $("html body.noneSurveyPage div.page div#reportPage.public\
   div.reportPage div div#i1.artBaseTable div#i1c1.artBaseRow\
    div#i1_txt_1.artWrapper div.srTextWrapper p").each((i, e) => {
        const text = $(e).html();
        if (text.includes("Svarsfrekvens:") || text.includes("Respondents:")) {
            const lines = text.split("<br>");
            const respondents = lines[0]
                .replace("Antal respondenter: ", "")
                .replace("Respondents:", "")
                .trim();
            const responses = lines[1]
                .replace("Antal svar: ", "")
                .replace("Answer Count:", "")
                .trim();
            const answer_frequency = lines[2]
                .replace("Svarsfrekvens: ", "")
                .replace("Answer Frequency:", "")
                .replace("%", "")
                .replace(",", ".")
                .trim();
            survey.respondents = Number(respondents);
            survey.responses = Number(responses);
            survey.answer_frequency = Number(answer_frequency);
        }
    });
    $("a").each((i, e) => {
        const url = $(e).attr("href");
        if (url.includes("webbpublicering360")
        // Old url or pre ~2019 minutes, only accesable on chalmers network
        // || url.includes("document.chalmers.se")
        ) {
            survey.minutes_url = url;
            survey.has_minutes = true;
        }
    });
    // Instead of theses ids we should parse the question header
    // For example the group containing <number>. Total impression should be total_impression
    // We currently miss quite a few surveys just because they are missing one or two questions
    const stat_map = [
        // 1. Förkunskaper
        // Jag hade tillräckliga förkunskaper för att kunna följa kursen
        { name: "prerequisite", id: "i2c4" },
        // 2. Lärandemål
        // Lärandemålen (se kursplanen) beskriver tydligt vad jag förväntades lära mig i kursen
        { name: "goals", id: "i3c4" },
        // 3. Lärande
        // Kursens struktur (uppdelningen i föreläsningar, övningar, laborationer, simuleringar etc.)
        // är lämplig för att uppnå kursens lärandemål
        { name: "course_structure", id: "i4c4" },
        // Undervisningen fungerade väl
        { name: "course_teaching", id: "i4c7" },
        // Kurslitteraturen (inklusive övrigt kursmaterial) stödjer lärandet väl
        { name: "course_litterature", id: "i4c10" },
        // 4. Examination
        // Examinationen (inklusive alla obligatoriska moment, tentamen, inlämningsuppgifter etc.)
        // testade om jag hade uppnått kursens lärandemål
        { name: "examination", id: "i5c4" },
        // 5. Kursadministration
        // Kursadministrationen (löpande information, kurs-PM, kurshemsida etc.) fungerade väl
        { name: "administration", id: "i6c4" },
        // 6. Arbetsbelastning
        // Kursens arbetsbelastning i förhållande till antalet poäng var...
        { name: "workload", id: "i7c4" },
        //7. Arbetsklimat
        //Kursens organisation, innehåll och pedagogik/undervisningssätt har varit utformade så att
        // alla kan känna sig inkluderade, välkomna och sedda
        //{ name: "work_climate", id: "i8c4" },
        //8. Sammanfattande intryck
        //Vad är ditt sammanfattande intryck av kursen?
        //{ name: "total_impression", id: "i9c4" },
    ];
    // The question about the working environment was added in study period two during the academic year 2019/2020
    if (Number(course_iteration.academic_year.replace(/\/.*/, "")) >= 2019 &&
        course_iteration.start_period > 1) {
        stat_map.push({ name: "working_environment", id: "i8c4" });
        stat_map.push({ name: "total_impression", id: "i9c4" });
    }
    else {
        stat_map.push({ name: "total_impression", id: "i8c4" });
    }
    for (let { name, id } of stat_map) {
        const { mean, median } = get_response_values($, id);
        survey[`${name}_mean`] = mean;
        survey[`${name}_median`] = median;
    }
    return survey;
};
const download_minutes = async (context, survey) => {
    await fs_1.promises.mkdir(`${context.config.DATA_DIR}/${survey.course_code}/minutes`, {
        recursive: true,
    });
    Log.info(`Downloading minutes`);
    let res = await node_fetch_1.default(survey.minutes_url);
    const dest = fs_1.createWriteStream(`${context.config.DATA_DIR}/${survey.course_code}/minutes/${survey.academic_year.replace("/", "-")}-LP${survey.start_period}-LP${survey.end_period}.pdf`);
    res.body.pipe(dest);
};
const scrape_survey = async (context, instance) => {
    const survey = await scrape_course_survey(instance);
    if (survey === error_1.ERROR_TYPES.NO_SURVEY_AVAILABLE) {
        Log.warn(`No course survey found for ${instance.course_code}, ${instance.academic_year} LP${instance.start_period}-LP${instance.end_period}`);
        return;
    }
    if (survey == error_1.ERROR_TYPES.SURVEY_FORMAT_TOO_OLD) {
        Log.error(`Survey format not recognized for ${instance.course_code}, ${instance.academic_year} LP${instance.start_period}-LP${instance.end_period}, skipping`);
        return;
    }
    Log.info(`Found course survey for ${instance.course_code}, ${instance.academic_year} LP${instance.start_period}-LP${instance.end_period}`);
    if (survey.has_minutes) {
        await download_minutes(context, survey);
    }
    return survey;
};
exports.scrape_survey = scrape_survey;
//# sourceMappingURL=survey.js.map
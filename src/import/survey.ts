import fetch from "node-fetch";
import cheerio from "cheerio";
import { Context } from "@app/context";
import { getUserAgent } from "@app/utils/index";
import { CourseInstance, Survey } from "@app/prisma/clients/common";

type SurveyStatistics =
  | "prerequisite"
  | "goals"
  | "structure"
  | "teaching"
  | "litterature"
  | "assessment"
  | "administration"
  | "workload"
  | "total_impression";
type OptionalSurveyStatistics = "working_environment";
// type Statistics<T extends string> = `${T}_mean` | `${T}_median`;
// type SurveyStatKeys = Statistics<SurveyStatistics>;
// type OptionalSurveyStatKeys = Statistics<OptionalSurveyStatistics>;

// type SurveyData = { [Property in SurveyStatKeys]: number } & {
//   [Property in OptionalSurveyStatKeys]?: number;
// };

enum SurveyImportError {
  NoSurveyAvailable,
  SurveyFormatTooOld,
}

// interface Survey extends SurveyData {
//   course_code: string,
//   academic_year: string,
//   start_period: number,
//   end_period: number,
//   has_minutes: boolean,
//   respondents: number,
//   responses: number,
//   answer_frequency: number,
//   minutes_url: string | undefined
// }

// The course survey is much easier to parse.
// However if we want individual values we will have to OCR them from the images 😬
const course_eval_url_se = (iteration: CourseInstance) =>
  `https://course-eval.portal.chalmers.se/sr/Reports/${iteration.course_code}/${iteration.academic_year}/LP${iteration.start_period}-LP${iteration.end_period}/UtanKommentarer`;

const course_eval_url_en = (iteration: CourseInstance) =>
  `https://course-eval.portal.chalmers.se/sr/Reports/${iteration.course_code}/${iteration.academic_year}/LP${iteration.start_period}-LP${iteration.end_period}/WithoutComments`;

const scrape_course_survey = async (
  course_iteration: CourseInstance,
): Promise<Survey | SurveyImportError> => {
  const url = course_eval_url_se(course_iteration);
  const redir = await fetch(url, { redirect: "manual" });
  const location = redir.headers.get("location");
  if (!location) {
    return SurveyImportError.NoSurveyAvailable;
  }

  let res = await fetch(location, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": getUserAgent(),

      Cookie: "AspxAutoDetectCookieSupport=1;",
    },
  });

  if (res.status === 404) {
    const en_url = course_eval_url_en(course_iteration);
    const redir_en = await fetch(en_url, { redirect: "manual" });

    const location_en = redir_en.headers.get("location");
    if (!location_en) {
      return SurveyImportError.NoSurveyAvailable;
    }

    res = await fetch(location_en, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": getUserAgent(),

        Cookie: "AspxAutoDetectCookieSupport=1;",
      },
    });

    if (res.status === 404) return SurveyImportError.NoSurveyAvailable;
  }

  const html = await res.text();
  if (
    html.includes(
      "Rapporten kan inte visas eftersom urvalet resulterade i för få respondenter",
    ) ||
    html.includes("Your filter selection resulted in too few answers") ||
    html.includes("The report you are looking for is unavailable")
  ) {
    return SurveyImportError.NoSurveyAvailable;
  }

  // if (html.includes("I am...")) {
  //   return SurveyImportError.SurveyFormatTooOld;
  // }
  const $ = cheerio.load(html);
  const survey: Partial<Survey> = {
    course_code: course_iteration.course_code,
    academic_year: course_iteration.academic_year,
    start_period: course_iteration.start_period,
    end_period: course_iteration.end_period,
    language: course_iteration.language,
    has_minutes: false,
  };

  // This is the element with the number of respondents etc
  $(
    "html body.noneSurveyPage div.page div#reportPage.public\
   div.reportPage div div#i1.artBaseTable div#i1c1.artBaseRow\
    div#i1_txt_1.artWrapper div.srTextWrapper p",
  ).each((i, e) => {
    const text = $(e).html() ?? "";
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

  // TODO Download minutes
  // $("a").each((i, e) => {
  //   const url = $(e).attr("href");
  //   if (
  //     url.includes("webbpublicering360")
  //     // Old url or pre ~2019 minutes, only accesable on chalmers network
  //     // || url.includes("document.chalmers.se")
  //   ) {
  //     survey.minutes_url = url;
  //     survey.has_minutes = true;
  //   }
  // });

  // Match the header. The ^ and $ is important to not match additional questions the examiner might
  // want to include. For example without the $, assessment could also be matched by the question
  // "13. Assesment of part 1 worked well" which is not what we want.
  // Matching on the number is also bad as they change from time to time.
  const stat_map: Array<{
    name: SurveyStatistics | OptionalSurveyStatistics;
    match: Array<RegExp>;
    entry?: number;
  }> = [
    // 1. Förkunskaper
    // Jag hade tillräckliga förkunskaper för att kunna följa kursen
    {
      name: "prerequisite",
      match: [
        /^[0-9].*. Prerequisites$/,
        // Old surveys from 2013/2014
        /^[0-9].* Prior knowledge$/,
        /^[0-9].* Förkunskaper$/,
      ],
    },

    // 2. Lärandemål
    // Lärandemålen (se kursplanen) beskriver tydligt vad jag förväntades lära mig i kursen
    {
      name: "goals",
      match: [
        /^[0-9].*. Learning outcomes$/,
        // For some reason some use this wording
        /^[0-9].*. Intended learning outcome$/,
        // Old surveys from 2013/2014
        /^[0-9].* Intended learning outcome$/,
        /^[0-9].* Lärandemål$/,
      ],
    },

    // 3. Lärande
    // Kursens struktur (uppdelningen i föreläsningar, övningar, laborationer, simuleringar etc.)
    // är lämplig för att uppnå kursens lärandemål
    {
      name: "structure",
      match: [
        /^[0-9].*. Learning$/,
        // Old surveys from 2013/2014
        /^[0-9].* Learning$/,
        /^[0-9].* Lärande$/,
      ],
      entry: 0,
    },

    // Undervisningen fungerade väl
    {
      name: "teaching",
      match: [
        /^[0-9].*. Learning$/,
        // Old surveys from 2013/2014
        /^[0-9].* Learning$/,
        /^[0-9].* Lärande$/,
      ],
      entry: 1,
    },

    // Kurslitteraturen (inklusive övrigt kursmaterial) stödjer lärandet väl
    {
      name: "litterature",
      match: [
        /^[0-9].*. Learning$/,
        // Old surveys from 2013/2014
        /^[0-9].* Learning$/,
        /^[0-9].* Lärande$/,
      ],
      entry: 2,
    },

    // 4. Examination
    // Examinationen (inklusive alla obligatoriska moment, tentamen, inlämningsuppgifter etc.)
    // testade om jag hade uppnått kursens lärandemål
    {
      name: "assessment",
      match: [
        /^[0-9].*. Assessment$/,
        // Old english surveys from 2013/2014 and normal swedish surveys are the same
        /^[0-9].* Examination$/,
      ],
    },

    // 5. Kursadministration
    // Kursadministrationen (löpande information, kurs-PM, kurshemsida etc.) fungerade väl
    {
      name: "administration",
      match: [
        /^[0-9].*. Course administration$/,
        // Old surveys from 2013/2014
        /^[0-9].* Course administration$/,
        /^[0-9].* Kursadministration$/,
        /^[0-9].* Administration$/,
      ],
    },

    // 6. Arbetsbelastning
    // Kursens arbetsbelastning i förhållande till antalet poäng var...
    {
      name: "workload",
      match: [
        /^[0-9].*. Workload$/,
        // Old surveys from 2013/2014
        /^[0-9].* Workload$/,
        /^[0-9].* Arbetsbelastning$/,
      ],
    },

    // 7. Arbetsklimat
    // Kursens organisation, innehåll och pedagogik/undervisningssätt har varit utformade så att
    // alla kan känna sig inkluderade, välkomna och sedda
    {
      name: "working_environment",
      match: [/^[0-9].*. Working environment$/, /^[0-9].* Arbetsklimat$/],
    },

    // 8. Sammanfattande intryck
    // Vad är ditt sammanfattande intryck av kursen?
    {
      name: "total_impression",
      match: [
        /^[0-9].*. Overall impression$/,
        // Old surveys from 2013/2014
        /^[0-9].* What is your overall impression of the course\?$/,
        /^[0-9].* Sammanfattande intryck$/,
        /^[0-9].* Vad är Ditt sammanfattande intryck av kursen\?$/,
      ],
    },
  ];

  $(".artBaseTable").each((i, e) => {
    const heading = $(".srTextWrapper h3", e).text();

    for (const { name, match, entry } of stat_map) {
      if (match.some((re) => re.test(heading))) {
        const data_rows = $(".srtbl", e).toArray();
        const table = data_rows[entry ?? 0];

        const mean = $("table[summary] tbody td:nth-child(2)", table)
          .text()
          .replace(",", ".");

        const median = $("table[summary] tbody td:nth-child(3)", table)
          .text()
          .replace(",", ".");

        survey[`${name}_mean`] = Number(mean);
        survey[`${name}_median`] = Number(median);
      }
    }

    // if (
    //   url.includes("webbpublicering360")
    //   // pre ~2019 minutes, only accesable on chalmers network
    //   // || url.includes("document.chalmers.se")
    // ) {
    //   survey.minutes_url = url;
    //   survey.has_minutes = true;
    // }
  });

  return survey as Survey;
};

// const download_minutes = async (context: Context, survey: Survey) => {
//   await fs.mkdir(`${context.config.DATA_DIR}/${survey.course_code}/minutes`, {
//     recursive: true,
//   });

//   Log.info(`Downloading minutes`);
//   let res = await fetch(survey.minutes_url);

//   const dest = createWriteStream(
//     `${context.config.DATA_DIR}/${survey.course_code
//     }/minutes/${survey.academic_year.replace("/", "-")}-LP${survey.start_period
//     }-LP${survey.end_period}.pdf`,
//   );
//   res.body.pipe(dest);
// };

const scrape_survey = async (
  context: Context,
  instance: CourseInstance,
): Promise<Survey | undefined> => {
  // They forgot to renew their cert... Quick fix for now (INSECURE THOUGH!!!)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const res = await scrape_course_survey(instance);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  if (res === SurveyImportError.NoSurveyAvailable) {
    console.warn(
      `No course survey found for ${instance.course_code}, ${instance.academic_year} LP${instance.start_period}-LP${instance.end_period}`,
    );
    return undefined;
  }

  if (res === SurveyImportError.SurveyFormatTooOld) {
    console.error(
      `Survey format not recognized for ${instance.course_code}, ${instance.academic_year} LP${instance.start_period}-LP${instance.end_period}, skipping`,
    );
    return undefined;
  }

  console.info(
    `Found course survey for ${instance.course_code}, ${instance.academic_year} LP${instance.start_period}-LP${instance.end_period}`,
  );
  return res;
};

export { scrape_survey };

import fetch, { Response } from "node-fetch";
import cheerio from "cheerio";
import { getYear } from "date-fns";
import { AcademicYear, getUserAgent, isError } from "@app/utils/index";
import { AppError } from "@app/utils/error";
import { range } from "@app/std";

const lang_conf = {
  sv: {
    base_url:
      "https://student.portal.chalmers.se/sv/chalmersstudier/programinformation/Sidor/SokProgramutbudet.aspx",
  },
  en: {
    base_url:
      "https://student.portal.chalmers.se/en/chalmersstudies/programme-information/Pages/SearchProgram.aspx",
  },
};

type ImportErrorKind = "ParseError";
class ImportError extends AppError<
  ImportErrorKind,
  { details: string; academic_year?: string }
> {}

const get_programme_list = async (
  academic_year: AcademicYear,
  lang: "sv" | "en",
): Promise<Response> => {
  if (!(lang in lang_conf)) throw new Error(`Invalid language '${lang}'`);
  const { base_url } = lang_conf[lang];
  const query = {
    flag: 1,
    sortorder: "CODE",
    search_ac_year: academic_year.toString(),
    query_start: 0,
    batch_size: 3000, // We will never have this many programmes so it should give all of them in one page
  };

  const query_string = Object.entries(query)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");

  try {
    const res = await fetch(`${base_url}?${query_string}`, {
      timeout: 30_000,
      headers: {
        "User-Agent": getUserAgent(),
      },
    });

    if (!res.ok) {
      throw new Error(
        `Error fetching programme list: ${res.status}, ${await res.text()}`,
      );
    }
    return res;
  } catch (e: any) {
    if (e.type === "request-timeout") {
      console.warn(
        `Timeout requesting the page for programmes in '${academic_year}'. Retrying...`,
      );
      return get_programme_list(academic_year, lang);
    }

    console.error("Unknown error when fetching programme list page");
    console.error(e);
    return process.exit(-1);
  }
};

// <td class="h3" valign="bottom">Academic year:&nbsp;2021/2022</td>
interface ProgrammePlanData {
  admission_year: string;
}
const fetch_programme_plan_page = async (
  instance_id: string,
): Promise<Response> => {
  const url = `https://student.portal.chalmers.se/en/chalmersstudies/programme-information/Pages/SearchProgram.aspx?program_id=${instance_id}&parsergrp=1`;

  try {
    const res = await fetch(url, {
      timeout: 30_000,
      headers: {
        "User-Agent": getUserAgent(),
      },
    });

    return res;
  } catch (e: any) {
    if (e.type === "request-timeout") {
      console.warn(
        `Timeout requesting the page for programme plan '${instance_id}'. Retrying...`,
      );
      return fetch_programme_plan_page(instance_id);
    }

    console.error("Unknown error when fetching programme plan page");
    console.error(e);
    return process.exit(-1);
  }
};

export const fetch_programme_plan = async (
  instance_id: string,
): Promise<ProgrammePlanData> => {
  const page = await fetch_programme_plan_page(instance_id);

  const $ = cheerio.load(await page.text());
  const admission_year = $("td.h3:nth-child(2)")
    .text()
    .replace("Academic year:", "")
    .trim();
  return {
    admission_year,
  };
};

interface ProgrammeData {
  code: string;
  name_sv: string;
  name_en: string;
}

const scrape_all_programmes = async (
  start_year = getYear(new Date()),
): Promise<Array<ProgrammeData> | ImportError> => {
  const current_year = getYear(new Date()) + 1;

  const programmes: Array<ProgrammeData> = [];
  for (const year of range(start_year, current_year)) {
    const academic_year = AcademicYear.from_date(new Date(year, 1));

    const res_sv = await get_programme_list(academic_year, "sv");
    const $sv = cheerio.load(await res_sv.text());
    console.info(
      `Fetched swedish programme list for ${academic_year.toString()}`,
    );

    const programme_table_sv = $sv("tbody tbody")
      .toArray()
      .find((table) => {
        // If this element exists within the table it means we got the right one
        return $sv(table).find("tr.tableHeader:contains('Kod')").length > 0;
      });
    if (programme_table_sv === undefined) {
      return new ImportError("ParseError", {
        details: "Could not find programme table list",
        academic_year: academic_year.toString(),
      });
    }

    const programmes_sv: { [key: string]: string } = $sv(
      "tr:nth-child(n+3)",
      programme_table_sv,
    )
      .toArray()
      .map((row) => {
        const code = $sv(row).find("td:first-child a").text();
        // const id = $(link).attr("href").replace(/.*=/, "");

        const name_sv = $sv(row)
          .find("td:nth-child(2) a")
          .text()
          .replace(", MASTERPROGRAM", "");

        return { code, name_sv };
      })
      .reduce(
        (obj, { code, name_sv }) => Object.assign(obj, { [code]: name_sv }),
        {},
      );

    const res_en = await get_programme_list(academic_year, "en");
    const $en = cheerio.load(await res_en.text());
    console.info(
      `Fetched english programme list for ${academic_year.toString()}`,
    );

    const programme_table_en = $en("tbody tbody")
      .toArray()
      .find((table) => {
        // If this element exists within the table it means we got the right one
        return $en(table).find("tr.tableHeader:contains('Code')").length > 0;
      });
    if (programme_table_en === undefined) {
      return new ImportError("ParseError", {
        details: "Could not find programme table list",
        academic_year: academic_year.toString(),
      });
    }

    const programmes_en: { [key: string]: string } = $en(
      "tr:nth-child(n+3)",
      programme_table_sv,
    )
      .toArray()
      .map((row) => {
        const code = $en(row).find("td:first-child a").text();

        const name_en = $en(row)
          .find("td:nth-child(2) a")
          .text()
          .replace(", MSC PROGR", "");

        return { code, name_en };
      })
      .reduce(
        (obj, { code, name_en }) => Object.assign(obj, { [code]: name_en }),
        {},
      );

    Object.entries(programmes_sv).forEach(([code, name_sv]) => {
      programmes.push({ code, name_sv, name_en: programmes_en[code] });
    });
  }

  return programmes;
};

const get_active_programmes = async () => {
  const res = await scrape_all_programmes();
  if (isError(res)) {
    console.error(res);
    return [];
  }
  return res.map((p) => p.code);
};

export { scrape_all_programmes, get_active_programmes };

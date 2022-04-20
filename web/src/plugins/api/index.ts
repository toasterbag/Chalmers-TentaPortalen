import { defineStore } from "pinia";
import { Ref } from "vue";
import { Err, Ok, Result } from "../../std/result";
import Http, { CONFIG } from "../http";
import {
  Course,
  CourseInstance,
  Department,
  Exam,
  Module,
  Profile,
  Programme,
  Survey,
} from "./types";

interface State {
  apiUrl: string;
  publicUrl: string;
  profile: Profile | undefined;
  programmes: Array<Programme>;
}

// const rank = <T>(term: string, data: Array<T>, extractor: (x: T) => string) =>
//   data
//     .map((e): [string, T] => [extractor(e), e])
//     .filter(([key]) => key.includes(term))
//     .map(([key, value]): [number, T] => [key.indexOf(term), value])
//     .sortBy(([a], [b]) => a - b)
//     .map(([, value]) => value);

type FetchProgrammeImpressionRankingsArguments = {
  academicYear: string;
};

type FetchCourseImpressionRankingsArguments = {
  academicYear: string;
  owner?: string;
  programmePlan?: string;
  electivity?: string;
  minResponses: number;
  maxResponses: number;
};

type FetchCoursePerformanceRankingsArguments = {
  academicYear: string;
  owner?: string;
  programmePlan?: string;
  electivity?: string;
  minParticipants: number;
  maxParticipants: number;
};

type CourseResponse = Course & {
  department: Department | null;
  owner: Programme;
  instances: Array<CourseInstance>;
};

type FetchExamOptions = {
  onlyPrimaries?: boolean;
};

const computeExamURLs = (exam: Exam) => {
  /* eslint-disable no-param-reassign */
  if (exam.thesis) {
    exam.thesis.url = `${CONFIG.PUBLIC_URL}/public/courses/${exam.course_code}/${exam.date}/exam.${exam.thesis.filetype}`;
  }
  if (exam.solution) {
    exam.solution.url = `${CONFIG.PUBLIC_URL}/public/courses/${exam.course_code}/${exam.date}/solution.${exam.solution.filetype}`;
  }
  return exam;
};

const computeSurveyURL = (survey: Survey) => {
  /* eslint-disable no-param-reassign */
  if (survey.language === "Swedish") {
    survey.url = `https://course-eval.portal.chalmers.se/sr/Reports/${survey.course_code}/${survey.academic_year}/LP${survey.start_period}-LP${survey.end_period}/UtanKommentarer`;
  } else if (survey.language === "English") {
    survey.url = `https://course-eval.portal.chalmers.se/sr/Reports/${survey.course_code}/${survey.academic_year}/LP${survey.start_period}-LP${survey.end_period}/WithoutComments`;
  }
  return survey;
};

const loadProfile = () => {
  const data = localStorage.getItem("profile");
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};

export const useAPI = defineStore("API", {
  state: (): State => ({
    apiUrl: "",
    publicUrl: "",
    programmes: [],
    profile: loadProfile(),
  }),
  getters: {
    isAdmin: (state) => state.profile && state.profile.roles.includes("Admin"),
    isSignedIn: (state) => state.profile !== undefined,
  },
  actions: {
    async signIn(email: string, password: string) {
      const res = await Http.post("/auth", {
        body: {
          email,
          password,
        },
      });
      if (res) {
        this.profile = res;
        localStorage.setItem("profile", JSON.stringify(this.profile));
        return true;
      }
      return false;
    },
    async uploadExamSheet(
      file: File,
      onProgress?: (progress: number) => void,
      onFinished?: () => void,
    ): Promise<Result<undefined, string>> {
      const formData = new FormData();

      if (file.size > 50 * 1000 * 1000) {
        return new Err("File too big");
      }
      formData.append("datasheet", file);

      const request = new XMLHttpRequest();

      request.open("PUT", `${CONFIG.API_URL}/datasheet`);
      request.setRequestHeader(
        "Authorization",
        `Token: ${this.profile?.token}`,
      );
      request.timeout = 300 * 1000;

      let progress = 0;
      request.upload.addEventListener("progress", (e) => {
        if (progress === 100) return;
        progress = e.loaded.div(e.total).mul(100).round();

        if (onProgress) {
          onProgress(progress);
        }
      });

      request.addEventListener("load", () => {
        if (onFinished) {
          onFinished();
        }
      });

      request.send(formData);
      return new Ok(undefined);
    },

    async fetchAllProgrammes() {
      this.programmes = await Http.get("/programmes/rankings");
    },
    async searchProgramme(term: string): Promise<Array<Programme>> {
      if (this.programmes.isEmpty()) {
        await this.fetchAllProgrammes();
      }
      // return rank(term, this.programmes, (v) => v.code);
      const termInUppercase = term.toUpperCase();
      return this.programmes.filter((e) => e.code.startsWith(termInUppercase));
    },

    async fetchProgrammeImpressionRankings(
      query: FetchProgrammeImpressionRankingsArguments,
    ): Promise<Array<any>> {
      // TODO type this monstrosity, the server side code is an info-hazard
      return Http.get("/programmes/rankings", {
        query: {
          academic_year: query.academicYear,
        },
      });
    },

    async fetchCourseImpressionRankings(
      query: FetchCourseImpressionRankingsArguments,
    ): Promise<Array<Survey>> {
      return Http.get("/courses/rankings/survey", {
        query: {
          academic_year: query.academicYear,
          owner: query.owner,
          programme_plan: query.programmePlan,
          electivity: query.electivity === "All" ? undefined : query.electivity,
          min_responses: query.minResponses,
          max_responses: query.maxResponses,
        },
      });
    },

    async fetchCoursePerformanceRankings(
      query: FetchCoursePerformanceRankingsArguments,
    ): Promise<Array<Exam>> {
      return Http.get("/courses/rankings/performance", {
        query: {
          academic_year: query.academicYear,
          owner: query.owner,
          programme_plan: query.programmePlan,
          electivity: query.electivity === "All" ? undefined : query.electivity,
          min_responses: query.minParticipants,
          max_responses: query.maxParticipants,
        },
      });
    },

    async fetchCourse(code: string): Promise<CourseResponse> {
      return Http.get(`course/${code}`);
    },

    async fetchExams(
      code: string,
      options?: FetchExamOptions,
    ): Promise<Array<Exam>> {
      return (
        await Http.get(`course/${code}/exams`, { query: options ?? {} })
      ).map(computeExamURLs);
    },

    async fetchModules(
      code: string,
      options?: FetchExamOptions,
    ): Promise<Array<Module>> {
      return Http.get(`course/${code}/modules`, { query: options ?? {} });
    },

    async fetchCourseSurveys(code: string): Promise<Array<Survey>> {
      return (await Http.get(`course/${code}/surveys`)).map(computeSurveyURL);
    },

    async fetchProgrammeSurveyAggregate(code: string): Promise<Array<any>> {
      return Http.get(`programme/${code}/surveys`);
    },

    async fetchChalmersSurveyAggregate(): Promise<Array<any>> {
      return Http.get("survey/chalmers");
    },
  },
});

import { defineStore } from "pinia";
import { Ref } from "vue";
import { Option } from "../../std/option";
import { Err, Ok, Result } from "../../std/result";
import Http, { CONFIG } from "../http";
import { usePlausible } from "../plausible";
import {
  Profile,
  Module,
  Exam,
  Survey,
  Course,
  CourseInstance,
  Department,
  Programme,
} from "./types";

interface State {
  apiUrl: string;
  publicUrl: string;
  profile: Profile | undefined;
  programmes: Array<Programme>;
  departments: Array<Department>;
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

type StudentBoard = {
  division: string;
  email: string;
  programmes: Array<string>;
};

type CourseResponse = Course & {
  department: Department | null;
  owner: Programme;
  instances: Array<CourseInstance>;
  studentBoard: StudentBoard | undefined;
};

type FetchExamOptions = {
  onlyPrimaries?: boolean;
};

type ValidationErrors = Array<{
  code: string;
  message: string;
  path: Array<string>;
  validation: string;
}>;

type ErrorResponse = Array<{
  code: string;
  message: string;
}>;

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
    departments: [],
    profile: loadProfile(),
  }),
  getters: {
    isAdmin: (state) => state.profile && state.profile.roles.includes("Admin"),
    isSignedIn: (state) => state.profile !== undefined,
  },
  actions: {
    async signIn(email: string, password: string): Promise<ErrorResponse> {
      const res = await Http.post("/auth", {
        body: {
          email,
          password,
        },
      });
      if (res.email) {
        this.profile = res;
        localStorage.setItem("profile", JSON.stringify(this.profile));
        return [];
      }
      return res;
    },
    async signOut() {
      localStorage.removeItem("profile");
      this.profile = undefined;
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

    async deleteExamThesis(id: number) {
      await Http.delete(`/exams/thesis/${id}`);
    },

    async deleteExamSolution(id: number) {
      await Http.delete(`/exams/solution/${id}`);
    },

    async countExams() {
      return Http.get("/analysis/count/exams");
    },
    async countTheses() {
      return Http.get("/analysis/count/theses");
    },

    async countCoursesWithExams() {
      return Http.get("/analysis/count/active-courses-with-exam");
    },
    async countCoursesWithThesis() {
      return Http.get("/analysis/count/active-courses-with-thesis");
    },

    async getCoursesWithoutThesis(args: {
      programme?: string;
      year?: string;
      departmentId?: number;
    }): Promise<Array<Course>> {
      return Http.get("/analysis/courses-without-thesis", {
        query: args,
      });
    },
    async fetchAllProgrammes() {
      this.programmes = await Http.get("/programmes");
    },

    async searchProgramme(term: string): Promise<Array<Programme>> {
      if (this.programmes.isEmpty()) {
        await this.fetchAllProgrammes();
      }
      // return rank(term, this.programmes, (v) => v.code);
      const termInUppercase = term.toUpperCase();
      return this.programmes.filter((e) => e.code.startsWith(termInUppercase));
    },

    async fetchAllDepartments() {
      this.departments = await Http.get("/departments");
    },
    async searchDepartment(term: string): Promise<Array<Department>> {
      if (this.departments.isEmpty()) {
        await this.fetchAllDepartments();
      }
      const termInLowerCase = term.toLowerCase();
      return this.departments.filter((e) =>
        e.name_en.toLowerCase().includes(termInLowerCase),
      );
    },

    async fetchProgrammeImpressionRankings(
      query: FetchProgrammeImpressionRankingsArguments,
    ): Promise<Array<any>> {
      // TODO type this monstrosity, the server side code is an info-hazard
      return Http.get("/programmes/rankings", {
        query,
      });
    },

    async fetchCourseImpressionRankings(
      query: FetchCourseImpressionRankingsArguments,
    ): Promise<
      Array<Survey & { course: { name_en: string; name_sv: string } }>
    > {
      return Http.get("/courses/rankings/survey", {
        query: {
          ...query,
          electivity: query.electivity === "All" ? undefined : query.electivity,
        },
      });
    },

    async fetchCoursePerformanceRankings(
      query: FetchCoursePerformanceRankingsArguments,
    ): Promise<Array<Exam & { course: { name_en: string; name_sv: string } }>> {
      return Http.get("/courses/rankings/performance", {
        query: {
          ...query,
          electivity: query.electivity === "All" ? undefined : query.electivity,
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
    async fetchAnswerFrequencyByDivision(
      academicYear: string,
      studyPeriod?: number,
    ): Promise<Array<{ division: string; answerFrequency: number }>> {
      return Http.get("survey/by-division", {
        query: { academicYear, studyPeriod },
      });
    },

    async updateExamThesis(
      id: number,
      opts: { includesSolution: boolean },
    ): Promise<{}> {
      return Http.patch(`/exams/thesis/${id}`, {
        body: opts,
      });
    },

    async search(
      term: string,
      maxCourses = 12,
      maxProgrammes = 4,
    ): Promise<{
      courses: Array<Course>;
      programmes: Array<Programme>;
    }> {
      const res = await Http.get(`search`, { query: { term } });
      const programmes = res.programmes.take(maxProgrammes);
      const courses = res.courses.take(maxCourses);
      usePlausible().trackEvent("Search", { props: { term } });
      return { programmes, courses };
    },

    async sendFeedback(
      message: string,
      email?: string,
    ): Promise<ValidationErrors> {
      return Http.post("feedback", {
        body: {
          message,
          email,
        },
      });
    },
  },
});

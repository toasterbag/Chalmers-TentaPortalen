import { JsonValue } from "../http";

export type Electivity = "Compulsory" | "CompulsoryElective" | "Elective";

export type GradingSystem = "PassFail" | "ThreeFourFive";

export type Token = {
  value: string;
  issuedAt: Date;
  validUntil: Date;
  userEmail: string;
};

export type Profile = {
  username: string;
  email: string;
  // token: Token;
  token: string;
  roles: Array<string>;
};

/**
 * Model Course
 *
 */
export type Course = {
  course_code: string;
  owner_code: string;
  name_sv: string;
  name_en: string;
  department_id: number | null;
};

/**
 * Model CourseInstance
 *
 */
export type CourseInstance = {
  course_code: string;
  study_portal_id: string;
  academic_year: string;
  start_period: number;
  end_period: number;
  language: string;
  examiner_cid: string;
};

/**
 * Model CourseModule
 *
 */
export type CourseModule = {
  course_instance_id: string;
  module_id: string;
  kind: string;
  points: number;
  start_period: number;
  end_period: number;
};

/**
 * Model ModuleResult
 *
 */
export type ModuleResult = {
  course_code: string;
  date: string;
  academic_year: string;
  module_id: string;
  name: string;
  grading_system: GradingSystem;
  points: number;
  failed: number;
  three: number;
  four: number;
  five: number;
};

/**
 * Model ModuleDates
 *
 */
export type ModuleDates = {
  course_instance_id: string;
  module_id: string;
  primary_date: string;
  secondary_date: string | null;
  tertiary_date: string | null;
};

/**
 * Model ProgrammeInstance
 *
 */
export type ProgrammeInstance = {
  instance_id: string;
  programme_code: string;
  admission_year: string;
};

/**
 * Model ProgrammePlanEntry
 *
 */
export type ProgrammePlanEntry = {
  programme_code: string;
  programme_instance_id: string;
  course_code: string;
  course_instance_id: string;
  grade: number;
  electivity: Electivity;
};

/**
 * Model Examiner
 *
 */
export type Examiner = {
  cid: string;
  name: string;
};

/**
 * Model Exam
 *
 */
export type Exam = {
  course_code: string;
  failed: number;
  three: number;
  four: number;
  five: number;
  thesis_id: number | null;
  solution_id: number | null;

  thesis?: ExamThesis;
  solution?: ExamSolution;
} & AssessmentResult;

/**
 * Model ExamThesis
 *
 */
export type ExamThesis = {
  id: number;
  filetype: string;
  verified: boolean;
  includes_solution: boolean;
  uploader_id: string | null;
  uploaded: Date;
  url: string;
};

/**
 * Model ExamSolution
 *
 */
export type ExamSolution = {
  id: number;
  filetype: string;
  verified: boolean;
  uploader_id: string | null;
  uploaded: Date;
  url: string;
};

/**
 * Model ExamAttachment
 *
 */
export type ExamAttachment = {
  id: number;
  name: string;
  filetype: string;
  verified: boolean;
  uploader: string | null;
  uploaded: Date;
  exam_course_code: string;
  exam_date: string;
};

/**
 * Model AlternativeExam
 *
 */
export type AlternativeExam = {
  course_code: string;
  exam_code: string;
  date: string;
  academic_year: string;
  failed: number;
  passed: number;
};

/**
 * Model Period
 *
 */
export type Period = {
  type: string;
  academic_year: string;
  study_period: number;
  start: Date;
  end: Date;
};

/**
 * Model Survey
 *
 */
export type Survey = {
  course_code: string;
  academic_year: string;
  start_period: number;
  end_period: number;
  language: string;
  respondents: number;
  responses: number;
  answer_frequency: number;
  prerequisite_mean: number;
  prerequisite_median: number;
  goals_mean: number;
  goals_median: number;
  structure_mean: number;
  structure_median: number;
  teaching_mean: number;
  teaching_median: number;
  litterature_mean: number;
  litterature_median: number;
  assessment_mean: number;
  assessment_median: number;
  administration_mean: number;
  administration_median: number;
  workload_mean: number;
  workload_median: number;
  working_environment_mean: number | null;
  working_environment_median: number | null;
  total_impression_mean: number;
  total_impression_median: number;
  has_minutes: boolean;

  // computed
  url: string;
};

/**
 * Model Department
 *
 */
export type Department = {
  id: number;
  name_sv: string;
  name_en: string;
};

/**
 * Model Programme
 *
 */
export type Programme = {
  code: string;
  name_sv: string;
  name_en: string;
  active: boolean;
};

/**
 * Model PageViews
 *
 */
export type PageViews = {
  timestamp: Date;
  page: string;
  event: string;
  data: string;
  cookie: string;
  ip: string;
};

/**
 * Model Log
 *
 */
export type Log = {
  id: number;
  timestamp: Date;
  level: string;
  msg: string | null;
  meta: JsonValue;
};

/**
 * Model feedback
 *
 */
export type Feedback = {
  id: number;
  timestamp: Date;
  email: string;
  message: string;
};

export type Module = {
  name: string;
  module_id: string;
  grading_system: string;
  points: number;
  results: Array<AssessmentResult>;
};

export type AssessmentResult = {
  date: string;
  academic_year: string;
  failed: number;
  three: number;
  four: number;
  five: number;
  total: number;
  percent: {
    failed: number;
    three: number;
    four: number;
    five: number;
  };
};

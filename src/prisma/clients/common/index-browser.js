
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.7.0
 * Query Engine version: 8746e055198f517658c08a0c426c7eec87f5a85f
 */
Prisma.prismaVersion = {
  client: "3.7.0",
  engine: "8746e055198f517658c08a0c426c7eec87f5a85f"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.CourseScalarFieldEnum = makeEnum({
  course_code: 'course_code',
  owner_code: 'owner_code',
  name_sv: 'name_sv',
  name_en: 'name_en',
  department_id: 'department_id'
});

exports.Prisma.CourseInstanceScalarFieldEnum = makeEnum({
  course_code: 'course_code',
  study_portal_id: 'study_portal_id',
  academic_year: 'academic_year',
  start_period: 'start_period',
  end_period: 'end_period',
  language: 'language',
  examiner_cid: 'examiner_cid'
});

exports.Prisma.CourseModuleScalarFieldEnum = makeEnum({
  course_instance_id: 'course_instance_id',
  module_id: 'module_id',
  kind: 'kind',
  points: 'points',
  start_period: 'start_period',
  end_period: 'end_period'
});

exports.Prisma.ModuleResultScalarFieldEnum = makeEnum({
  course_code: 'course_code',
  date: 'date',
  academic_year: 'academic_year',
  module_id: 'module_id',
  name: 'name',
  grading_system: 'grading_system',
  points: 'points',
  failed: 'failed',
  three: 'three',
  four: 'four',
  five: 'five'
});

exports.Prisma.ModuleDatesScalarFieldEnum = makeEnum({
  course_instance_id: 'course_instance_id',
  module_id: 'module_id',
  primary_date: 'primary_date',
  secondary_date: 'secondary_date',
  tertiary_date: 'tertiary_date'
});

exports.Prisma.ProgrammeInstanceScalarFieldEnum = makeEnum({
  instance_id: 'instance_id',
  programme_code: 'programme_code',
  admission_year: 'admission_year'
});

exports.Prisma.ProgrammePlanEntryScalarFieldEnum = makeEnum({
  programme_code: 'programme_code',
  programme_instance_id: 'programme_instance_id',
  course_code: 'course_code',
  course_instance_id: 'course_instance_id',
  grade: 'grade',
  electivity: 'electivity'
});

exports.Prisma.ExaminerScalarFieldEnum = makeEnum({
  cid: 'cid',
  name: 'name'
});

exports.Prisma.ExamScalarFieldEnum = makeEnum({
  course_code: 'course_code',
  date: 'date',
  academic_year: 'academic_year',
  failed: 'failed',
  three: 'three',
  four: 'four',
  five: 'five',
  thesis_id: 'thesis_id',
  solution_id: 'solution_id'
});

exports.Prisma.ExamThesisScalarFieldEnum = makeEnum({
  id: 'id',
  filetype: 'filetype',
  verified: 'verified',
  includes_solution: 'includes_solution',
  uploader_id: 'uploader_id',
  uploader: 'uploader',
  uploaded: 'uploaded'
});

exports.Prisma.ExamSolutionScalarFieldEnum = makeEnum({
  id: 'id',
  filetype: 'filetype',
  verified: 'verified',
  uploader_id: 'uploader_id',
  uploader: 'uploader',
  uploaded: 'uploaded'
});

exports.Prisma.ExamAttachmentScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  filetype: 'filetype',
  verified: 'verified',
  uploader: 'uploader',
  uploaded: 'uploaded',
  exam_course_code: 'exam_course_code',
  exam_date: 'exam_date'
});

exports.Prisma.AlternativeExamScalarFieldEnum = makeEnum({
  course_code: 'course_code',
  exam_code: 'exam_code',
  date: 'date',
  academic_year: 'academic_year',
  failed: 'failed',
  passed: 'passed'
});

exports.Prisma.PeriodScalarFieldEnum = makeEnum({
  type: 'type',
  academic_year: 'academic_year',
  study_period: 'study_period',
  start: 'start',
  end: 'end'
});

exports.Prisma.SurveyScalarFieldEnum = makeEnum({
  course_code: 'course_code',
  academic_year: 'academic_year',
  start_period: 'start_period',
  end_period: 'end_period',
  language: 'language',
  respondents: 'respondents',
  responses: 'responses',
  answer_frequency: 'answer_frequency',
  prerequisite_mean: 'prerequisite_mean',
  prerequisite_median: 'prerequisite_median',
  goals_mean: 'goals_mean',
  goals_median: 'goals_median',
  structure_mean: 'structure_mean',
  structure_median: 'structure_median',
  teaching_mean: 'teaching_mean',
  teaching_median: 'teaching_median',
  litterature_mean: 'litterature_mean',
  litterature_median: 'litterature_median',
  assessment_mean: 'assessment_mean',
  assessment_median: 'assessment_median',
  administration_mean: 'administration_mean',
  administration_median: 'administration_median',
  workload_mean: 'workload_mean',
  workload_median: 'workload_median',
  working_environment_mean: 'working_environment_mean',
  working_environment_median: 'working_environment_median',
  total_impression_mean: 'total_impression_mean',
  total_impression_median: 'total_impression_median',
  has_minutes: 'has_minutes'
});

exports.Prisma.DepartmentScalarFieldEnum = makeEnum({
  id: 'id',
  name_sv: 'name_sv',
  name_en: 'name_en'
});

exports.Prisma.ProgrammeScalarFieldEnum = makeEnum({
  code: 'code',
  name_sv: 'name_sv',
  name_en: 'name_en',
  active: 'active'
});

exports.Prisma.AlertsScalarFieldEnum = makeEnum({
  id: 'id',
  start: 'start',
  end: 'end',
  message: 'message',
  color: 'color'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.GradingSystem = makeEnum({
  PassFail: 'PassFail',
  ThreeFourFive: 'ThreeFourFive'
});

exports.Electivity = makeEnum({
  Compulsory: 'Compulsory',
  Elective: 'Elective',
  ElectiveCompulsory: 'ElectiveCompulsory',
  NotApplicable: 'NotApplicable'
});

exports.Prisma.ModelName = makeEnum({
  Course: 'Course',
  CourseInstance: 'CourseInstance',
  CourseModule: 'CourseModule',
  ModuleResult: 'ModuleResult',
  ModuleDates: 'ModuleDates',
  ProgrammeInstance: 'ProgrammeInstance',
  ProgrammePlanEntry: 'ProgrammePlanEntry',
  Examiner: 'Examiner',
  Exam: 'Exam',
  ExamThesis: 'ExamThesis',
  ExamSolution: 'ExamSolution',
  ExamAttachment: 'ExamAttachment',
  AlternativeExam: 'AlternativeExam',
  Period: 'Period',
  Survey: 'Survey',
  Department: 'Department',
  Programme: 'Programme',
  Alerts: 'Alerts'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

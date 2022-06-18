
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Course
 * 
 */
export type Course = {
  course_code: string
  owner_code: string
  name_sv: string
  name_en: string
  department_id: number | null
}

/**
 * Model CourseInstance
 * 
 */
export type CourseInstance = {
  course_code: string
  study_portal_id: string
  academic_year: string
  start_period: number
  end_period: number
  language: string
  examiner_cid: string
}

/**
 * Model CourseModule
 * 
 */
export type CourseModule = {
  course_instance_id: string
  module_id: string
  kind: string
  points: number
  start_period: number
  end_period: number
}

/**
 * Model ModuleResult
 * 
 */
export type ModuleResult = {
  course_code: string
  date: string
  academic_year: string
  module_id: string
  name: string
  grading_system: GradingSystem
  points: number
  failed: number
  three: number
  four: number
  five: number
}

/**
 * Model ModuleDates
 * 
 */
export type ModuleDates = {
  course_instance_id: string
  module_id: string
  primary_date: string
  secondary_date: string | null
  tertiary_date: string | null
}

/**
 * Model ProgrammeInstance
 * 
 */
export type ProgrammeInstance = {
  instance_id: string
  programme_code: string
  admission_year: string
}

/**
 * Model ProgrammePlanEntry
 * 
 */
export type ProgrammePlanEntry = {
  programme_code: string
  programme_instance_id: string
  course_code: string
  course_instance_id: string
  grade: number
  electivity: Electivity
}

/**
 * Model Examiner
 * 
 */
export type Examiner = {
  cid: string
  name: string
}

/**
 * Model Exam
 * 
 */
export type Exam = {
  course_code: string
  date: string
  academic_year: string
  failed: number
  three: number
  four: number
  five: number
  thesis_id: number | null
  solution_id: number | null
}

/**
 * Model ExamThesis
 * 
 */
export type ExamThesis = {
  id: number
  filetype: string
  verified: boolean
  includes_solution: boolean
  uploader_id: string | null
  uploader: string | null
  uploaded: Date
}

/**
 * Model ExamSolution
 * 
 */
export type ExamSolution = {
  id: number
  filetype: string
  verified: boolean
  uploader_id: string | null
  uploader: string | null
  uploaded: Date
}

/**
 * Model ExamAttachment
 * 
 */
export type ExamAttachment = {
  id: number
  name: string
  filetype: string
  verified: boolean
  uploader: string | null
  uploaded: Date
  exam_course_code: string
  exam_date: string
}

/**
 * Model AlternativeExam
 * 
 */
export type AlternativeExam = {
  course_code: string
  exam_code: string
  date: string
  academic_year: string
  failed: number
  passed: number
}

/**
 * Model Period
 * 
 */
export type Period = {
  type: string
  academic_year: string
  study_period: number
  start: Date
  end: Date
}

/**
 * Model Survey
 * 
 */
export type Survey = {
  course_code: string
  academic_year: string
  start_period: number
  end_period: number
  language: string
  respondents: number
  responses: number
  answer_frequency: number
  prerequisite_mean: number
  prerequisite_median: number
  goals_mean: number
  goals_median: number
  structure_mean: number
  structure_median: number
  teaching_mean: number
  teaching_median: number
  litterature_mean: number
  litterature_median: number
  assessment_mean: number
  assessment_median: number
  administration_mean: number
  administration_median: number
  workload_mean: number
  workload_median: number
  working_environment_mean: number | null
  working_environment_median: number | null
  total_impression_mean: number
  total_impression_median: number
  has_minutes: boolean
}

/**
 * Model Department
 * 
 */
export type Department = {
  id: number
  name_sv: string
  name_en: string
}

/**
 * Model Programme
 * 
 */
export type Programme = {
  code: string
  name_sv: string
  name_en: string
  active: boolean
}

/**
 * Model Alerts
 * 
 */
export type Alerts = {
  id: number
  start: Date
  end: Date
  message: string
  color: string
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const GradingSystem: {
  PassFail: 'PassFail',
  ThreeFourFive: 'ThreeFourFive'
};

export type GradingSystem = (typeof GradingSystem)[keyof typeof GradingSystem]


export const Electivity: {
  Compulsory: 'Compulsory',
  Elective: 'Elective',
  ElectiveCompulsory: 'ElectiveCompulsory',
  NotApplicable: 'NotApplicable'
};

export type Electivity = (typeof Electivity)[keyof typeof Electivity]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Courses
 * const courses = await prisma.course.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Courses
   * const courses = await prisma.course.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


      /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<GlobalReject>;

  /**
   * `prisma.courseInstance`: Exposes CRUD operations for the **CourseInstance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseInstances
    * const courseInstances = await prisma.courseInstance.findMany()
    * ```
    */
  get courseInstance(): Prisma.CourseInstanceDelegate<GlobalReject>;

  /**
   * `prisma.courseModule`: Exposes CRUD operations for the **CourseModule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseModules
    * const courseModules = await prisma.courseModule.findMany()
    * ```
    */
  get courseModule(): Prisma.CourseModuleDelegate<GlobalReject>;

  /**
   * `prisma.moduleResult`: Exposes CRUD operations for the **ModuleResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuleResults
    * const moduleResults = await prisma.moduleResult.findMany()
    * ```
    */
  get moduleResult(): Prisma.ModuleResultDelegate<GlobalReject>;

  /**
   * `prisma.moduleDates`: Exposes CRUD operations for the **ModuleDates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuleDates
    * const moduleDates = await prisma.moduleDates.findMany()
    * ```
    */
  get moduleDates(): Prisma.ModuleDatesDelegate<GlobalReject>;

  /**
   * `prisma.programmeInstance`: Exposes CRUD operations for the **ProgrammeInstance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgrammeInstances
    * const programmeInstances = await prisma.programmeInstance.findMany()
    * ```
    */
  get programmeInstance(): Prisma.ProgrammeInstanceDelegate<GlobalReject>;

  /**
   * `prisma.programmePlanEntry`: Exposes CRUD operations for the **ProgrammePlanEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgrammePlanEntries
    * const programmePlanEntries = await prisma.programmePlanEntry.findMany()
    * ```
    */
  get programmePlanEntry(): Prisma.ProgrammePlanEntryDelegate<GlobalReject>;

  /**
   * `prisma.examiner`: Exposes CRUD operations for the **Examiner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Examiners
    * const examiners = await prisma.examiner.findMany()
    * ```
    */
  get examiner(): Prisma.ExaminerDelegate<GlobalReject>;

  /**
   * `prisma.exam`: Exposes CRUD operations for the **Exam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exams
    * const exams = await prisma.exam.findMany()
    * ```
    */
  get exam(): Prisma.ExamDelegate<GlobalReject>;

  /**
   * `prisma.examThesis`: Exposes CRUD operations for the **ExamThesis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamTheses
    * const examTheses = await prisma.examThesis.findMany()
    * ```
    */
  get examThesis(): Prisma.ExamThesisDelegate<GlobalReject>;

  /**
   * `prisma.examSolution`: Exposes CRUD operations for the **ExamSolution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamSolutions
    * const examSolutions = await prisma.examSolution.findMany()
    * ```
    */
  get examSolution(): Prisma.ExamSolutionDelegate<GlobalReject>;

  /**
   * `prisma.examAttachment`: Exposes CRUD operations for the **ExamAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamAttachments
    * const examAttachments = await prisma.examAttachment.findMany()
    * ```
    */
  get examAttachment(): Prisma.ExamAttachmentDelegate<GlobalReject>;

  /**
   * `prisma.alternativeExam`: Exposes CRUD operations for the **AlternativeExam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlternativeExams
    * const alternativeExams = await prisma.alternativeExam.findMany()
    * ```
    */
  get alternativeExam(): Prisma.AlternativeExamDelegate<GlobalReject>;

  /**
   * `prisma.period`: Exposes CRUD operations for the **Period** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Periods
    * const periods = await prisma.period.findMany()
    * ```
    */
  get period(): Prisma.PeriodDelegate<GlobalReject>;

  /**
   * `prisma.survey`: Exposes CRUD operations for the **Survey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Surveys
    * const surveys = await prisma.survey.findMany()
    * ```
    */
  get survey(): Prisma.SurveyDelegate<GlobalReject>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<GlobalReject>;

  /**
   * `prisma.programme`: Exposes CRUD operations for the **Programme** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programmes
    * const programmes = await prisma.programme.findMany()
    * ```
    */
  get programme(): Prisma.ProgrammeDelegate<GlobalReject>;

  /**
   * `prisma.alerts`: Exposes CRUD operations for the **Alerts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alerts.findMany()
    * ```
    */
  get alerts(): Prisma.AlertsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.7.0
   * Query Engine version: 8746e055198f517658c08a0c426c7eec87f5a85f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CourseCountOutputType
   */


  export type CourseCountOutputType = {
    exams: number
    instances: number
    surveys: number
    programme_plan: number
    alternative_examinations: number
    ModuleResults: number
  }

  export type CourseCountOutputTypeSelect = {
    exams?: boolean
    instances?: boolean
    surveys?: boolean
    programme_plan?: boolean
    alternative_examinations?: boolean
    ModuleResults?: boolean
  }

  export type CourseCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CourseCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CourseCountOutputType
    : S extends undefined
    ? never
    : S extends CourseCountOutputTypeArgs
    ?'include' extends U
    ? CourseCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof CourseCountOutputType ?CourseCountOutputType [P]
  : 
     never
  } 
    : CourseCountOutputType
  : CourseCountOutputType




  // Custom InputTypes

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     * 
    **/
    select?: CourseCountOutputTypeSelect | null
  }



  /**
   * Count Type CourseInstanceCountOutputType
   */


  export type CourseInstanceCountOutputType = {
    programme_plan_entries: number
    modules: number
  }

  export type CourseInstanceCountOutputTypeSelect = {
    programme_plan_entries?: boolean
    modules?: boolean
  }

  export type CourseInstanceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CourseInstanceCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CourseInstanceCountOutputType
    : S extends undefined
    ? never
    : S extends CourseInstanceCountOutputTypeArgs
    ?'include' extends U
    ? CourseInstanceCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof CourseInstanceCountOutputType ?CourseInstanceCountOutputType [P]
  : 
     never
  } 
    : CourseInstanceCountOutputType
  : CourseInstanceCountOutputType




  // Custom InputTypes

  /**
   * CourseInstanceCountOutputType without action
   */
  export type CourseInstanceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CourseInstanceCountOutputType
     * 
    **/
    select?: CourseInstanceCountOutputTypeSelect | null
  }



  /**
   * Count Type ProgrammeInstanceCountOutputType
   */


  export type ProgrammeInstanceCountOutputType = {
    ProgrammePlanEntry: number
  }

  export type ProgrammeInstanceCountOutputTypeSelect = {
    ProgrammePlanEntry?: boolean
  }

  export type ProgrammeInstanceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProgrammeInstanceCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ProgrammeInstanceCountOutputType
    : S extends undefined
    ? never
    : S extends ProgrammeInstanceCountOutputTypeArgs
    ?'include' extends U
    ? ProgrammeInstanceCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ProgrammeInstanceCountOutputType ?ProgrammeInstanceCountOutputType [P]
  : 
     never
  } 
    : ProgrammeInstanceCountOutputType
  : ProgrammeInstanceCountOutputType




  // Custom InputTypes

  /**
   * ProgrammeInstanceCountOutputType without action
   */
  export type ProgrammeInstanceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstanceCountOutputType
     * 
    **/
    select?: ProgrammeInstanceCountOutputTypeSelect | null
  }



  /**
   * Count Type ExaminerCountOutputType
   */


  export type ExaminerCountOutputType = {
    CourseInstance: number
  }

  export type ExaminerCountOutputTypeSelect = {
    CourseInstance?: boolean
  }

  export type ExaminerCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExaminerCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ExaminerCountOutputType
    : S extends undefined
    ? never
    : S extends ExaminerCountOutputTypeArgs
    ?'include' extends U
    ? ExaminerCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExaminerCountOutputType ?ExaminerCountOutputType [P]
  : 
     never
  } 
    : ExaminerCountOutputType
  : ExaminerCountOutputType




  // Custom InputTypes

  /**
   * ExaminerCountOutputType without action
   */
  export type ExaminerCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExaminerCountOutputType
     * 
    **/
    select?: ExaminerCountOutputTypeSelect | null
  }



  /**
   * Count Type ExamCountOutputType
   */


  export type ExamCountOutputType = {
    attachments: number
  }

  export type ExamCountOutputTypeSelect = {
    attachments?: boolean
  }

  export type ExamCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExamCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ExamCountOutputType
    : S extends undefined
    ? never
    : S extends ExamCountOutputTypeArgs
    ?'include' extends U
    ? ExamCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExamCountOutputType ?ExamCountOutputType [P]
  : 
     never
  } 
    : ExamCountOutputType
  : ExamCountOutputType




  // Custom InputTypes

  /**
   * ExamCountOutputType without action
   */
  export type ExamCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExamCountOutputType
     * 
    **/
    select?: ExamCountOutputTypeSelect | null
  }



  /**
   * Count Type ExamThesisCountOutputType
   */


  export type ExamThesisCountOutputType = {
    exams: number
  }

  export type ExamThesisCountOutputTypeSelect = {
    exams?: boolean
  }

  export type ExamThesisCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExamThesisCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ExamThesisCountOutputType
    : S extends undefined
    ? never
    : S extends ExamThesisCountOutputTypeArgs
    ?'include' extends U
    ? ExamThesisCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExamThesisCountOutputType ?ExamThesisCountOutputType [P]
  : 
     never
  } 
    : ExamThesisCountOutputType
  : ExamThesisCountOutputType




  // Custom InputTypes

  /**
   * ExamThesisCountOutputType without action
   */
  export type ExamThesisCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExamThesisCountOutputType
     * 
    **/
    select?: ExamThesisCountOutputTypeSelect | null
  }



  /**
   * Count Type ExamSolutionCountOutputType
   */


  export type ExamSolutionCountOutputType = {
    exams: number
  }

  export type ExamSolutionCountOutputTypeSelect = {
    exams?: boolean
  }

  export type ExamSolutionCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExamSolutionCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ExamSolutionCountOutputType
    : S extends undefined
    ? never
    : S extends ExamSolutionCountOutputTypeArgs
    ?'include' extends U
    ? ExamSolutionCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExamSolutionCountOutputType ?ExamSolutionCountOutputType [P]
  : 
     never
  } 
    : ExamSolutionCountOutputType
  : ExamSolutionCountOutputType




  // Custom InputTypes

  /**
   * ExamSolutionCountOutputType without action
   */
  export type ExamSolutionCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExamSolutionCountOutputType
     * 
    **/
    select?: ExamSolutionCountOutputTypeSelect | null
  }



  /**
   * Count Type DepartmentCountOutputType
   */


  export type DepartmentCountOutputType = {
    Course: number
  }

  export type DepartmentCountOutputTypeSelect = {
    Course?: boolean
  }

  export type DepartmentCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DepartmentCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DepartmentCountOutputType
    : S extends undefined
    ? never
    : S extends DepartmentCountOutputTypeArgs
    ?'include' extends U
    ? DepartmentCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof DepartmentCountOutputType ?DepartmentCountOutputType [P]
  : 
     never
  } 
    : DepartmentCountOutputType
  : DepartmentCountOutputType




  // Custom InputTypes

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     * 
    **/
    select?: DepartmentCountOutputTypeSelect | null
  }



  /**
   * Count Type ProgrammeCountOutputType
   */


  export type ProgrammeCountOutputType = {
    courses: number
    programme_plans: number
  }

  export type ProgrammeCountOutputTypeSelect = {
    courses?: boolean
    programme_plans?: boolean
  }

  export type ProgrammeCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProgrammeCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ProgrammeCountOutputType
    : S extends undefined
    ? never
    : S extends ProgrammeCountOutputTypeArgs
    ?'include' extends U
    ? ProgrammeCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ProgrammeCountOutputType ?ProgrammeCountOutputType [P]
  : 
     never
  } 
    : ProgrammeCountOutputType
  : ProgrammeCountOutputType




  // Custom InputTypes

  /**
   * ProgrammeCountOutputType without action
   */
  export type ProgrammeCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeCountOutputType
     * 
    **/
    select?: ProgrammeCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Course
   */


  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    department_id: number | null
  }

  export type CourseSumAggregateOutputType = {
    department_id: number | null
  }

  export type CourseMinAggregateOutputType = {
    course_code: string | null
    owner_code: string | null
    name_sv: string | null
    name_en: string | null
    department_id: number | null
  }

  export type CourseMaxAggregateOutputType = {
    course_code: string | null
    owner_code: string | null
    name_sv: string | null
    name_en: string | null
    department_id: number | null
  }

  export type CourseCountAggregateOutputType = {
    course_code: number
    owner_code: number
    name_sv: number
    name_en: number
    department_id: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    department_id?: true
  }

  export type CourseSumAggregateInputType = {
    department_id?: true
  }

  export type CourseMinAggregateInputType = {
    course_code?: true
    owner_code?: true
    name_sv?: true
    name_en?: true
    department_id?: true
  }

  export type CourseMaxAggregateInputType = {
    course_code?: true
    owner_code?: true
    name_sv?: true
    name_en?: true
    department_id?: true
  }

  export type CourseCountAggregateInputType = {
    course_code?: true
    owner_code?: true
    name_sv?: true
    name_en?: true
    department_id?: true
    _all?: true
  }

  export type CourseAggregateArgs = {
    /**
     * Filter which Course to aggregate.
     * 
    **/
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs = {
    where?: CourseWhereInput
    orderBy?: Enumerable<CourseOrderByWithAggregationInput>
    by: Array<CourseScalarFieldEnum>
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }


  export type CourseGroupByOutputType = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id: number | null
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Promise<
    Array<
      PickArray<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect = {
    course_code?: boolean
    owner_code?: boolean
    name_sv?: boolean
    name_en?: boolean
    exams?: boolean | ExamFindManyArgs
    owner?: boolean | ProgrammeArgs
    department_id?: boolean
    department?: boolean | DepartmentArgs
    instances?: boolean | CourseInstanceFindManyArgs
    surveys?: boolean | SurveyFindManyArgs
    programme_plan?: boolean | ProgrammePlanEntryFindManyArgs
    alternative_examinations?: boolean | AlternativeExamFindManyArgs
    ModuleResults?: boolean | ModuleResultFindManyArgs
    _count?: boolean | CourseCountOutputTypeArgs
  }

  export type CourseInclude = {
    exams?: boolean | ExamFindManyArgs
    owner?: boolean | ProgrammeArgs
    department?: boolean | DepartmentArgs
    instances?: boolean | CourseInstanceFindManyArgs
    surveys?: boolean | SurveyFindManyArgs
    programme_plan?: boolean | ProgrammePlanEntryFindManyArgs
    alternative_examinations?: boolean | AlternativeExamFindManyArgs
    ModuleResults?: boolean | ModuleResultFindManyArgs
    _count?: boolean | CourseCountOutputTypeArgs
  }

  export type CourseGetPayload<
    S extends boolean | null | undefined | CourseArgs,
    U = keyof S
      > = S extends true
        ? Course
    : S extends undefined
    ? never
    : S extends CourseArgs | CourseFindManyArgs
    ?'include' extends U
    ? Course  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'exams'
        ? Array < ExamGetPayload<S['include'][P]>>  :
        P extends 'owner'
        ? ProgrammeGetPayload<S['include'][P]> :
        P extends 'department'
        ? DepartmentGetPayload<S['include'][P]> | null :
        P extends 'instances'
        ? Array < CourseInstanceGetPayload<S['include'][P]>>  :
        P extends 'surveys'
        ? Array < SurveyGetPayload<S['include'][P]>>  :
        P extends 'programme_plan'
        ? Array < ProgrammePlanEntryGetPayload<S['include'][P]>>  :
        P extends 'alternative_examinations'
        ? Array < AlternativeExamGetPayload<S['include'][P]>>  :
        P extends 'ModuleResults'
        ? Array < ModuleResultGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? CourseCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Course ?Course [P]
  : 
          P extends 'exams'
        ? Array < ExamGetPayload<S['select'][P]>>  :
        P extends 'owner'
        ? ProgrammeGetPayload<S['select'][P]> :
        P extends 'department'
        ? DepartmentGetPayload<S['select'][P]> | null :
        P extends 'instances'
        ? Array < CourseInstanceGetPayload<S['select'][P]>>  :
        P extends 'surveys'
        ? Array < SurveyGetPayload<S['select'][P]>>  :
        P extends 'programme_plan'
        ? Array < ProgrammePlanEntryGetPayload<S['select'][P]>>  :
        P extends 'alternative_examinations'
        ? Array < AlternativeExamGetPayload<S['select'][P]>>  :
        P extends 'ModuleResults'
        ? Array < ModuleResultGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? CourseCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Course
  : Course


  type CourseCountArgs = Merge<
    Omit<CourseFindManyArgs, 'select' | 'include'> & {
      select?: CourseCountAggregateInputType | true
    }
  >

  export interface CourseDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CourseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CourseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Course'> extends True ? CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>> : CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CourseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CourseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Course'> extends True ? CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>> : CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const courseWithCourse_codeOnly = await prisma.course.findMany({ select: { course_code: true } })
     * 
    **/
    findMany<T extends CourseFindManyArgs>(
      args?: SelectSubset<T, CourseFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Course>>, PrismaPromise<Array<CourseGetPayload<T>>>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
    **/
    create<T extends CourseCreateArgs>(
      args: SelectSubset<T, CourseCreateArgs>
    ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>

    /**
     * Create many Courses.
     *     @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     *     @example
     *     // Create many Courses
     *     const course = await prisma.course.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CourseCreateManyArgs>(
      args?: SelectSubset<T, CourseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
    **/
    delete<T extends CourseDeleteArgs>(
      args: SelectSubset<T, CourseDeleteArgs>
    ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CourseUpdateArgs>(
      args: SelectSubset<T, CourseUpdateArgs>
    ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CourseDeleteManyArgs>(
      args?: SelectSubset<T, CourseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CourseUpdateManyArgs>(
      args: SelectSubset<T, CourseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
    **/
    upsert<T extends CourseUpsertArgs>(
      args: SelectSubset<T, CourseUpsertArgs>
    ): CheckSelect<T, Prisma__CourseClient<Course>, Prisma__CourseClient<CourseGetPayload<T>>>

    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CourseClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    exams<T extends ExamFindManyArgs = {}>(args?: Subset<T, ExamFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Exam>>, PrismaPromise<Array<ExamGetPayload<T>>>>;

    owner<T extends ProgrammeArgs = {}>(args?: Subset<T, ProgrammeArgs>): CheckSelect<T, Prisma__ProgrammeClient<Programme | null >, Prisma__ProgrammeClient<ProgrammeGetPayload<T> | null >>;

    department<T extends DepartmentArgs = {}>(args?: Subset<T, DepartmentArgs>): CheckSelect<T, Prisma__DepartmentClient<Department | null >, Prisma__DepartmentClient<DepartmentGetPayload<T> | null >>;

    instances<T extends CourseInstanceFindManyArgs = {}>(args?: Subset<T, CourseInstanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<CourseInstance>>, PrismaPromise<Array<CourseInstanceGetPayload<T>>>>;

    surveys<T extends SurveyFindManyArgs = {}>(args?: Subset<T, SurveyFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Survey>>, PrismaPromise<Array<SurveyGetPayload<T>>>>;

    programme_plan<T extends ProgrammePlanEntryFindManyArgs = {}>(args?: Subset<T, ProgrammePlanEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProgrammePlanEntry>>, PrismaPromise<Array<ProgrammePlanEntryGetPayload<T>>>>;

    alternative_examinations<T extends AlternativeExamFindManyArgs = {}>(args?: Subset<T, AlternativeExamFindManyArgs>): CheckSelect<T, PrismaPromise<Array<AlternativeExam>>, PrismaPromise<Array<AlternativeExamGetPayload<T>>>>;

    ModuleResults<T extends ModuleResultFindManyArgs = {}>(args?: Subset<T, ModuleResultFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ModuleResult>>, PrismaPromise<Array<ModuleResultGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * Throw an Error if a Course can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Course to fetch.
     * 
    **/
    where: CourseWhereUniqueInput
  }


  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * Throw an Error if a Course can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Course to fetch.
     * 
    **/
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     * 
    **/
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     * 
    **/
    distinct?: Enumerable<CourseScalarFieldEnum>
  }


  /**
   * Course findMany
   */
  export type CourseFindManyArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * Filter, which Courses to fetch.
     * 
    **/
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     * 
    **/
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CourseScalarFieldEnum>
  }


  /**
   * Course create
   */
  export type CourseCreateArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * The data needed to create a Course.
     * 
    **/
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }


  /**
   * Course createMany
   */
  export type CourseCreateManyArgs = {
    data: Enumerable<CourseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Course update
   */
  export type CourseUpdateArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * The data needed to update a Course.
     * 
    **/
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     * 
    **/
    where: CourseWhereUniqueInput
  }


  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs = {
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    where?: CourseWhereInput
  }


  /**
   * Course upsert
   */
  export type CourseUpsertArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * The filter to search for the Course to update in case it exists.
     * 
    **/
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     * 
    **/
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }


  /**
   * Course delete
   */
  export type CourseDeleteArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
    /**
     * Filter which Course to delete.
     * 
    **/
    where: CourseWhereUniqueInput
  }


  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs = {
    where?: CourseWhereInput
  }


  /**
   * Course without action
   */
  export type CourseArgs = {
    /**
     * Select specific fields to fetch from the Course
     * 
    **/
    select?: CourseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInclude | null
  }



  /**
   * Model CourseInstance
   */


  export type AggregateCourseInstance = {
    _count: CourseInstanceCountAggregateOutputType | null
    _avg: CourseInstanceAvgAggregateOutputType | null
    _sum: CourseInstanceSumAggregateOutputType | null
    _min: CourseInstanceMinAggregateOutputType | null
    _max: CourseInstanceMaxAggregateOutputType | null
  }

  export type CourseInstanceAvgAggregateOutputType = {
    start_period: number | null
    end_period: number | null
  }

  export type CourseInstanceSumAggregateOutputType = {
    start_period: number | null
    end_period: number | null
  }

  export type CourseInstanceMinAggregateOutputType = {
    course_code: string | null
    study_portal_id: string | null
    academic_year: string | null
    start_period: number | null
    end_period: number | null
    language: string | null
    examiner_cid: string | null
  }

  export type CourseInstanceMaxAggregateOutputType = {
    course_code: string | null
    study_portal_id: string | null
    academic_year: string | null
    start_period: number | null
    end_period: number | null
    language: string | null
    examiner_cid: string | null
  }

  export type CourseInstanceCountAggregateOutputType = {
    course_code: number
    study_portal_id: number
    academic_year: number
    start_period: number
    end_period: number
    language: number
    examiner_cid: number
    _all: number
  }


  export type CourseInstanceAvgAggregateInputType = {
    start_period?: true
    end_period?: true
  }

  export type CourseInstanceSumAggregateInputType = {
    start_period?: true
    end_period?: true
  }

  export type CourseInstanceMinAggregateInputType = {
    course_code?: true
    study_portal_id?: true
    academic_year?: true
    start_period?: true
    end_period?: true
    language?: true
    examiner_cid?: true
  }

  export type CourseInstanceMaxAggregateInputType = {
    course_code?: true
    study_portal_id?: true
    academic_year?: true
    start_period?: true
    end_period?: true
    language?: true
    examiner_cid?: true
  }

  export type CourseInstanceCountAggregateInputType = {
    course_code?: true
    study_portal_id?: true
    academic_year?: true
    start_period?: true
    end_period?: true
    language?: true
    examiner_cid?: true
    _all?: true
  }

  export type CourseInstanceAggregateArgs = {
    /**
     * Filter which CourseInstance to aggregate.
     * 
    **/
    where?: CourseInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseInstances to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseInstanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CourseInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseInstances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseInstances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseInstances
    **/
    _count?: true | CourseInstanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseInstanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseInstanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseInstanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseInstanceMaxAggregateInputType
  }

  export type GetCourseInstanceAggregateType<T extends CourseInstanceAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseInstance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseInstance[P]>
      : GetScalarType<T[P], AggregateCourseInstance[P]>
  }




  export type CourseInstanceGroupByArgs = {
    where?: CourseInstanceWhereInput
    orderBy?: Enumerable<CourseInstanceOrderByWithAggregationInput>
    by: Array<CourseInstanceScalarFieldEnum>
    having?: CourseInstanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseInstanceCountAggregateInputType | true
    _avg?: CourseInstanceAvgAggregateInputType
    _sum?: CourseInstanceSumAggregateInputType
    _min?: CourseInstanceMinAggregateInputType
    _max?: CourseInstanceMaxAggregateInputType
  }


  export type CourseInstanceGroupByOutputType = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
    _count: CourseInstanceCountAggregateOutputType | null
    _avg: CourseInstanceAvgAggregateOutputType | null
    _sum: CourseInstanceSumAggregateOutputType | null
    _min: CourseInstanceMinAggregateOutputType | null
    _max: CourseInstanceMaxAggregateOutputType | null
  }

  type GetCourseInstanceGroupByPayload<T extends CourseInstanceGroupByArgs> = Promise<
    Array<
      PickArray<CourseInstanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseInstanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseInstanceGroupByOutputType[P]>
            : GetScalarType<T[P], CourseInstanceGroupByOutputType[P]>
        }
      >
    >


  export type CourseInstanceSelect = {
    course_code?: boolean
    course?: boolean | CourseArgs
    study_portal_id?: boolean
    academic_year?: boolean
    start_period?: boolean
    end_period?: boolean
    language?: boolean
    examiner_cid?: boolean
    examiner?: boolean | ExaminerArgs
    survey?: boolean | SurveyArgs
    programme_plan_entries?: boolean | ProgrammePlanEntryFindManyArgs
    modules?: boolean | CourseModuleFindManyArgs
    _count?: boolean | CourseInstanceCountOutputTypeArgs
  }

  export type CourseInstanceInclude = {
    course?: boolean | CourseArgs
    examiner?: boolean | ExaminerArgs
    survey?: boolean | SurveyArgs
    programme_plan_entries?: boolean | ProgrammePlanEntryFindManyArgs
    modules?: boolean | CourseModuleFindManyArgs
    _count?: boolean | CourseInstanceCountOutputTypeArgs
  }

  export type CourseInstanceGetPayload<
    S extends boolean | null | undefined | CourseInstanceArgs,
    U = keyof S
      > = S extends true
        ? CourseInstance
    : S extends undefined
    ? never
    : S extends CourseInstanceArgs | CourseInstanceFindManyArgs
    ?'include' extends U
    ? CourseInstance  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'course'
        ? CourseGetPayload<S['include'][P]> :
        P extends 'examiner'
        ? ExaminerGetPayload<S['include'][P]> :
        P extends 'survey'
        ? SurveyGetPayload<S['include'][P]> | null :
        P extends 'programme_plan_entries'
        ? Array < ProgrammePlanEntryGetPayload<S['include'][P]>>  :
        P extends 'modules'
        ? Array < CourseModuleGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? CourseInstanceCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof CourseInstance ?CourseInstance [P]
  : 
          P extends 'course'
        ? CourseGetPayload<S['select'][P]> :
        P extends 'examiner'
        ? ExaminerGetPayload<S['select'][P]> :
        P extends 'survey'
        ? SurveyGetPayload<S['select'][P]> | null :
        P extends 'programme_plan_entries'
        ? Array < ProgrammePlanEntryGetPayload<S['select'][P]>>  :
        P extends 'modules'
        ? Array < CourseModuleGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? CourseInstanceCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : CourseInstance
  : CourseInstance


  type CourseInstanceCountArgs = Merge<
    Omit<CourseInstanceFindManyArgs, 'select' | 'include'> & {
      select?: CourseInstanceCountAggregateInputType | true
    }
  >

  export interface CourseInstanceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CourseInstance that matches the filter.
     * @param {CourseInstanceFindUniqueArgs} args - Arguments to find a CourseInstance
     * @example
     * // Get one CourseInstance
     * const courseInstance = await prisma.courseInstance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CourseInstanceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CourseInstanceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CourseInstance'> extends True ? CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance>, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T>>> : CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance | null >, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T> | null >>

    /**
     * Find the first CourseInstance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseInstanceFindFirstArgs} args - Arguments to find a CourseInstance
     * @example
     * // Get one CourseInstance
     * const courseInstance = await prisma.courseInstance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CourseInstanceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CourseInstanceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CourseInstance'> extends True ? CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance>, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T>>> : CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance | null >, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T> | null >>

    /**
     * Find zero or more CourseInstances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseInstanceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseInstances
     * const courseInstances = await prisma.courseInstance.findMany()
     * 
     * // Get first 10 CourseInstances
     * const courseInstances = await prisma.courseInstance.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const courseInstanceWithCourse_codeOnly = await prisma.courseInstance.findMany({ select: { course_code: true } })
     * 
    **/
    findMany<T extends CourseInstanceFindManyArgs>(
      args?: SelectSubset<T, CourseInstanceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CourseInstance>>, PrismaPromise<Array<CourseInstanceGetPayload<T>>>>

    /**
     * Create a CourseInstance.
     * @param {CourseInstanceCreateArgs} args - Arguments to create a CourseInstance.
     * @example
     * // Create one CourseInstance
     * const CourseInstance = await prisma.courseInstance.create({
     *   data: {
     *     // ... data to create a CourseInstance
     *   }
     * })
     * 
    **/
    create<T extends CourseInstanceCreateArgs>(
      args: SelectSubset<T, CourseInstanceCreateArgs>
    ): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance>, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T>>>

    /**
     * Create many CourseInstances.
     *     @param {CourseInstanceCreateManyArgs} args - Arguments to create many CourseInstances.
     *     @example
     *     // Create many CourseInstances
     *     const courseInstance = await prisma.courseInstance.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CourseInstanceCreateManyArgs>(
      args?: SelectSubset<T, CourseInstanceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CourseInstance.
     * @param {CourseInstanceDeleteArgs} args - Arguments to delete one CourseInstance.
     * @example
     * // Delete one CourseInstance
     * const CourseInstance = await prisma.courseInstance.delete({
     *   where: {
     *     // ... filter to delete one CourseInstance
     *   }
     * })
     * 
    **/
    delete<T extends CourseInstanceDeleteArgs>(
      args: SelectSubset<T, CourseInstanceDeleteArgs>
    ): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance>, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T>>>

    /**
     * Update one CourseInstance.
     * @param {CourseInstanceUpdateArgs} args - Arguments to update one CourseInstance.
     * @example
     * // Update one CourseInstance
     * const courseInstance = await prisma.courseInstance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CourseInstanceUpdateArgs>(
      args: SelectSubset<T, CourseInstanceUpdateArgs>
    ): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance>, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T>>>

    /**
     * Delete zero or more CourseInstances.
     * @param {CourseInstanceDeleteManyArgs} args - Arguments to filter CourseInstances to delete.
     * @example
     * // Delete a few CourseInstances
     * const { count } = await prisma.courseInstance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CourseInstanceDeleteManyArgs>(
      args?: SelectSubset<T, CourseInstanceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseInstanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseInstances
     * const courseInstance = await prisma.courseInstance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CourseInstanceUpdateManyArgs>(
      args: SelectSubset<T, CourseInstanceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseInstance.
     * @param {CourseInstanceUpsertArgs} args - Arguments to update or create a CourseInstance.
     * @example
     * // Update or create a CourseInstance
     * const courseInstance = await prisma.courseInstance.upsert({
     *   create: {
     *     // ... data to create a CourseInstance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseInstance we want to update
     *   }
     * })
    **/
    upsert<T extends CourseInstanceUpsertArgs>(
      args: SelectSubset<T, CourseInstanceUpsertArgs>
    ): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance>, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T>>>

    /**
     * Count the number of CourseInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseInstanceCountArgs} args - Arguments to filter CourseInstances to count.
     * @example
     * // Count the number of CourseInstances
     * const count = await prisma.courseInstance.count({
     *   where: {
     *     // ... the filter for the CourseInstances we want to count
     *   }
     * })
    **/
    count<T extends CourseInstanceCountArgs>(
      args?: Subset<T, CourseInstanceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseInstanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseInstanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseInstanceAggregateArgs>(args: Subset<T, CourseInstanceAggregateArgs>): PrismaPromise<GetCourseInstanceAggregateType<T>>

    /**
     * Group by CourseInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseInstanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseInstanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseInstanceGroupByArgs['orderBy'] }
        : { orderBy?: CourseInstanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseInstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseInstanceGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseInstance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CourseInstanceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>;

    examiner<T extends ExaminerArgs = {}>(args?: Subset<T, ExaminerArgs>): CheckSelect<T, Prisma__ExaminerClient<Examiner | null >, Prisma__ExaminerClient<ExaminerGetPayload<T> | null >>;

    survey<T extends SurveyArgs = {}>(args?: Subset<T, SurveyArgs>): CheckSelect<T, Prisma__SurveyClient<Survey | null >, Prisma__SurveyClient<SurveyGetPayload<T> | null >>;

    programme_plan_entries<T extends ProgrammePlanEntryFindManyArgs = {}>(args?: Subset<T, ProgrammePlanEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProgrammePlanEntry>>, PrismaPromise<Array<ProgrammePlanEntryGetPayload<T>>>>;

    modules<T extends CourseModuleFindManyArgs = {}>(args?: Subset<T, CourseModuleFindManyArgs>): CheckSelect<T, PrismaPromise<Array<CourseModule>>, PrismaPromise<Array<CourseModuleGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CourseInstance findUnique
   */
  export type CourseInstanceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * Throw an Error if a CourseInstance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which CourseInstance to fetch.
     * 
    **/
    where: CourseInstanceWhereUniqueInput
  }


  /**
   * CourseInstance findFirst
   */
  export type CourseInstanceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * Throw an Error if a CourseInstance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which CourseInstance to fetch.
     * 
    **/
    where?: CourseInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseInstances to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseInstanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseInstances.
     * 
    **/
    cursor?: CourseInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseInstances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseInstances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseInstances.
     * 
    **/
    distinct?: Enumerable<CourseInstanceScalarFieldEnum>
  }


  /**
   * CourseInstance findMany
   */
  export type CourseInstanceFindManyArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * Filter, which CourseInstances to fetch.
     * 
    **/
    where?: CourseInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseInstances to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseInstanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseInstances.
     * 
    **/
    cursor?: CourseInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseInstances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseInstances.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CourseInstanceScalarFieldEnum>
  }


  /**
   * CourseInstance create
   */
  export type CourseInstanceCreateArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * The data needed to create a CourseInstance.
     * 
    **/
    data: XOR<CourseInstanceCreateInput, CourseInstanceUncheckedCreateInput>
  }


  /**
   * CourseInstance createMany
   */
  export type CourseInstanceCreateManyArgs = {
    data: Enumerable<CourseInstanceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CourseInstance update
   */
  export type CourseInstanceUpdateArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * The data needed to update a CourseInstance.
     * 
    **/
    data: XOR<CourseInstanceUpdateInput, CourseInstanceUncheckedUpdateInput>
    /**
     * Choose, which CourseInstance to update.
     * 
    **/
    where: CourseInstanceWhereUniqueInput
  }


  /**
   * CourseInstance updateMany
   */
  export type CourseInstanceUpdateManyArgs = {
    data: XOR<CourseInstanceUpdateManyMutationInput, CourseInstanceUncheckedUpdateManyInput>
    where?: CourseInstanceWhereInput
  }


  /**
   * CourseInstance upsert
   */
  export type CourseInstanceUpsertArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * The filter to search for the CourseInstance to update in case it exists.
     * 
    **/
    where: CourseInstanceWhereUniqueInput
    /**
     * In case the CourseInstance found by the `where` argument doesn't exist, create a new CourseInstance with this data.
     * 
    **/
    create: XOR<CourseInstanceCreateInput, CourseInstanceUncheckedCreateInput>
    /**
     * In case the CourseInstance was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CourseInstanceUpdateInput, CourseInstanceUncheckedUpdateInput>
  }


  /**
   * CourseInstance delete
   */
  export type CourseInstanceDeleteArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
    /**
     * Filter which CourseInstance to delete.
     * 
    **/
    where: CourseInstanceWhereUniqueInput
  }


  /**
   * CourseInstance deleteMany
   */
  export type CourseInstanceDeleteManyArgs = {
    where?: CourseInstanceWhereInput
  }


  /**
   * CourseInstance without action
   */
  export type CourseInstanceArgs = {
    /**
     * Select specific fields to fetch from the CourseInstance
     * 
    **/
    select?: CourseInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseInstanceInclude | null
  }



  /**
   * Model CourseModule
   */


  export type AggregateCourseModule = {
    _count: CourseModuleCountAggregateOutputType | null
    _avg: CourseModuleAvgAggregateOutputType | null
    _sum: CourseModuleSumAggregateOutputType | null
    _min: CourseModuleMinAggregateOutputType | null
    _max: CourseModuleMaxAggregateOutputType | null
  }

  export type CourseModuleAvgAggregateOutputType = {
    points: number | null
    start_period: number | null
    end_period: number | null
  }

  export type CourseModuleSumAggregateOutputType = {
    points: number | null
    start_period: number | null
    end_period: number | null
  }

  export type CourseModuleMinAggregateOutputType = {
    course_instance_id: string | null
    module_id: string | null
    kind: string | null
    points: number | null
    start_period: number | null
    end_period: number | null
  }

  export type CourseModuleMaxAggregateOutputType = {
    course_instance_id: string | null
    module_id: string | null
    kind: string | null
    points: number | null
    start_period: number | null
    end_period: number | null
  }

  export type CourseModuleCountAggregateOutputType = {
    course_instance_id: number
    module_id: number
    kind: number
    points: number
    start_period: number
    end_period: number
    _all: number
  }


  export type CourseModuleAvgAggregateInputType = {
    points?: true
    start_period?: true
    end_period?: true
  }

  export type CourseModuleSumAggregateInputType = {
    points?: true
    start_period?: true
    end_period?: true
  }

  export type CourseModuleMinAggregateInputType = {
    course_instance_id?: true
    module_id?: true
    kind?: true
    points?: true
    start_period?: true
    end_period?: true
  }

  export type CourseModuleMaxAggregateInputType = {
    course_instance_id?: true
    module_id?: true
    kind?: true
    points?: true
    start_period?: true
    end_period?: true
  }

  export type CourseModuleCountAggregateInputType = {
    course_instance_id?: true
    module_id?: true
    kind?: true
    points?: true
    start_period?: true
    end_period?: true
    _all?: true
  }

  export type CourseModuleAggregateArgs = {
    /**
     * Filter which CourseModule to aggregate.
     * 
    **/
    where?: CourseModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseModules to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseModuleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CourseModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseModules from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseModules.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseModules
    **/
    _count?: true | CourseModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseModuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseModuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseModuleMaxAggregateInputType
  }

  export type GetCourseModuleAggregateType<T extends CourseModuleAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseModule[P]>
      : GetScalarType<T[P], AggregateCourseModule[P]>
  }




  export type CourseModuleGroupByArgs = {
    where?: CourseModuleWhereInput
    orderBy?: Enumerable<CourseModuleOrderByWithAggregationInput>
    by: Array<CourseModuleScalarFieldEnum>
    having?: CourseModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseModuleCountAggregateInputType | true
    _avg?: CourseModuleAvgAggregateInputType
    _sum?: CourseModuleSumAggregateInputType
    _min?: CourseModuleMinAggregateInputType
    _max?: CourseModuleMaxAggregateInputType
  }


  export type CourseModuleGroupByOutputType = {
    course_instance_id: string
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
    _count: CourseModuleCountAggregateOutputType | null
    _avg: CourseModuleAvgAggregateOutputType | null
    _sum: CourseModuleSumAggregateOutputType | null
    _min: CourseModuleMinAggregateOutputType | null
    _max: CourseModuleMaxAggregateOutputType | null
  }

  type GetCourseModuleGroupByPayload<T extends CourseModuleGroupByArgs> = Promise<
    Array<
      PickArray<CourseModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseModuleGroupByOutputType[P]>
            : GetScalarType<T[P], CourseModuleGroupByOutputType[P]>
        }
      >
    >


  export type CourseModuleSelect = {
    course_instance_id?: boolean
    module_id?: boolean
    kind?: boolean
    points?: boolean
    start_period?: boolean
    end_period?: boolean
    course_instance?: boolean | CourseInstanceArgs
    dates?: boolean | ModuleDatesArgs
  }

  export type CourseModuleInclude = {
    course_instance?: boolean | CourseInstanceArgs
    dates?: boolean | ModuleDatesArgs
  }

  export type CourseModuleGetPayload<
    S extends boolean | null | undefined | CourseModuleArgs,
    U = keyof S
      > = S extends true
        ? CourseModule
    : S extends undefined
    ? never
    : S extends CourseModuleArgs | CourseModuleFindManyArgs
    ?'include' extends U
    ? CourseModule  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'course_instance'
        ? CourseInstanceGetPayload<S['include'][P]> :
        P extends 'dates'
        ? ModuleDatesGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof CourseModule ?CourseModule [P]
  : 
          P extends 'course_instance'
        ? CourseInstanceGetPayload<S['select'][P]> :
        P extends 'dates'
        ? ModuleDatesGetPayload<S['select'][P]> | null : never
  } 
    : CourseModule
  : CourseModule


  type CourseModuleCountArgs = Merge<
    Omit<CourseModuleFindManyArgs, 'select' | 'include'> & {
      select?: CourseModuleCountAggregateInputType | true
    }
  >

  export interface CourseModuleDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CourseModule that matches the filter.
     * @param {CourseModuleFindUniqueArgs} args - Arguments to find a CourseModule
     * @example
     * // Get one CourseModule
     * const courseModule = await prisma.courseModule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CourseModuleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CourseModuleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CourseModule'> extends True ? CheckSelect<T, Prisma__CourseModuleClient<CourseModule>, Prisma__CourseModuleClient<CourseModuleGetPayload<T>>> : CheckSelect<T, Prisma__CourseModuleClient<CourseModule | null >, Prisma__CourseModuleClient<CourseModuleGetPayload<T> | null >>

    /**
     * Find the first CourseModule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseModuleFindFirstArgs} args - Arguments to find a CourseModule
     * @example
     * // Get one CourseModule
     * const courseModule = await prisma.courseModule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CourseModuleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CourseModuleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CourseModule'> extends True ? CheckSelect<T, Prisma__CourseModuleClient<CourseModule>, Prisma__CourseModuleClient<CourseModuleGetPayload<T>>> : CheckSelect<T, Prisma__CourseModuleClient<CourseModule | null >, Prisma__CourseModuleClient<CourseModuleGetPayload<T> | null >>

    /**
     * Find zero or more CourseModules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseModuleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseModules
     * const courseModules = await prisma.courseModule.findMany()
     * 
     * // Get first 10 CourseModules
     * const courseModules = await prisma.courseModule.findMany({ take: 10 })
     * 
     * // Only select the `course_instance_id`
     * const courseModuleWithCourse_instance_idOnly = await prisma.courseModule.findMany({ select: { course_instance_id: true } })
     * 
    **/
    findMany<T extends CourseModuleFindManyArgs>(
      args?: SelectSubset<T, CourseModuleFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CourseModule>>, PrismaPromise<Array<CourseModuleGetPayload<T>>>>

    /**
     * Create a CourseModule.
     * @param {CourseModuleCreateArgs} args - Arguments to create a CourseModule.
     * @example
     * // Create one CourseModule
     * const CourseModule = await prisma.courseModule.create({
     *   data: {
     *     // ... data to create a CourseModule
     *   }
     * })
     * 
    **/
    create<T extends CourseModuleCreateArgs>(
      args: SelectSubset<T, CourseModuleCreateArgs>
    ): CheckSelect<T, Prisma__CourseModuleClient<CourseModule>, Prisma__CourseModuleClient<CourseModuleGetPayload<T>>>

    /**
     * Create many CourseModules.
     *     @param {CourseModuleCreateManyArgs} args - Arguments to create many CourseModules.
     *     @example
     *     // Create many CourseModules
     *     const courseModule = await prisma.courseModule.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CourseModuleCreateManyArgs>(
      args?: SelectSubset<T, CourseModuleCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CourseModule.
     * @param {CourseModuleDeleteArgs} args - Arguments to delete one CourseModule.
     * @example
     * // Delete one CourseModule
     * const CourseModule = await prisma.courseModule.delete({
     *   where: {
     *     // ... filter to delete one CourseModule
     *   }
     * })
     * 
    **/
    delete<T extends CourseModuleDeleteArgs>(
      args: SelectSubset<T, CourseModuleDeleteArgs>
    ): CheckSelect<T, Prisma__CourseModuleClient<CourseModule>, Prisma__CourseModuleClient<CourseModuleGetPayload<T>>>

    /**
     * Update one CourseModule.
     * @param {CourseModuleUpdateArgs} args - Arguments to update one CourseModule.
     * @example
     * // Update one CourseModule
     * const courseModule = await prisma.courseModule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CourseModuleUpdateArgs>(
      args: SelectSubset<T, CourseModuleUpdateArgs>
    ): CheckSelect<T, Prisma__CourseModuleClient<CourseModule>, Prisma__CourseModuleClient<CourseModuleGetPayload<T>>>

    /**
     * Delete zero or more CourseModules.
     * @param {CourseModuleDeleteManyArgs} args - Arguments to filter CourseModules to delete.
     * @example
     * // Delete a few CourseModules
     * const { count } = await prisma.courseModule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CourseModuleDeleteManyArgs>(
      args?: SelectSubset<T, CourseModuleDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseModules
     * const courseModule = await prisma.courseModule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CourseModuleUpdateManyArgs>(
      args: SelectSubset<T, CourseModuleUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseModule.
     * @param {CourseModuleUpsertArgs} args - Arguments to update or create a CourseModule.
     * @example
     * // Update or create a CourseModule
     * const courseModule = await prisma.courseModule.upsert({
     *   create: {
     *     // ... data to create a CourseModule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseModule we want to update
     *   }
     * })
    **/
    upsert<T extends CourseModuleUpsertArgs>(
      args: SelectSubset<T, CourseModuleUpsertArgs>
    ): CheckSelect<T, Prisma__CourseModuleClient<CourseModule>, Prisma__CourseModuleClient<CourseModuleGetPayload<T>>>

    /**
     * Count the number of CourseModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseModuleCountArgs} args - Arguments to filter CourseModules to count.
     * @example
     * // Count the number of CourseModules
     * const count = await prisma.courseModule.count({
     *   where: {
     *     // ... the filter for the CourseModules we want to count
     *   }
     * })
    **/
    count<T extends CourseModuleCountArgs>(
      args?: Subset<T, CourseModuleCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseModuleAggregateArgs>(args: Subset<T, CourseModuleAggregateArgs>): PrismaPromise<GetCourseModuleAggregateType<T>>

    /**
     * Group by CourseModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseModuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseModuleGroupByArgs['orderBy'] }
        : { orderBy?: CourseModuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseModuleGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseModule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CourseModuleClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    course_instance<T extends CourseInstanceArgs = {}>(args?: Subset<T, CourseInstanceArgs>): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance | null >, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T> | null >>;

    dates<T extends ModuleDatesArgs = {}>(args?: Subset<T, ModuleDatesArgs>): CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates | null >, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CourseModule findUnique
   */
  export type CourseModuleFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * Throw an Error if a CourseModule can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which CourseModule to fetch.
     * 
    **/
    where: CourseModuleWhereUniqueInput
  }


  /**
   * CourseModule findFirst
   */
  export type CourseModuleFindFirstArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * Throw an Error if a CourseModule can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which CourseModule to fetch.
     * 
    **/
    where?: CourseModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseModules to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseModuleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseModules.
     * 
    **/
    cursor?: CourseModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseModules from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseModules.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseModules.
     * 
    **/
    distinct?: Enumerable<CourseModuleScalarFieldEnum>
  }


  /**
   * CourseModule findMany
   */
  export type CourseModuleFindManyArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * Filter, which CourseModules to fetch.
     * 
    **/
    where?: CourseModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseModules to fetch.
     * 
    **/
    orderBy?: Enumerable<CourseModuleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseModules.
     * 
    **/
    cursor?: CourseModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseModules from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseModules.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CourseModuleScalarFieldEnum>
  }


  /**
   * CourseModule create
   */
  export type CourseModuleCreateArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * The data needed to create a CourseModule.
     * 
    **/
    data: XOR<CourseModuleCreateInput, CourseModuleUncheckedCreateInput>
  }


  /**
   * CourseModule createMany
   */
  export type CourseModuleCreateManyArgs = {
    data: Enumerable<CourseModuleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CourseModule update
   */
  export type CourseModuleUpdateArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * The data needed to update a CourseModule.
     * 
    **/
    data: XOR<CourseModuleUpdateInput, CourseModuleUncheckedUpdateInput>
    /**
     * Choose, which CourseModule to update.
     * 
    **/
    where: CourseModuleWhereUniqueInput
  }


  /**
   * CourseModule updateMany
   */
  export type CourseModuleUpdateManyArgs = {
    data: XOR<CourseModuleUpdateManyMutationInput, CourseModuleUncheckedUpdateManyInput>
    where?: CourseModuleWhereInput
  }


  /**
   * CourseModule upsert
   */
  export type CourseModuleUpsertArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * The filter to search for the CourseModule to update in case it exists.
     * 
    **/
    where: CourseModuleWhereUniqueInput
    /**
     * In case the CourseModule found by the `where` argument doesn't exist, create a new CourseModule with this data.
     * 
    **/
    create: XOR<CourseModuleCreateInput, CourseModuleUncheckedCreateInput>
    /**
     * In case the CourseModule was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CourseModuleUpdateInput, CourseModuleUncheckedUpdateInput>
  }


  /**
   * CourseModule delete
   */
  export type CourseModuleDeleteArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
    /**
     * Filter which CourseModule to delete.
     * 
    **/
    where: CourseModuleWhereUniqueInput
  }


  /**
   * CourseModule deleteMany
   */
  export type CourseModuleDeleteManyArgs = {
    where?: CourseModuleWhereInput
  }


  /**
   * CourseModule without action
   */
  export type CourseModuleArgs = {
    /**
     * Select specific fields to fetch from the CourseModule
     * 
    **/
    select?: CourseModuleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CourseModuleInclude | null
  }



  /**
   * Model ModuleResult
   */


  export type AggregateModuleResult = {
    _count: ModuleResultCountAggregateOutputType | null
    _avg: ModuleResultAvgAggregateOutputType | null
    _sum: ModuleResultSumAggregateOutputType | null
    _min: ModuleResultMinAggregateOutputType | null
    _max: ModuleResultMaxAggregateOutputType | null
  }

  export type ModuleResultAvgAggregateOutputType = {
    points: number | null
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
  }

  export type ModuleResultSumAggregateOutputType = {
    points: number | null
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
  }

  export type ModuleResultMinAggregateOutputType = {
    course_code: string | null
    date: string | null
    academic_year: string | null
    module_id: string | null
    name: string | null
    grading_system: GradingSystem | null
    points: number | null
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
  }

  export type ModuleResultMaxAggregateOutputType = {
    course_code: string | null
    date: string | null
    academic_year: string | null
    module_id: string | null
    name: string | null
    grading_system: GradingSystem | null
    points: number | null
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
  }

  export type ModuleResultCountAggregateOutputType = {
    course_code: number
    date: number
    academic_year: number
    module_id: number
    name: number
    grading_system: number
    points: number
    failed: number
    three: number
    four: number
    five: number
    _all: number
  }


  export type ModuleResultAvgAggregateInputType = {
    points?: true
    failed?: true
    three?: true
    four?: true
    five?: true
  }

  export type ModuleResultSumAggregateInputType = {
    points?: true
    failed?: true
    three?: true
    four?: true
    five?: true
  }

  export type ModuleResultMinAggregateInputType = {
    course_code?: true
    date?: true
    academic_year?: true
    module_id?: true
    name?: true
    grading_system?: true
    points?: true
    failed?: true
    three?: true
    four?: true
    five?: true
  }

  export type ModuleResultMaxAggregateInputType = {
    course_code?: true
    date?: true
    academic_year?: true
    module_id?: true
    name?: true
    grading_system?: true
    points?: true
    failed?: true
    three?: true
    four?: true
    five?: true
  }

  export type ModuleResultCountAggregateInputType = {
    course_code?: true
    date?: true
    academic_year?: true
    module_id?: true
    name?: true
    grading_system?: true
    points?: true
    failed?: true
    three?: true
    four?: true
    five?: true
    _all?: true
  }

  export type ModuleResultAggregateArgs = {
    /**
     * Filter which ModuleResult to aggregate.
     * 
    **/
    where?: ModuleResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleResults to fetch.
     * 
    **/
    orderBy?: Enumerable<ModuleResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ModuleResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleResults from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleResults.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuleResults
    **/
    _count?: true | ModuleResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModuleResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModuleResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleResultMaxAggregateInputType
  }

  export type GetModuleResultAggregateType<T extends ModuleResultAggregateArgs> = {
        [P in keyof T & keyof AggregateModuleResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuleResult[P]>
      : GetScalarType<T[P], AggregateModuleResult[P]>
  }




  export type ModuleResultGroupByArgs = {
    where?: ModuleResultWhereInput
    orderBy?: Enumerable<ModuleResultOrderByWithAggregationInput>
    by: Array<ModuleResultScalarFieldEnum>
    having?: ModuleResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuleResultCountAggregateInputType | true
    _avg?: ModuleResultAvgAggregateInputType
    _sum?: ModuleResultSumAggregateInputType
    _min?: ModuleResultMinAggregateInputType
    _max?: ModuleResultMaxAggregateInputType
  }


  export type ModuleResultGroupByOutputType = {
    course_code: string
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
    _count: ModuleResultCountAggregateOutputType | null
    _avg: ModuleResultAvgAggregateOutputType | null
    _sum: ModuleResultSumAggregateOutputType | null
    _min: ModuleResultMinAggregateOutputType | null
    _max: ModuleResultMaxAggregateOutputType | null
  }

  type GetModuleResultGroupByPayload<T extends ModuleResultGroupByArgs> = Promise<
    Array<
      PickArray<ModuleResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleResultGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleResultGroupByOutputType[P]>
        }
      >
    >


  export type ModuleResultSelect = {
    course_code?: boolean
    date?: boolean
    academic_year?: boolean
    module_id?: boolean
    name?: boolean
    grading_system?: boolean
    points?: boolean
    failed?: boolean
    three?: boolean
    four?: boolean
    five?: boolean
    course?: boolean | CourseArgs
  }

  export type ModuleResultInclude = {
    course?: boolean | CourseArgs
  }

  export type ModuleResultGetPayload<
    S extends boolean | null | undefined | ModuleResultArgs,
    U = keyof S
      > = S extends true
        ? ModuleResult
    : S extends undefined
    ? never
    : S extends ModuleResultArgs | ModuleResultFindManyArgs
    ?'include' extends U
    ? ModuleResult  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'course'
        ? CourseGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ModuleResult ?ModuleResult [P]
  : 
          P extends 'course'
        ? CourseGetPayload<S['select'][P]> : never
  } 
    : ModuleResult
  : ModuleResult


  type ModuleResultCountArgs = Merge<
    Omit<ModuleResultFindManyArgs, 'select' | 'include'> & {
      select?: ModuleResultCountAggregateInputType | true
    }
  >

  export interface ModuleResultDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ModuleResult that matches the filter.
     * @param {ModuleResultFindUniqueArgs} args - Arguments to find a ModuleResult
     * @example
     * // Get one ModuleResult
     * const moduleResult = await prisma.moduleResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuleResultFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModuleResultFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ModuleResult'> extends True ? CheckSelect<T, Prisma__ModuleResultClient<ModuleResult>, Prisma__ModuleResultClient<ModuleResultGetPayload<T>>> : CheckSelect<T, Prisma__ModuleResultClient<ModuleResult | null >, Prisma__ModuleResultClient<ModuleResultGetPayload<T> | null >>

    /**
     * Find the first ModuleResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleResultFindFirstArgs} args - Arguments to find a ModuleResult
     * @example
     * // Get one ModuleResult
     * const moduleResult = await prisma.moduleResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuleResultFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModuleResultFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ModuleResult'> extends True ? CheckSelect<T, Prisma__ModuleResultClient<ModuleResult>, Prisma__ModuleResultClient<ModuleResultGetPayload<T>>> : CheckSelect<T, Prisma__ModuleResultClient<ModuleResult | null >, Prisma__ModuleResultClient<ModuleResultGetPayload<T> | null >>

    /**
     * Find zero or more ModuleResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleResultFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuleResults
     * const moduleResults = await prisma.moduleResult.findMany()
     * 
     * // Get first 10 ModuleResults
     * const moduleResults = await prisma.moduleResult.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const moduleResultWithCourse_codeOnly = await prisma.moduleResult.findMany({ select: { course_code: true } })
     * 
    **/
    findMany<T extends ModuleResultFindManyArgs>(
      args?: SelectSubset<T, ModuleResultFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ModuleResult>>, PrismaPromise<Array<ModuleResultGetPayload<T>>>>

    /**
     * Create a ModuleResult.
     * @param {ModuleResultCreateArgs} args - Arguments to create a ModuleResult.
     * @example
     * // Create one ModuleResult
     * const ModuleResult = await prisma.moduleResult.create({
     *   data: {
     *     // ... data to create a ModuleResult
     *   }
     * })
     * 
    **/
    create<T extends ModuleResultCreateArgs>(
      args: SelectSubset<T, ModuleResultCreateArgs>
    ): CheckSelect<T, Prisma__ModuleResultClient<ModuleResult>, Prisma__ModuleResultClient<ModuleResultGetPayload<T>>>

    /**
     * Create many ModuleResults.
     *     @param {ModuleResultCreateManyArgs} args - Arguments to create many ModuleResults.
     *     @example
     *     // Create many ModuleResults
     *     const moduleResult = await prisma.moduleResult.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuleResultCreateManyArgs>(
      args?: SelectSubset<T, ModuleResultCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ModuleResult.
     * @param {ModuleResultDeleteArgs} args - Arguments to delete one ModuleResult.
     * @example
     * // Delete one ModuleResult
     * const ModuleResult = await prisma.moduleResult.delete({
     *   where: {
     *     // ... filter to delete one ModuleResult
     *   }
     * })
     * 
    **/
    delete<T extends ModuleResultDeleteArgs>(
      args: SelectSubset<T, ModuleResultDeleteArgs>
    ): CheckSelect<T, Prisma__ModuleResultClient<ModuleResult>, Prisma__ModuleResultClient<ModuleResultGetPayload<T>>>

    /**
     * Update one ModuleResult.
     * @param {ModuleResultUpdateArgs} args - Arguments to update one ModuleResult.
     * @example
     * // Update one ModuleResult
     * const moduleResult = await prisma.moduleResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuleResultUpdateArgs>(
      args: SelectSubset<T, ModuleResultUpdateArgs>
    ): CheckSelect<T, Prisma__ModuleResultClient<ModuleResult>, Prisma__ModuleResultClient<ModuleResultGetPayload<T>>>

    /**
     * Delete zero or more ModuleResults.
     * @param {ModuleResultDeleteManyArgs} args - Arguments to filter ModuleResults to delete.
     * @example
     * // Delete a few ModuleResults
     * const { count } = await prisma.moduleResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuleResultDeleteManyArgs>(
      args?: SelectSubset<T, ModuleResultDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuleResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuleResults
     * const moduleResult = await prisma.moduleResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuleResultUpdateManyArgs>(
      args: SelectSubset<T, ModuleResultUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ModuleResult.
     * @param {ModuleResultUpsertArgs} args - Arguments to update or create a ModuleResult.
     * @example
     * // Update or create a ModuleResult
     * const moduleResult = await prisma.moduleResult.upsert({
     *   create: {
     *     // ... data to create a ModuleResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuleResult we want to update
     *   }
     * })
    **/
    upsert<T extends ModuleResultUpsertArgs>(
      args: SelectSubset<T, ModuleResultUpsertArgs>
    ): CheckSelect<T, Prisma__ModuleResultClient<ModuleResult>, Prisma__ModuleResultClient<ModuleResultGetPayload<T>>>

    /**
     * Count the number of ModuleResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleResultCountArgs} args - Arguments to filter ModuleResults to count.
     * @example
     * // Count the number of ModuleResults
     * const count = await prisma.moduleResult.count({
     *   where: {
     *     // ... the filter for the ModuleResults we want to count
     *   }
     * })
    **/
    count<T extends ModuleResultCountArgs>(
      args?: Subset<T, ModuleResultCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuleResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuleResultAggregateArgs>(args: Subset<T, ModuleResultAggregateArgs>): PrismaPromise<GetModuleResultAggregateType<T>>

    /**
     * Group by ModuleResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuleResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleResultGroupByArgs['orderBy'] }
        : { orderBy?: ModuleResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuleResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleResultGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuleResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModuleResultClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ModuleResult findUnique
   */
  export type ModuleResultFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * Throw an Error if a ModuleResult can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ModuleResult to fetch.
     * 
    **/
    where: ModuleResultWhereUniqueInput
  }


  /**
   * ModuleResult findFirst
   */
  export type ModuleResultFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * Throw an Error if a ModuleResult can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ModuleResult to fetch.
     * 
    **/
    where?: ModuleResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleResults to fetch.
     * 
    **/
    orderBy?: Enumerable<ModuleResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuleResults.
     * 
    **/
    cursor?: ModuleResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleResults from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleResults.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuleResults.
     * 
    **/
    distinct?: Enumerable<ModuleResultScalarFieldEnum>
  }


  /**
   * ModuleResult findMany
   */
  export type ModuleResultFindManyArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * Filter, which ModuleResults to fetch.
     * 
    **/
    where?: ModuleResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleResults to fetch.
     * 
    **/
    orderBy?: Enumerable<ModuleResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuleResults.
     * 
    **/
    cursor?: ModuleResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleResults from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleResults.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ModuleResultScalarFieldEnum>
  }


  /**
   * ModuleResult create
   */
  export type ModuleResultCreateArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * The data needed to create a ModuleResult.
     * 
    **/
    data: XOR<ModuleResultCreateInput, ModuleResultUncheckedCreateInput>
  }


  /**
   * ModuleResult createMany
   */
  export type ModuleResultCreateManyArgs = {
    data: Enumerable<ModuleResultCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ModuleResult update
   */
  export type ModuleResultUpdateArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * The data needed to update a ModuleResult.
     * 
    **/
    data: XOR<ModuleResultUpdateInput, ModuleResultUncheckedUpdateInput>
    /**
     * Choose, which ModuleResult to update.
     * 
    **/
    where: ModuleResultWhereUniqueInput
  }


  /**
   * ModuleResult updateMany
   */
  export type ModuleResultUpdateManyArgs = {
    data: XOR<ModuleResultUpdateManyMutationInput, ModuleResultUncheckedUpdateManyInput>
    where?: ModuleResultWhereInput
  }


  /**
   * ModuleResult upsert
   */
  export type ModuleResultUpsertArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * The filter to search for the ModuleResult to update in case it exists.
     * 
    **/
    where: ModuleResultWhereUniqueInput
    /**
     * In case the ModuleResult found by the `where` argument doesn't exist, create a new ModuleResult with this data.
     * 
    **/
    create: XOR<ModuleResultCreateInput, ModuleResultUncheckedCreateInput>
    /**
     * In case the ModuleResult was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ModuleResultUpdateInput, ModuleResultUncheckedUpdateInput>
  }


  /**
   * ModuleResult delete
   */
  export type ModuleResultDeleteArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
    /**
     * Filter which ModuleResult to delete.
     * 
    **/
    where: ModuleResultWhereUniqueInput
  }


  /**
   * ModuleResult deleteMany
   */
  export type ModuleResultDeleteManyArgs = {
    where?: ModuleResultWhereInput
  }


  /**
   * ModuleResult without action
   */
  export type ModuleResultArgs = {
    /**
     * Select specific fields to fetch from the ModuleResult
     * 
    **/
    select?: ModuleResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleResultInclude | null
  }



  /**
   * Model ModuleDates
   */


  export type AggregateModuleDates = {
    _count: ModuleDatesCountAggregateOutputType | null
    _min: ModuleDatesMinAggregateOutputType | null
    _max: ModuleDatesMaxAggregateOutputType | null
  }

  export type ModuleDatesMinAggregateOutputType = {
    course_instance_id: string | null
    module_id: string | null
    primary_date: string | null
    secondary_date: string | null
    tertiary_date: string | null
  }

  export type ModuleDatesMaxAggregateOutputType = {
    course_instance_id: string | null
    module_id: string | null
    primary_date: string | null
    secondary_date: string | null
    tertiary_date: string | null
  }

  export type ModuleDatesCountAggregateOutputType = {
    course_instance_id: number
    module_id: number
    primary_date: number
    secondary_date: number
    tertiary_date: number
    _all: number
  }


  export type ModuleDatesMinAggregateInputType = {
    course_instance_id?: true
    module_id?: true
    primary_date?: true
    secondary_date?: true
    tertiary_date?: true
  }

  export type ModuleDatesMaxAggregateInputType = {
    course_instance_id?: true
    module_id?: true
    primary_date?: true
    secondary_date?: true
    tertiary_date?: true
  }

  export type ModuleDatesCountAggregateInputType = {
    course_instance_id?: true
    module_id?: true
    primary_date?: true
    secondary_date?: true
    tertiary_date?: true
    _all?: true
  }

  export type ModuleDatesAggregateArgs = {
    /**
     * Filter which ModuleDates to aggregate.
     * 
    **/
    where?: ModuleDatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleDates to fetch.
     * 
    **/
    orderBy?: Enumerable<ModuleDatesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ModuleDatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleDates from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleDates.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuleDates
    **/
    _count?: true | ModuleDatesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleDatesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleDatesMaxAggregateInputType
  }

  export type GetModuleDatesAggregateType<T extends ModuleDatesAggregateArgs> = {
        [P in keyof T & keyof AggregateModuleDates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuleDates[P]>
      : GetScalarType<T[P], AggregateModuleDates[P]>
  }




  export type ModuleDatesGroupByArgs = {
    where?: ModuleDatesWhereInput
    orderBy?: Enumerable<ModuleDatesOrderByWithAggregationInput>
    by: Array<ModuleDatesScalarFieldEnum>
    having?: ModuleDatesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuleDatesCountAggregateInputType | true
    _min?: ModuleDatesMinAggregateInputType
    _max?: ModuleDatesMaxAggregateInputType
  }


  export type ModuleDatesGroupByOutputType = {
    course_instance_id: string
    module_id: string
    primary_date: string
    secondary_date: string | null
    tertiary_date: string | null
    _count: ModuleDatesCountAggregateOutputType | null
    _min: ModuleDatesMinAggregateOutputType | null
    _max: ModuleDatesMaxAggregateOutputType | null
  }

  type GetModuleDatesGroupByPayload<T extends ModuleDatesGroupByArgs> = Promise<
    Array<
      PickArray<ModuleDatesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleDatesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleDatesGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleDatesGroupByOutputType[P]>
        }
      >
    >


  export type ModuleDatesSelect = {
    course_instance_id?: boolean
    module_id?: boolean
    module?: boolean | CourseModuleArgs
    primary_date?: boolean
    secondary_date?: boolean
    tertiary_date?: boolean
  }

  export type ModuleDatesInclude = {
    module?: boolean | CourseModuleArgs
  }

  export type ModuleDatesGetPayload<
    S extends boolean | null | undefined | ModuleDatesArgs,
    U = keyof S
      > = S extends true
        ? ModuleDates
    : S extends undefined
    ? never
    : S extends ModuleDatesArgs | ModuleDatesFindManyArgs
    ?'include' extends U
    ? ModuleDates  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'module'
        ? CourseModuleGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ModuleDates ?ModuleDates [P]
  : 
          P extends 'module'
        ? CourseModuleGetPayload<S['select'][P]> : never
  } 
    : ModuleDates
  : ModuleDates


  type ModuleDatesCountArgs = Merge<
    Omit<ModuleDatesFindManyArgs, 'select' | 'include'> & {
      select?: ModuleDatesCountAggregateInputType | true
    }
  >

  export interface ModuleDatesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ModuleDates that matches the filter.
     * @param {ModuleDatesFindUniqueArgs} args - Arguments to find a ModuleDates
     * @example
     * // Get one ModuleDates
     * const moduleDates = await prisma.moduleDates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuleDatesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ModuleDatesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ModuleDates'> extends True ? CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates>, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T>>> : CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates | null >, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T> | null >>

    /**
     * Find the first ModuleDates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleDatesFindFirstArgs} args - Arguments to find a ModuleDates
     * @example
     * // Get one ModuleDates
     * const moduleDates = await prisma.moduleDates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuleDatesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ModuleDatesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ModuleDates'> extends True ? CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates>, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T>>> : CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates | null >, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T> | null >>

    /**
     * Find zero or more ModuleDates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleDatesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuleDates
     * const moduleDates = await prisma.moduleDates.findMany()
     * 
     * // Get first 10 ModuleDates
     * const moduleDates = await prisma.moduleDates.findMany({ take: 10 })
     * 
     * // Only select the `course_instance_id`
     * const moduleDatesWithCourse_instance_idOnly = await prisma.moduleDates.findMany({ select: { course_instance_id: true } })
     * 
    **/
    findMany<T extends ModuleDatesFindManyArgs>(
      args?: SelectSubset<T, ModuleDatesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ModuleDates>>, PrismaPromise<Array<ModuleDatesGetPayload<T>>>>

    /**
     * Create a ModuleDates.
     * @param {ModuleDatesCreateArgs} args - Arguments to create a ModuleDates.
     * @example
     * // Create one ModuleDates
     * const ModuleDates = await prisma.moduleDates.create({
     *   data: {
     *     // ... data to create a ModuleDates
     *   }
     * })
     * 
    **/
    create<T extends ModuleDatesCreateArgs>(
      args: SelectSubset<T, ModuleDatesCreateArgs>
    ): CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates>, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T>>>

    /**
     * Create many ModuleDates.
     *     @param {ModuleDatesCreateManyArgs} args - Arguments to create many ModuleDates.
     *     @example
     *     // Create many ModuleDates
     *     const moduleDates = await prisma.moduleDates.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuleDatesCreateManyArgs>(
      args?: SelectSubset<T, ModuleDatesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ModuleDates.
     * @param {ModuleDatesDeleteArgs} args - Arguments to delete one ModuleDates.
     * @example
     * // Delete one ModuleDates
     * const ModuleDates = await prisma.moduleDates.delete({
     *   where: {
     *     // ... filter to delete one ModuleDates
     *   }
     * })
     * 
    **/
    delete<T extends ModuleDatesDeleteArgs>(
      args: SelectSubset<T, ModuleDatesDeleteArgs>
    ): CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates>, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T>>>

    /**
     * Update one ModuleDates.
     * @param {ModuleDatesUpdateArgs} args - Arguments to update one ModuleDates.
     * @example
     * // Update one ModuleDates
     * const moduleDates = await prisma.moduleDates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuleDatesUpdateArgs>(
      args: SelectSubset<T, ModuleDatesUpdateArgs>
    ): CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates>, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T>>>

    /**
     * Delete zero or more ModuleDates.
     * @param {ModuleDatesDeleteManyArgs} args - Arguments to filter ModuleDates to delete.
     * @example
     * // Delete a few ModuleDates
     * const { count } = await prisma.moduleDates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuleDatesDeleteManyArgs>(
      args?: SelectSubset<T, ModuleDatesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuleDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleDatesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuleDates
     * const moduleDates = await prisma.moduleDates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuleDatesUpdateManyArgs>(
      args: SelectSubset<T, ModuleDatesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ModuleDates.
     * @param {ModuleDatesUpsertArgs} args - Arguments to update or create a ModuleDates.
     * @example
     * // Update or create a ModuleDates
     * const moduleDates = await prisma.moduleDates.upsert({
     *   create: {
     *     // ... data to create a ModuleDates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuleDates we want to update
     *   }
     * })
    **/
    upsert<T extends ModuleDatesUpsertArgs>(
      args: SelectSubset<T, ModuleDatesUpsertArgs>
    ): CheckSelect<T, Prisma__ModuleDatesClient<ModuleDates>, Prisma__ModuleDatesClient<ModuleDatesGetPayload<T>>>

    /**
     * Count the number of ModuleDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleDatesCountArgs} args - Arguments to filter ModuleDates to count.
     * @example
     * // Count the number of ModuleDates
     * const count = await prisma.moduleDates.count({
     *   where: {
     *     // ... the filter for the ModuleDates we want to count
     *   }
     * })
    **/
    count<T extends ModuleDatesCountArgs>(
      args?: Subset<T, ModuleDatesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleDatesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuleDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleDatesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuleDatesAggregateArgs>(args: Subset<T, ModuleDatesAggregateArgs>): PrismaPromise<GetModuleDatesAggregateType<T>>

    /**
     * Group by ModuleDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleDatesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuleDatesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleDatesGroupByArgs['orderBy'] }
        : { orderBy?: ModuleDatesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuleDatesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleDatesGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuleDates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModuleDatesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    module<T extends CourseModuleArgs = {}>(args?: Subset<T, CourseModuleArgs>): CheckSelect<T, Prisma__CourseModuleClient<CourseModule | null >, Prisma__CourseModuleClient<CourseModuleGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ModuleDates findUnique
   */
  export type ModuleDatesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * Throw an Error if a ModuleDates can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ModuleDates to fetch.
     * 
    **/
    where: ModuleDatesWhereUniqueInput
  }


  /**
   * ModuleDates findFirst
   */
  export type ModuleDatesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * Throw an Error if a ModuleDates can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ModuleDates to fetch.
     * 
    **/
    where?: ModuleDatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleDates to fetch.
     * 
    **/
    orderBy?: Enumerable<ModuleDatesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuleDates.
     * 
    **/
    cursor?: ModuleDatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleDates from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleDates.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuleDates.
     * 
    **/
    distinct?: Enumerable<ModuleDatesScalarFieldEnum>
  }


  /**
   * ModuleDates findMany
   */
  export type ModuleDatesFindManyArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * Filter, which ModuleDates to fetch.
     * 
    **/
    where?: ModuleDatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleDates to fetch.
     * 
    **/
    orderBy?: Enumerable<ModuleDatesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuleDates.
     * 
    **/
    cursor?: ModuleDatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleDates from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleDates.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ModuleDatesScalarFieldEnum>
  }


  /**
   * ModuleDates create
   */
  export type ModuleDatesCreateArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * The data needed to create a ModuleDates.
     * 
    **/
    data: XOR<ModuleDatesCreateInput, ModuleDatesUncheckedCreateInput>
  }


  /**
   * ModuleDates createMany
   */
  export type ModuleDatesCreateManyArgs = {
    data: Enumerable<ModuleDatesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ModuleDates update
   */
  export type ModuleDatesUpdateArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * The data needed to update a ModuleDates.
     * 
    **/
    data: XOR<ModuleDatesUpdateInput, ModuleDatesUncheckedUpdateInput>
    /**
     * Choose, which ModuleDates to update.
     * 
    **/
    where: ModuleDatesWhereUniqueInput
  }


  /**
   * ModuleDates updateMany
   */
  export type ModuleDatesUpdateManyArgs = {
    data: XOR<ModuleDatesUpdateManyMutationInput, ModuleDatesUncheckedUpdateManyInput>
    where?: ModuleDatesWhereInput
  }


  /**
   * ModuleDates upsert
   */
  export type ModuleDatesUpsertArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * The filter to search for the ModuleDates to update in case it exists.
     * 
    **/
    where: ModuleDatesWhereUniqueInput
    /**
     * In case the ModuleDates found by the `where` argument doesn't exist, create a new ModuleDates with this data.
     * 
    **/
    create: XOR<ModuleDatesCreateInput, ModuleDatesUncheckedCreateInput>
    /**
     * In case the ModuleDates was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ModuleDatesUpdateInput, ModuleDatesUncheckedUpdateInput>
  }


  /**
   * ModuleDates delete
   */
  export type ModuleDatesDeleteArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
    /**
     * Filter which ModuleDates to delete.
     * 
    **/
    where: ModuleDatesWhereUniqueInput
  }


  /**
   * ModuleDates deleteMany
   */
  export type ModuleDatesDeleteManyArgs = {
    where?: ModuleDatesWhereInput
  }


  /**
   * ModuleDates without action
   */
  export type ModuleDatesArgs = {
    /**
     * Select specific fields to fetch from the ModuleDates
     * 
    **/
    select?: ModuleDatesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ModuleDatesInclude | null
  }



  /**
   * Model ProgrammeInstance
   */


  export type AggregateProgrammeInstance = {
    _count: ProgrammeInstanceCountAggregateOutputType | null
    _min: ProgrammeInstanceMinAggregateOutputType | null
    _max: ProgrammeInstanceMaxAggregateOutputType | null
  }

  export type ProgrammeInstanceMinAggregateOutputType = {
    instance_id: string | null
    programme_code: string | null
    admission_year: string | null
  }

  export type ProgrammeInstanceMaxAggregateOutputType = {
    instance_id: string | null
    programme_code: string | null
    admission_year: string | null
  }

  export type ProgrammeInstanceCountAggregateOutputType = {
    instance_id: number
    programme_code: number
    admission_year: number
    _all: number
  }


  export type ProgrammeInstanceMinAggregateInputType = {
    instance_id?: true
    programme_code?: true
    admission_year?: true
  }

  export type ProgrammeInstanceMaxAggregateInputType = {
    instance_id?: true
    programme_code?: true
    admission_year?: true
  }

  export type ProgrammeInstanceCountAggregateInputType = {
    instance_id?: true
    programme_code?: true
    admission_year?: true
    _all?: true
  }

  export type ProgrammeInstanceAggregateArgs = {
    /**
     * Filter which ProgrammeInstance to aggregate.
     * 
    **/
    where?: ProgrammeInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgrammeInstances to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammeInstanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProgrammeInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgrammeInstances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgrammeInstances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgrammeInstances
    **/
    _count?: true | ProgrammeInstanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgrammeInstanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgrammeInstanceMaxAggregateInputType
  }

  export type GetProgrammeInstanceAggregateType<T extends ProgrammeInstanceAggregateArgs> = {
        [P in keyof T & keyof AggregateProgrammeInstance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgrammeInstance[P]>
      : GetScalarType<T[P], AggregateProgrammeInstance[P]>
  }




  export type ProgrammeInstanceGroupByArgs = {
    where?: ProgrammeInstanceWhereInput
    orderBy?: Enumerable<ProgrammeInstanceOrderByWithAggregationInput>
    by: Array<ProgrammeInstanceScalarFieldEnum>
    having?: ProgrammeInstanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgrammeInstanceCountAggregateInputType | true
    _min?: ProgrammeInstanceMinAggregateInputType
    _max?: ProgrammeInstanceMaxAggregateInputType
  }


  export type ProgrammeInstanceGroupByOutputType = {
    instance_id: string
    programme_code: string
    admission_year: string
    _count: ProgrammeInstanceCountAggregateOutputType | null
    _min: ProgrammeInstanceMinAggregateOutputType | null
    _max: ProgrammeInstanceMaxAggregateOutputType | null
  }

  type GetProgrammeInstanceGroupByPayload<T extends ProgrammeInstanceGroupByArgs> = Promise<
    Array<
      PickArray<ProgrammeInstanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgrammeInstanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgrammeInstanceGroupByOutputType[P]>
            : GetScalarType<T[P], ProgrammeInstanceGroupByOutputType[P]>
        }
      >
    >


  export type ProgrammeInstanceSelect = {
    instance_id?: boolean
    programme_code?: boolean
    admission_year?: boolean
    ProgrammePlanEntry?: boolean | ProgrammePlanEntryFindManyArgs
    _count?: boolean | ProgrammeInstanceCountOutputTypeArgs
  }

  export type ProgrammeInstanceInclude = {
    ProgrammePlanEntry?: boolean | ProgrammePlanEntryFindManyArgs
    _count?: boolean | ProgrammeInstanceCountOutputTypeArgs
  }

  export type ProgrammeInstanceGetPayload<
    S extends boolean | null | undefined | ProgrammeInstanceArgs,
    U = keyof S
      > = S extends true
        ? ProgrammeInstance
    : S extends undefined
    ? never
    : S extends ProgrammeInstanceArgs | ProgrammeInstanceFindManyArgs
    ?'include' extends U
    ? ProgrammeInstance  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'ProgrammePlanEntry'
        ? Array < ProgrammePlanEntryGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? ProgrammeInstanceCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ProgrammeInstance ?ProgrammeInstance [P]
  : 
          P extends 'ProgrammePlanEntry'
        ? Array < ProgrammePlanEntryGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? ProgrammeInstanceCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : ProgrammeInstance
  : ProgrammeInstance


  type ProgrammeInstanceCountArgs = Merge<
    Omit<ProgrammeInstanceFindManyArgs, 'select' | 'include'> & {
      select?: ProgrammeInstanceCountAggregateInputType | true
    }
  >

  export interface ProgrammeInstanceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ProgrammeInstance that matches the filter.
     * @param {ProgrammeInstanceFindUniqueArgs} args - Arguments to find a ProgrammeInstance
     * @example
     * // Get one ProgrammeInstance
     * const programmeInstance = await prisma.programmeInstance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProgrammeInstanceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProgrammeInstanceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ProgrammeInstance'> extends True ? CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance>, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T>>> : CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance | null >, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T> | null >>

    /**
     * Find the first ProgrammeInstance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeInstanceFindFirstArgs} args - Arguments to find a ProgrammeInstance
     * @example
     * // Get one ProgrammeInstance
     * const programmeInstance = await prisma.programmeInstance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProgrammeInstanceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProgrammeInstanceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ProgrammeInstance'> extends True ? CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance>, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T>>> : CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance | null >, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T> | null >>

    /**
     * Find zero or more ProgrammeInstances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeInstanceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgrammeInstances
     * const programmeInstances = await prisma.programmeInstance.findMany()
     * 
     * // Get first 10 ProgrammeInstances
     * const programmeInstances = await prisma.programmeInstance.findMany({ take: 10 })
     * 
     * // Only select the `instance_id`
     * const programmeInstanceWithInstance_idOnly = await prisma.programmeInstance.findMany({ select: { instance_id: true } })
     * 
    **/
    findMany<T extends ProgrammeInstanceFindManyArgs>(
      args?: SelectSubset<T, ProgrammeInstanceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ProgrammeInstance>>, PrismaPromise<Array<ProgrammeInstanceGetPayload<T>>>>

    /**
     * Create a ProgrammeInstance.
     * @param {ProgrammeInstanceCreateArgs} args - Arguments to create a ProgrammeInstance.
     * @example
     * // Create one ProgrammeInstance
     * const ProgrammeInstance = await prisma.programmeInstance.create({
     *   data: {
     *     // ... data to create a ProgrammeInstance
     *   }
     * })
     * 
    **/
    create<T extends ProgrammeInstanceCreateArgs>(
      args: SelectSubset<T, ProgrammeInstanceCreateArgs>
    ): CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance>, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T>>>

    /**
     * Create many ProgrammeInstances.
     *     @param {ProgrammeInstanceCreateManyArgs} args - Arguments to create many ProgrammeInstances.
     *     @example
     *     // Create many ProgrammeInstances
     *     const programmeInstance = await prisma.programmeInstance.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProgrammeInstanceCreateManyArgs>(
      args?: SelectSubset<T, ProgrammeInstanceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ProgrammeInstance.
     * @param {ProgrammeInstanceDeleteArgs} args - Arguments to delete one ProgrammeInstance.
     * @example
     * // Delete one ProgrammeInstance
     * const ProgrammeInstance = await prisma.programmeInstance.delete({
     *   where: {
     *     // ... filter to delete one ProgrammeInstance
     *   }
     * })
     * 
    **/
    delete<T extends ProgrammeInstanceDeleteArgs>(
      args: SelectSubset<T, ProgrammeInstanceDeleteArgs>
    ): CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance>, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T>>>

    /**
     * Update one ProgrammeInstance.
     * @param {ProgrammeInstanceUpdateArgs} args - Arguments to update one ProgrammeInstance.
     * @example
     * // Update one ProgrammeInstance
     * const programmeInstance = await prisma.programmeInstance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProgrammeInstanceUpdateArgs>(
      args: SelectSubset<T, ProgrammeInstanceUpdateArgs>
    ): CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance>, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T>>>

    /**
     * Delete zero or more ProgrammeInstances.
     * @param {ProgrammeInstanceDeleteManyArgs} args - Arguments to filter ProgrammeInstances to delete.
     * @example
     * // Delete a few ProgrammeInstances
     * const { count } = await prisma.programmeInstance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProgrammeInstanceDeleteManyArgs>(
      args?: SelectSubset<T, ProgrammeInstanceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgrammeInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeInstanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgrammeInstances
     * const programmeInstance = await prisma.programmeInstance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProgrammeInstanceUpdateManyArgs>(
      args: SelectSubset<T, ProgrammeInstanceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ProgrammeInstance.
     * @param {ProgrammeInstanceUpsertArgs} args - Arguments to update or create a ProgrammeInstance.
     * @example
     * // Update or create a ProgrammeInstance
     * const programmeInstance = await prisma.programmeInstance.upsert({
     *   create: {
     *     // ... data to create a ProgrammeInstance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgrammeInstance we want to update
     *   }
     * })
    **/
    upsert<T extends ProgrammeInstanceUpsertArgs>(
      args: SelectSubset<T, ProgrammeInstanceUpsertArgs>
    ): CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance>, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T>>>

    /**
     * Count the number of ProgrammeInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeInstanceCountArgs} args - Arguments to filter ProgrammeInstances to count.
     * @example
     * // Count the number of ProgrammeInstances
     * const count = await prisma.programmeInstance.count({
     *   where: {
     *     // ... the filter for the ProgrammeInstances we want to count
     *   }
     * })
    **/
    count<T extends ProgrammeInstanceCountArgs>(
      args?: Subset<T, ProgrammeInstanceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgrammeInstanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgrammeInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeInstanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgrammeInstanceAggregateArgs>(args: Subset<T, ProgrammeInstanceAggregateArgs>): PrismaPromise<GetProgrammeInstanceAggregateType<T>>

    /**
     * Group by ProgrammeInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeInstanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgrammeInstanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgrammeInstanceGroupByArgs['orderBy'] }
        : { orderBy?: ProgrammeInstanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgrammeInstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgrammeInstanceGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgrammeInstance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProgrammeInstanceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ProgrammePlanEntry<T extends ProgrammePlanEntryFindManyArgs = {}>(args?: Subset<T, ProgrammePlanEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProgrammePlanEntry>>, PrismaPromise<Array<ProgrammePlanEntryGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ProgrammeInstance findUnique
   */
  export type ProgrammeInstanceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * Throw an Error if a ProgrammeInstance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ProgrammeInstance to fetch.
     * 
    **/
    where: ProgrammeInstanceWhereUniqueInput
  }


  /**
   * ProgrammeInstance findFirst
   */
  export type ProgrammeInstanceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * Throw an Error if a ProgrammeInstance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ProgrammeInstance to fetch.
     * 
    **/
    where?: ProgrammeInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgrammeInstances to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammeInstanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgrammeInstances.
     * 
    **/
    cursor?: ProgrammeInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgrammeInstances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgrammeInstances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgrammeInstances.
     * 
    **/
    distinct?: Enumerable<ProgrammeInstanceScalarFieldEnum>
  }


  /**
   * ProgrammeInstance findMany
   */
  export type ProgrammeInstanceFindManyArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * Filter, which ProgrammeInstances to fetch.
     * 
    **/
    where?: ProgrammeInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgrammeInstances to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammeInstanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgrammeInstances.
     * 
    **/
    cursor?: ProgrammeInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgrammeInstances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgrammeInstances.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProgrammeInstanceScalarFieldEnum>
  }


  /**
   * ProgrammeInstance create
   */
  export type ProgrammeInstanceCreateArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * The data needed to create a ProgrammeInstance.
     * 
    **/
    data: XOR<ProgrammeInstanceCreateInput, ProgrammeInstanceUncheckedCreateInput>
  }


  /**
   * ProgrammeInstance createMany
   */
  export type ProgrammeInstanceCreateManyArgs = {
    data: Enumerable<ProgrammeInstanceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ProgrammeInstance update
   */
  export type ProgrammeInstanceUpdateArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * The data needed to update a ProgrammeInstance.
     * 
    **/
    data: XOR<ProgrammeInstanceUpdateInput, ProgrammeInstanceUncheckedUpdateInput>
    /**
     * Choose, which ProgrammeInstance to update.
     * 
    **/
    where: ProgrammeInstanceWhereUniqueInput
  }


  /**
   * ProgrammeInstance updateMany
   */
  export type ProgrammeInstanceUpdateManyArgs = {
    data: XOR<ProgrammeInstanceUpdateManyMutationInput, ProgrammeInstanceUncheckedUpdateManyInput>
    where?: ProgrammeInstanceWhereInput
  }


  /**
   * ProgrammeInstance upsert
   */
  export type ProgrammeInstanceUpsertArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * The filter to search for the ProgrammeInstance to update in case it exists.
     * 
    **/
    where: ProgrammeInstanceWhereUniqueInput
    /**
     * In case the ProgrammeInstance found by the `where` argument doesn't exist, create a new ProgrammeInstance with this data.
     * 
    **/
    create: XOR<ProgrammeInstanceCreateInput, ProgrammeInstanceUncheckedCreateInput>
    /**
     * In case the ProgrammeInstance was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProgrammeInstanceUpdateInput, ProgrammeInstanceUncheckedUpdateInput>
  }


  /**
   * ProgrammeInstance delete
   */
  export type ProgrammeInstanceDeleteArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
    /**
     * Filter which ProgrammeInstance to delete.
     * 
    **/
    where: ProgrammeInstanceWhereUniqueInput
  }


  /**
   * ProgrammeInstance deleteMany
   */
  export type ProgrammeInstanceDeleteManyArgs = {
    where?: ProgrammeInstanceWhereInput
  }


  /**
   * ProgrammeInstance without action
   */
  export type ProgrammeInstanceArgs = {
    /**
     * Select specific fields to fetch from the ProgrammeInstance
     * 
    **/
    select?: ProgrammeInstanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInstanceInclude | null
  }



  /**
   * Model ProgrammePlanEntry
   */


  export type AggregateProgrammePlanEntry = {
    _count: ProgrammePlanEntryCountAggregateOutputType | null
    _avg: ProgrammePlanEntryAvgAggregateOutputType | null
    _sum: ProgrammePlanEntrySumAggregateOutputType | null
    _min: ProgrammePlanEntryMinAggregateOutputType | null
    _max: ProgrammePlanEntryMaxAggregateOutputType | null
  }

  export type ProgrammePlanEntryAvgAggregateOutputType = {
    grade: number | null
  }

  export type ProgrammePlanEntrySumAggregateOutputType = {
    grade: number | null
  }

  export type ProgrammePlanEntryMinAggregateOutputType = {
    programme_code: string | null
    programme_instance_id: string | null
    course_code: string | null
    course_instance_id: string | null
    grade: number | null
    electivity: Electivity | null
  }

  export type ProgrammePlanEntryMaxAggregateOutputType = {
    programme_code: string | null
    programme_instance_id: string | null
    course_code: string | null
    course_instance_id: string | null
    grade: number | null
    electivity: Electivity | null
  }

  export type ProgrammePlanEntryCountAggregateOutputType = {
    programme_code: number
    programme_instance_id: number
    course_code: number
    course_instance_id: number
    grade: number
    electivity: number
    _all: number
  }


  export type ProgrammePlanEntryAvgAggregateInputType = {
    grade?: true
  }

  export type ProgrammePlanEntrySumAggregateInputType = {
    grade?: true
  }

  export type ProgrammePlanEntryMinAggregateInputType = {
    programme_code?: true
    programme_instance_id?: true
    course_code?: true
    course_instance_id?: true
    grade?: true
    electivity?: true
  }

  export type ProgrammePlanEntryMaxAggregateInputType = {
    programme_code?: true
    programme_instance_id?: true
    course_code?: true
    course_instance_id?: true
    grade?: true
    electivity?: true
  }

  export type ProgrammePlanEntryCountAggregateInputType = {
    programme_code?: true
    programme_instance_id?: true
    course_code?: true
    course_instance_id?: true
    grade?: true
    electivity?: true
    _all?: true
  }

  export type ProgrammePlanEntryAggregateArgs = {
    /**
     * Filter which ProgrammePlanEntry to aggregate.
     * 
    **/
    where?: ProgrammePlanEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgrammePlanEntries to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammePlanEntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProgrammePlanEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgrammePlanEntries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgrammePlanEntries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgrammePlanEntries
    **/
    _count?: true | ProgrammePlanEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgrammePlanEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgrammePlanEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgrammePlanEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgrammePlanEntryMaxAggregateInputType
  }

  export type GetProgrammePlanEntryAggregateType<T extends ProgrammePlanEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateProgrammePlanEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgrammePlanEntry[P]>
      : GetScalarType<T[P], AggregateProgrammePlanEntry[P]>
  }




  export type ProgrammePlanEntryGroupByArgs = {
    where?: ProgrammePlanEntryWhereInput
    orderBy?: Enumerable<ProgrammePlanEntryOrderByWithAggregationInput>
    by: Array<ProgrammePlanEntryScalarFieldEnum>
    having?: ProgrammePlanEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgrammePlanEntryCountAggregateInputType | true
    _avg?: ProgrammePlanEntryAvgAggregateInputType
    _sum?: ProgrammePlanEntrySumAggregateInputType
    _min?: ProgrammePlanEntryMinAggregateInputType
    _max?: ProgrammePlanEntryMaxAggregateInputType
  }


  export type ProgrammePlanEntryGroupByOutputType = {
    programme_code: string
    programme_instance_id: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
    _count: ProgrammePlanEntryCountAggregateOutputType | null
    _avg: ProgrammePlanEntryAvgAggregateOutputType | null
    _sum: ProgrammePlanEntrySumAggregateOutputType | null
    _min: ProgrammePlanEntryMinAggregateOutputType | null
    _max: ProgrammePlanEntryMaxAggregateOutputType | null
  }

  type GetProgrammePlanEntryGroupByPayload<T extends ProgrammePlanEntryGroupByArgs> = Promise<
    Array<
      PickArray<ProgrammePlanEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgrammePlanEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgrammePlanEntryGroupByOutputType[P]>
            : GetScalarType<T[P], ProgrammePlanEntryGroupByOutputType[P]>
        }
      >
    >


  export type ProgrammePlanEntrySelect = {
    programme_code?: boolean
    programme_instance_id?: boolean
    course_code?: boolean
    course_instance_id?: boolean
    grade?: boolean
    electivity?: boolean
    programme?: boolean | ProgrammeArgs
    programme_instance?: boolean | ProgrammeInstanceArgs
    course?: boolean | CourseArgs
    course_instance?: boolean | CourseInstanceArgs
  }

  export type ProgrammePlanEntryInclude = {
    programme?: boolean | ProgrammeArgs
    programme_instance?: boolean | ProgrammeInstanceArgs
    course?: boolean | CourseArgs
    course_instance?: boolean | CourseInstanceArgs
  }

  export type ProgrammePlanEntryGetPayload<
    S extends boolean | null | undefined | ProgrammePlanEntryArgs,
    U = keyof S
      > = S extends true
        ? ProgrammePlanEntry
    : S extends undefined
    ? never
    : S extends ProgrammePlanEntryArgs | ProgrammePlanEntryFindManyArgs
    ?'include' extends U
    ? ProgrammePlanEntry  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'programme'
        ? ProgrammeGetPayload<S['include'][P]> :
        P extends 'programme_instance'
        ? ProgrammeInstanceGetPayload<S['include'][P]> :
        P extends 'course'
        ? CourseGetPayload<S['include'][P]> :
        P extends 'course_instance'
        ? CourseInstanceGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ProgrammePlanEntry ?ProgrammePlanEntry [P]
  : 
          P extends 'programme'
        ? ProgrammeGetPayload<S['select'][P]> :
        P extends 'programme_instance'
        ? ProgrammeInstanceGetPayload<S['select'][P]> :
        P extends 'course'
        ? CourseGetPayload<S['select'][P]> :
        P extends 'course_instance'
        ? CourseInstanceGetPayload<S['select'][P]> : never
  } 
    : ProgrammePlanEntry
  : ProgrammePlanEntry


  type ProgrammePlanEntryCountArgs = Merge<
    Omit<ProgrammePlanEntryFindManyArgs, 'select' | 'include'> & {
      select?: ProgrammePlanEntryCountAggregateInputType | true
    }
  >

  export interface ProgrammePlanEntryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ProgrammePlanEntry that matches the filter.
     * @param {ProgrammePlanEntryFindUniqueArgs} args - Arguments to find a ProgrammePlanEntry
     * @example
     * // Get one ProgrammePlanEntry
     * const programmePlanEntry = await prisma.programmePlanEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProgrammePlanEntryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProgrammePlanEntryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ProgrammePlanEntry'> extends True ? CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry>, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T>>> : CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry | null >, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T> | null >>

    /**
     * Find the first ProgrammePlanEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammePlanEntryFindFirstArgs} args - Arguments to find a ProgrammePlanEntry
     * @example
     * // Get one ProgrammePlanEntry
     * const programmePlanEntry = await prisma.programmePlanEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProgrammePlanEntryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProgrammePlanEntryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ProgrammePlanEntry'> extends True ? CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry>, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T>>> : CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry | null >, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T> | null >>

    /**
     * Find zero or more ProgrammePlanEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammePlanEntryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgrammePlanEntries
     * const programmePlanEntries = await prisma.programmePlanEntry.findMany()
     * 
     * // Get first 10 ProgrammePlanEntries
     * const programmePlanEntries = await prisma.programmePlanEntry.findMany({ take: 10 })
     * 
     * // Only select the `programme_code`
     * const programmePlanEntryWithProgramme_codeOnly = await prisma.programmePlanEntry.findMany({ select: { programme_code: true } })
     * 
    **/
    findMany<T extends ProgrammePlanEntryFindManyArgs>(
      args?: SelectSubset<T, ProgrammePlanEntryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ProgrammePlanEntry>>, PrismaPromise<Array<ProgrammePlanEntryGetPayload<T>>>>

    /**
     * Create a ProgrammePlanEntry.
     * @param {ProgrammePlanEntryCreateArgs} args - Arguments to create a ProgrammePlanEntry.
     * @example
     * // Create one ProgrammePlanEntry
     * const ProgrammePlanEntry = await prisma.programmePlanEntry.create({
     *   data: {
     *     // ... data to create a ProgrammePlanEntry
     *   }
     * })
     * 
    **/
    create<T extends ProgrammePlanEntryCreateArgs>(
      args: SelectSubset<T, ProgrammePlanEntryCreateArgs>
    ): CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry>, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T>>>

    /**
     * Create many ProgrammePlanEntries.
     *     @param {ProgrammePlanEntryCreateManyArgs} args - Arguments to create many ProgrammePlanEntries.
     *     @example
     *     // Create many ProgrammePlanEntries
     *     const programmePlanEntry = await prisma.programmePlanEntry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProgrammePlanEntryCreateManyArgs>(
      args?: SelectSubset<T, ProgrammePlanEntryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ProgrammePlanEntry.
     * @param {ProgrammePlanEntryDeleteArgs} args - Arguments to delete one ProgrammePlanEntry.
     * @example
     * // Delete one ProgrammePlanEntry
     * const ProgrammePlanEntry = await prisma.programmePlanEntry.delete({
     *   where: {
     *     // ... filter to delete one ProgrammePlanEntry
     *   }
     * })
     * 
    **/
    delete<T extends ProgrammePlanEntryDeleteArgs>(
      args: SelectSubset<T, ProgrammePlanEntryDeleteArgs>
    ): CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry>, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T>>>

    /**
     * Update one ProgrammePlanEntry.
     * @param {ProgrammePlanEntryUpdateArgs} args - Arguments to update one ProgrammePlanEntry.
     * @example
     * // Update one ProgrammePlanEntry
     * const programmePlanEntry = await prisma.programmePlanEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProgrammePlanEntryUpdateArgs>(
      args: SelectSubset<T, ProgrammePlanEntryUpdateArgs>
    ): CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry>, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T>>>

    /**
     * Delete zero or more ProgrammePlanEntries.
     * @param {ProgrammePlanEntryDeleteManyArgs} args - Arguments to filter ProgrammePlanEntries to delete.
     * @example
     * // Delete a few ProgrammePlanEntries
     * const { count } = await prisma.programmePlanEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProgrammePlanEntryDeleteManyArgs>(
      args?: SelectSubset<T, ProgrammePlanEntryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgrammePlanEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammePlanEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgrammePlanEntries
     * const programmePlanEntry = await prisma.programmePlanEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProgrammePlanEntryUpdateManyArgs>(
      args: SelectSubset<T, ProgrammePlanEntryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ProgrammePlanEntry.
     * @param {ProgrammePlanEntryUpsertArgs} args - Arguments to update or create a ProgrammePlanEntry.
     * @example
     * // Update or create a ProgrammePlanEntry
     * const programmePlanEntry = await prisma.programmePlanEntry.upsert({
     *   create: {
     *     // ... data to create a ProgrammePlanEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgrammePlanEntry we want to update
     *   }
     * })
    **/
    upsert<T extends ProgrammePlanEntryUpsertArgs>(
      args: SelectSubset<T, ProgrammePlanEntryUpsertArgs>
    ): CheckSelect<T, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntry>, Prisma__ProgrammePlanEntryClient<ProgrammePlanEntryGetPayload<T>>>

    /**
     * Count the number of ProgrammePlanEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammePlanEntryCountArgs} args - Arguments to filter ProgrammePlanEntries to count.
     * @example
     * // Count the number of ProgrammePlanEntries
     * const count = await prisma.programmePlanEntry.count({
     *   where: {
     *     // ... the filter for the ProgrammePlanEntries we want to count
     *   }
     * })
    **/
    count<T extends ProgrammePlanEntryCountArgs>(
      args?: Subset<T, ProgrammePlanEntryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgrammePlanEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgrammePlanEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammePlanEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgrammePlanEntryAggregateArgs>(args: Subset<T, ProgrammePlanEntryAggregateArgs>): PrismaPromise<GetProgrammePlanEntryAggregateType<T>>

    /**
     * Group by ProgrammePlanEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammePlanEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgrammePlanEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgrammePlanEntryGroupByArgs['orderBy'] }
        : { orderBy?: ProgrammePlanEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgrammePlanEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgrammePlanEntryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgrammePlanEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProgrammePlanEntryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    programme<T extends ProgrammeArgs = {}>(args?: Subset<T, ProgrammeArgs>): CheckSelect<T, Prisma__ProgrammeClient<Programme | null >, Prisma__ProgrammeClient<ProgrammeGetPayload<T> | null >>;

    programme_instance<T extends ProgrammeInstanceArgs = {}>(args?: Subset<T, ProgrammeInstanceArgs>): CheckSelect<T, Prisma__ProgrammeInstanceClient<ProgrammeInstance | null >, Prisma__ProgrammeInstanceClient<ProgrammeInstanceGetPayload<T> | null >>;

    course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>;

    course_instance<T extends CourseInstanceArgs = {}>(args?: Subset<T, CourseInstanceArgs>): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance | null >, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ProgrammePlanEntry findUnique
   */
  export type ProgrammePlanEntryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * Throw an Error if a ProgrammePlanEntry can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ProgrammePlanEntry to fetch.
     * 
    **/
    where: ProgrammePlanEntryWhereUniqueInput
  }


  /**
   * ProgrammePlanEntry findFirst
   */
  export type ProgrammePlanEntryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * Throw an Error if a ProgrammePlanEntry can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ProgrammePlanEntry to fetch.
     * 
    **/
    where?: ProgrammePlanEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgrammePlanEntries to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammePlanEntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgrammePlanEntries.
     * 
    **/
    cursor?: ProgrammePlanEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgrammePlanEntries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgrammePlanEntries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgrammePlanEntries.
     * 
    **/
    distinct?: Enumerable<ProgrammePlanEntryScalarFieldEnum>
  }


  /**
   * ProgrammePlanEntry findMany
   */
  export type ProgrammePlanEntryFindManyArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * Filter, which ProgrammePlanEntries to fetch.
     * 
    **/
    where?: ProgrammePlanEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgrammePlanEntries to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammePlanEntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgrammePlanEntries.
     * 
    **/
    cursor?: ProgrammePlanEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgrammePlanEntries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgrammePlanEntries.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProgrammePlanEntryScalarFieldEnum>
  }


  /**
   * ProgrammePlanEntry create
   */
  export type ProgrammePlanEntryCreateArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * The data needed to create a ProgrammePlanEntry.
     * 
    **/
    data: XOR<ProgrammePlanEntryCreateInput, ProgrammePlanEntryUncheckedCreateInput>
  }


  /**
   * ProgrammePlanEntry createMany
   */
  export type ProgrammePlanEntryCreateManyArgs = {
    data: Enumerable<ProgrammePlanEntryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ProgrammePlanEntry update
   */
  export type ProgrammePlanEntryUpdateArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * The data needed to update a ProgrammePlanEntry.
     * 
    **/
    data: XOR<ProgrammePlanEntryUpdateInput, ProgrammePlanEntryUncheckedUpdateInput>
    /**
     * Choose, which ProgrammePlanEntry to update.
     * 
    **/
    where: ProgrammePlanEntryWhereUniqueInput
  }


  /**
   * ProgrammePlanEntry updateMany
   */
  export type ProgrammePlanEntryUpdateManyArgs = {
    data: XOR<ProgrammePlanEntryUpdateManyMutationInput, ProgrammePlanEntryUncheckedUpdateManyInput>
    where?: ProgrammePlanEntryWhereInput
  }


  /**
   * ProgrammePlanEntry upsert
   */
  export type ProgrammePlanEntryUpsertArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * The filter to search for the ProgrammePlanEntry to update in case it exists.
     * 
    **/
    where: ProgrammePlanEntryWhereUniqueInput
    /**
     * In case the ProgrammePlanEntry found by the `where` argument doesn't exist, create a new ProgrammePlanEntry with this data.
     * 
    **/
    create: XOR<ProgrammePlanEntryCreateInput, ProgrammePlanEntryUncheckedCreateInput>
    /**
     * In case the ProgrammePlanEntry was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProgrammePlanEntryUpdateInput, ProgrammePlanEntryUncheckedUpdateInput>
  }


  /**
   * ProgrammePlanEntry delete
   */
  export type ProgrammePlanEntryDeleteArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
    /**
     * Filter which ProgrammePlanEntry to delete.
     * 
    **/
    where: ProgrammePlanEntryWhereUniqueInput
  }


  /**
   * ProgrammePlanEntry deleteMany
   */
  export type ProgrammePlanEntryDeleteManyArgs = {
    where?: ProgrammePlanEntryWhereInput
  }


  /**
   * ProgrammePlanEntry without action
   */
  export type ProgrammePlanEntryArgs = {
    /**
     * Select specific fields to fetch from the ProgrammePlanEntry
     * 
    **/
    select?: ProgrammePlanEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammePlanEntryInclude | null
  }



  /**
   * Model Examiner
   */


  export type AggregateExaminer = {
    _count: ExaminerCountAggregateOutputType | null
    _min: ExaminerMinAggregateOutputType | null
    _max: ExaminerMaxAggregateOutputType | null
  }

  export type ExaminerMinAggregateOutputType = {
    cid: string | null
    name: string | null
  }

  export type ExaminerMaxAggregateOutputType = {
    cid: string | null
    name: string | null
  }

  export type ExaminerCountAggregateOutputType = {
    cid: number
    name: number
    _all: number
  }


  export type ExaminerMinAggregateInputType = {
    cid?: true
    name?: true
  }

  export type ExaminerMaxAggregateInputType = {
    cid?: true
    name?: true
  }

  export type ExaminerCountAggregateInputType = {
    cid?: true
    name?: true
    _all?: true
  }

  export type ExaminerAggregateArgs = {
    /**
     * Filter which Examiner to aggregate.
     * 
    **/
    where?: ExaminerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examiners to fetch.
     * 
    **/
    orderBy?: Enumerable<ExaminerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExaminerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examiners from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examiners.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Examiners
    **/
    _count?: true | ExaminerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExaminerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExaminerMaxAggregateInputType
  }

  export type GetExaminerAggregateType<T extends ExaminerAggregateArgs> = {
        [P in keyof T & keyof AggregateExaminer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExaminer[P]>
      : GetScalarType<T[P], AggregateExaminer[P]>
  }




  export type ExaminerGroupByArgs = {
    where?: ExaminerWhereInput
    orderBy?: Enumerable<ExaminerOrderByWithAggregationInput>
    by: Array<ExaminerScalarFieldEnum>
    having?: ExaminerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExaminerCountAggregateInputType | true
    _min?: ExaminerMinAggregateInputType
    _max?: ExaminerMaxAggregateInputType
  }


  export type ExaminerGroupByOutputType = {
    cid: string
    name: string
    _count: ExaminerCountAggregateOutputType | null
    _min: ExaminerMinAggregateOutputType | null
    _max: ExaminerMaxAggregateOutputType | null
  }

  type GetExaminerGroupByPayload<T extends ExaminerGroupByArgs> = Promise<
    Array<
      PickArray<ExaminerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExaminerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExaminerGroupByOutputType[P]>
            : GetScalarType<T[P], ExaminerGroupByOutputType[P]>
        }
      >
    >


  export type ExaminerSelect = {
    cid?: boolean
    name?: boolean
    CourseInstance?: boolean | CourseInstanceFindManyArgs
    _count?: boolean | ExaminerCountOutputTypeArgs
  }

  export type ExaminerInclude = {
    CourseInstance?: boolean | CourseInstanceFindManyArgs
    _count?: boolean | ExaminerCountOutputTypeArgs
  }

  export type ExaminerGetPayload<
    S extends boolean | null | undefined | ExaminerArgs,
    U = keyof S
      > = S extends true
        ? Examiner
    : S extends undefined
    ? never
    : S extends ExaminerArgs | ExaminerFindManyArgs
    ?'include' extends U
    ? Examiner  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'CourseInstance'
        ? Array < CourseInstanceGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? ExaminerCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Examiner ?Examiner [P]
  : 
          P extends 'CourseInstance'
        ? Array < CourseInstanceGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? ExaminerCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Examiner
  : Examiner


  type ExaminerCountArgs = Merge<
    Omit<ExaminerFindManyArgs, 'select' | 'include'> & {
      select?: ExaminerCountAggregateInputType | true
    }
  >

  export interface ExaminerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Examiner that matches the filter.
     * @param {ExaminerFindUniqueArgs} args - Arguments to find a Examiner
     * @example
     * // Get one Examiner
     * const examiner = await prisma.examiner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExaminerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExaminerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Examiner'> extends True ? CheckSelect<T, Prisma__ExaminerClient<Examiner>, Prisma__ExaminerClient<ExaminerGetPayload<T>>> : CheckSelect<T, Prisma__ExaminerClient<Examiner | null >, Prisma__ExaminerClient<ExaminerGetPayload<T> | null >>

    /**
     * Find the first Examiner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminerFindFirstArgs} args - Arguments to find a Examiner
     * @example
     * // Get one Examiner
     * const examiner = await prisma.examiner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExaminerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExaminerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Examiner'> extends True ? CheckSelect<T, Prisma__ExaminerClient<Examiner>, Prisma__ExaminerClient<ExaminerGetPayload<T>>> : CheckSelect<T, Prisma__ExaminerClient<Examiner | null >, Prisma__ExaminerClient<ExaminerGetPayload<T> | null >>

    /**
     * Find zero or more Examiners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Examiners
     * const examiners = await prisma.examiner.findMany()
     * 
     * // Get first 10 Examiners
     * const examiners = await prisma.examiner.findMany({ take: 10 })
     * 
     * // Only select the `cid`
     * const examinerWithCidOnly = await prisma.examiner.findMany({ select: { cid: true } })
     * 
    **/
    findMany<T extends ExaminerFindManyArgs>(
      args?: SelectSubset<T, ExaminerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Examiner>>, PrismaPromise<Array<ExaminerGetPayload<T>>>>

    /**
     * Create a Examiner.
     * @param {ExaminerCreateArgs} args - Arguments to create a Examiner.
     * @example
     * // Create one Examiner
     * const Examiner = await prisma.examiner.create({
     *   data: {
     *     // ... data to create a Examiner
     *   }
     * })
     * 
    **/
    create<T extends ExaminerCreateArgs>(
      args: SelectSubset<T, ExaminerCreateArgs>
    ): CheckSelect<T, Prisma__ExaminerClient<Examiner>, Prisma__ExaminerClient<ExaminerGetPayload<T>>>

    /**
     * Create many Examiners.
     *     @param {ExaminerCreateManyArgs} args - Arguments to create many Examiners.
     *     @example
     *     // Create many Examiners
     *     const examiner = await prisma.examiner.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExaminerCreateManyArgs>(
      args?: SelectSubset<T, ExaminerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Examiner.
     * @param {ExaminerDeleteArgs} args - Arguments to delete one Examiner.
     * @example
     * // Delete one Examiner
     * const Examiner = await prisma.examiner.delete({
     *   where: {
     *     // ... filter to delete one Examiner
     *   }
     * })
     * 
    **/
    delete<T extends ExaminerDeleteArgs>(
      args: SelectSubset<T, ExaminerDeleteArgs>
    ): CheckSelect<T, Prisma__ExaminerClient<Examiner>, Prisma__ExaminerClient<ExaminerGetPayload<T>>>

    /**
     * Update one Examiner.
     * @param {ExaminerUpdateArgs} args - Arguments to update one Examiner.
     * @example
     * // Update one Examiner
     * const examiner = await prisma.examiner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExaminerUpdateArgs>(
      args: SelectSubset<T, ExaminerUpdateArgs>
    ): CheckSelect<T, Prisma__ExaminerClient<Examiner>, Prisma__ExaminerClient<ExaminerGetPayload<T>>>

    /**
     * Delete zero or more Examiners.
     * @param {ExaminerDeleteManyArgs} args - Arguments to filter Examiners to delete.
     * @example
     * // Delete a few Examiners
     * const { count } = await prisma.examiner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExaminerDeleteManyArgs>(
      args?: SelectSubset<T, ExaminerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Examiners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Examiners
     * const examiner = await prisma.examiner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExaminerUpdateManyArgs>(
      args: SelectSubset<T, ExaminerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Examiner.
     * @param {ExaminerUpsertArgs} args - Arguments to update or create a Examiner.
     * @example
     * // Update or create a Examiner
     * const examiner = await prisma.examiner.upsert({
     *   create: {
     *     // ... data to create a Examiner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Examiner we want to update
     *   }
     * })
    **/
    upsert<T extends ExaminerUpsertArgs>(
      args: SelectSubset<T, ExaminerUpsertArgs>
    ): CheckSelect<T, Prisma__ExaminerClient<Examiner>, Prisma__ExaminerClient<ExaminerGetPayload<T>>>

    /**
     * Count the number of Examiners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminerCountArgs} args - Arguments to filter Examiners to count.
     * @example
     * // Count the number of Examiners
     * const count = await prisma.examiner.count({
     *   where: {
     *     // ... the filter for the Examiners we want to count
     *   }
     * })
    **/
    count<T extends ExaminerCountArgs>(
      args?: Subset<T, ExaminerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExaminerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Examiner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExaminerAggregateArgs>(args: Subset<T, ExaminerAggregateArgs>): PrismaPromise<GetExaminerAggregateType<T>>

    /**
     * Group by Examiner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExaminerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExaminerGroupByArgs['orderBy'] }
        : { orderBy?: ExaminerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExaminerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExaminerGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Examiner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ExaminerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    CourseInstance<T extends CourseInstanceFindManyArgs = {}>(args?: Subset<T, CourseInstanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<CourseInstance>>, PrismaPromise<Array<CourseInstanceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Examiner findUnique
   */
  export type ExaminerFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * Throw an Error if a Examiner can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Examiner to fetch.
     * 
    **/
    where: ExaminerWhereUniqueInput
  }


  /**
   * Examiner findFirst
   */
  export type ExaminerFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * Throw an Error if a Examiner can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Examiner to fetch.
     * 
    **/
    where?: ExaminerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examiners to fetch.
     * 
    **/
    orderBy?: Enumerable<ExaminerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Examiners.
     * 
    **/
    cursor?: ExaminerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examiners from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examiners.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Examiners.
     * 
    **/
    distinct?: Enumerable<ExaminerScalarFieldEnum>
  }


  /**
   * Examiner findMany
   */
  export type ExaminerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * Filter, which Examiners to fetch.
     * 
    **/
    where?: ExaminerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examiners to fetch.
     * 
    **/
    orderBy?: Enumerable<ExaminerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Examiners.
     * 
    **/
    cursor?: ExaminerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examiners from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examiners.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExaminerScalarFieldEnum>
  }


  /**
   * Examiner create
   */
  export type ExaminerCreateArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * The data needed to create a Examiner.
     * 
    **/
    data: XOR<ExaminerCreateInput, ExaminerUncheckedCreateInput>
  }


  /**
   * Examiner createMany
   */
  export type ExaminerCreateManyArgs = {
    data: Enumerable<ExaminerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Examiner update
   */
  export type ExaminerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * The data needed to update a Examiner.
     * 
    **/
    data: XOR<ExaminerUpdateInput, ExaminerUncheckedUpdateInput>
    /**
     * Choose, which Examiner to update.
     * 
    **/
    where: ExaminerWhereUniqueInput
  }


  /**
   * Examiner updateMany
   */
  export type ExaminerUpdateManyArgs = {
    data: XOR<ExaminerUpdateManyMutationInput, ExaminerUncheckedUpdateManyInput>
    where?: ExaminerWhereInput
  }


  /**
   * Examiner upsert
   */
  export type ExaminerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * The filter to search for the Examiner to update in case it exists.
     * 
    **/
    where: ExaminerWhereUniqueInput
    /**
     * In case the Examiner found by the `where` argument doesn't exist, create a new Examiner with this data.
     * 
    **/
    create: XOR<ExaminerCreateInput, ExaminerUncheckedCreateInput>
    /**
     * In case the Examiner was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExaminerUpdateInput, ExaminerUncheckedUpdateInput>
  }


  /**
   * Examiner delete
   */
  export type ExaminerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
    /**
     * Filter which Examiner to delete.
     * 
    **/
    where: ExaminerWhereUniqueInput
  }


  /**
   * Examiner deleteMany
   */
  export type ExaminerDeleteManyArgs = {
    where?: ExaminerWhereInput
  }


  /**
   * Examiner without action
   */
  export type ExaminerArgs = {
    /**
     * Select specific fields to fetch from the Examiner
     * 
    **/
    select?: ExaminerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExaminerInclude | null
  }



  /**
   * Model Exam
   */


  export type AggregateExam = {
    _count: ExamCountAggregateOutputType | null
    _avg: ExamAvgAggregateOutputType | null
    _sum: ExamSumAggregateOutputType | null
    _min: ExamMinAggregateOutputType | null
    _max: ExamMaxAggregateOutputType | null
  }

  export type ExamAvgAggregateOutputType = {
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
    thesis_id: number | null
    solution_id: number | null
  }

  export type ExamSumAggregateOutputType = {
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
    thesis_id: number | null
    solution_id: number | null
  }

  export type ExamMinAggregateOutputType = {
    course_code: string | null
    date: string | null
    academic_year: string | null
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
    thesis_id: number | null
    solution_id: number | null
  }

  export type ExamMaxAggregateOutputType = {
    course_code: string | null
    date: string | null
    academic_year: string | null
    failed: number | null
    three: number | null
    four: number | null
    five: number | null
    thesis_id: number | null
    solution_id: number | null
  }

  export type ExamCountAggregateOutputType = {
    course_code: number
    date: number
    academic_year: number
    failed: number
    three: number
    four: number
    five: number
    thesis_id: number
    solution_id: number
    _all: number
  }


  export type ExamAvgAggregateInputType = {
    failed?: true
    three?: true
    four?: true
    five?: true
    thesis_id?: true
    solution_id?: true
  }

  export type ExamSumAggregateInputType = {
    failed?: true
    three?: true
    four?: true
    five?: true
    thesis_id?: true
    solution_id?: true
  }

  export type ExamMinAggregateInputType = {
    course_code?: true
    date?: true
    academic_year?: true
    failed?: true
    three?: true
    four?: true
    five?: true
    thesis_id?: true
    solution_id?: true
  }

  export type ExamMaxAggregateInputType = {
    course_code?: true
    date?: true
    academic_year?: true
    failed?: true
    three?: true
    four?: true
    five?: true
    thesis_id?: true
    solution_id?: true
  }

  export type ExamCountAggregateInputType = {
    course_code?: true
    date?: true
    academic_year?: true
    failed?: true
    three?: true
    four?: true
    five?: true
    thesis_id?: true
    solution_id?: true
    _all?: true
  }

  export type ExamAggregateArgs = {
    /**
     * Filter which Exam to aggregate.
     * 
    **/
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exams
    **/
    _count?: true | ExamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamMaxAggregateInputType
  }

  export type GetExamAggregateType<T extends ExamAggregateArgs> = {
        [P in keyof T & keyof AggregateExam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExam[P]>
      : GetScalarType<T[P], AggregateExam[P]>
  }




  export type ExamGroupByArgs = {
    where?: ExamWhereInput
    orderBy?: Enumerable<ExamOrderByWithAggregationInput>
    by: Array<ExamScalarFieldEnum>
    having?: ExamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamCountAggregateInputType | true
    _avg?: ExamAvgAggregateInputType
    _sum?: ExamSumAggregateInputType
    _min?: ExamMinAggregateInputType
    _max?: ExamMaxAggregateInputType
  }


  export type ExamGroupByOutputType = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id: number | null
    solution_id: number | null
    _count: ExamCountAggregateOutputType | null
    _avg: ExamAvgAggregateOutputType | null
    _sum: ExamSumAggregateOutputType | null
    _min: ExamMinAggregateOutputType | null
    _max: ExamMaxAggregateOutputType | null
  }

  type GetExamGroupByPayload<T extends ExamGroupByArgs> = Promise<
    Array<
      PickArray<ExamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamGroupByOutputType[P]>
            : GetScalarType<T[P], ExamGroupByOutputType[P]>
        }
      >
    >


  export type ExamSelect = {
    course_code?: boolean
    date?: boolean
    academic_year?: boolean
    failed?: boolean
    three?: boolean
    four?: boolean
    five?: boolean
    thesis_id?: boolean
    thesis?: boolean | ExamThesisArgs
    solution_id?: boolean
    solution?: boolean | ExamSolutionArgs
    attachments?: boolean | ExamAttachmentFindManyArgs
    course?: boolean | CourseArgs
    _count?: boolean | ExamCountOutputTypeArgs
  }

  export type ExamInclude = {
    thesis?: boolean | ExamThesisArgs
    solution?: boolean | ExamSolutionArgs
    attachments?: boolean | ExamAttachmentFindManyArgs
    course?: boolean | CourseArgs
    _count?: boolean | ExamCountOutputTypeArgs
  }

  export type ExamGetPayload<
    S extends boolean | null | undefined | ExamArgs,
    U = keyof S
      > = S extends true
        ? Exam
    : S extends undefined
    ? never
    : S extends ExamArgs | ExamFindManyArgs
    ?'include' extends U
    ? Exam  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'thesis'
        ? ExamThesisGetPayload<S['include'][P]> | null :
        P extends 'solution'
        ? ExamSolutionGetPayload<S['include'][P]> | null :
        P extends 'attachments'
        ? Array < ExamAttachmentGetPayload<S['include'][P]>>  :
        P extends 'course'
        ? CourseGetPayload<S['include'][P]> :
        P extends '_count'
        ? ExamCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Exam ?Exam [P]
  : 
          P extends 'thesis'
        ? ExamThesisGetPayload<S['select'][P]> | null :
        P extends 'solution'
        ? ExamSolutionGetPayload<S['select'][P]> | null :
        P extends 'attachments'
        ? Array < ExamAttachmentGetPayload<S['select'][P]>>  :
        P extends 'course'
        ? CourseGetPayload<S['select'][P]> :
        P extends '_count'
        ? ExamCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Exam
  : Exam


  type ExamCountArgs = Merge<
    Omit<ExamFindManyArgs, 'select' | 'include'> & {
      select?: ExamCountAggregateInputType | true
    }
  >

  export interface ExamDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Exam that matches the filter.
     * @param {ExamFindUniqueArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExamFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExamFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Exam'> extends True ? CheckSelect<T, Prisma__ExamClient<Exam>, Prisma__ExamClient<ExamGetPayload<T>>> : CheckSelect<T, Prisma__ExamClient<Exam | null >, Prisma__ExamClient<ExamGetPayload<T> | null >>

    /**
     * Find the first Exam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindFirstArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExamFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExamFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Exam'> extends True ? CheckSelect<T, Prisma__ExamClient<Exam>, Prisma__ExamClient<ExamGetPayload<T>>> : CheckSelect<T, Prisma__ExamClient<Exam | null >, Prisma__ExamClient<ExamGetPayload<T> | null >>

    /**
     * Find zero or more Exams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exams
     * const exams = await prisma.exam.findMany()
     * 
     * // Get first 10 Exams
     * const exams = await prisma.exam.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const examWithCourse_codeOnly = await prisma.exam.findMany({ select: { course_code: true } })
     * 
    **/
    findMany<T extends ExamFindManyArgs>(
      args?: SelectSubset<T, ExamFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Exam>>, PrismaPromise<Array<ExamGetPayload<T>>>>

    /**
     * Create a Exam.
     * @param {ExamCreateArgs} args - Arguments to create a Exam.
     * @example
     * // Create one Exam
     * const Exam = await prisma.exam.create({
     *   data: {
     *     // ... data to create a Exam
     *   }
     * })
     * 
    **/
    create<T extends ExamCreateArgs>(
      args: SelectSubset<T, ExamCreateArgs>
    ): CheckSelect<T, Prisma__ExamClient<Exam>, Prisma__ExamClient<ExamGetPayload<T>>>

    /**
     * Create many Exams.
     *     @param {ExamCreateManyArgs} args - Arguments to create many Exams.
     *     @example
     *     // Create many Exams
     *     const exam = await prisma.exam.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExamCreateManyArgs>(
      args?: SelectSubset<T, ExamCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Exam.
     * @param {ExamDeleteArgs} args - Arguments to delete one Exam.
     * @example
     * // Delete one Exam
     * const Exam = await prisma.exam.delete({
     *   where: {
     *     // ... filter to delete one Exam
     *   }
     * })
     * 
    **/
    delete<T extends ExamDeleteArgs>(
      args: SelectSubset<T, ExamDeleteArgs>
    ): CheckSelect<T, Prisma__ExamClient<Exam>, Prisma__ExamClient<ExamGetPayload<T>>>

    /**
     * Update one Exam.
     * @param {ExamUpdateArgs} args - Arguments to update one Exam.
     * @example
     * // Update one Exam
     * const exam = await prisma.exam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExamUpdateArgs>(
      args: SelectSubset<T, ExamUpdateArgs>
    ): CheckSelect<T, Prisma__ExamClient<Exam>, Prisma__ExamClient<ExamGetPayload<T>>>

    /**
     * Delete zero or more Exams.
     * @param {ExamDeleteManyArgs} args - Arguments to filter Exams to delete.
     * @example
     * // Delete a few Exams
     * const { count } = await prisma.exam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExamDeleteManyArgs>(
      args?: SelectSubset<T, ExamDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exams
     * const exam = await prisma.exam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExamUpdateManyArgs>(
      args: SelectSubset<T, ExamUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Exam.
     * @param {ExamUpsertArgs} args - Arguments to update or create a Exam.
     * @example
     * // Update or create a Exam
     * const exam = await prisma.exam.upsert({
     *   create: {
     *     // ... data to create a Exam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exam we want to update
     *   }
     * })
    **/
    upsert<T extends ExamUpsertArgs>(
      args: SelectSubset<T, ExamUpsertArgs>
    ): CheckSelect<T, Prisma__ExamClient<Exam>, Prisma__ExamClient<ExamGetPayload<T>>>

    /**
     * Count the number of Exams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamCountArgs} args - Arguments to filter Exams to count.
     * @example
     * // Count the number of Exams
     * const count = await prisma.exam.count({
     *   where: {
     *     // ... the filter for the Exams we want to count
     *   }
     * })
    **/
    count<T extends ExamCountArgs>(
      args?: Subset<T, ExamCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamAggregateArgs>(args: Subset<T, ExamAggregateArgs>): PrismaPromise<GetExamAggregateType<T>>

    /**
     * Group by Exam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamGroupByArgs['orderBy'] }
        : { orderBy?: ExamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ExamClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    thesis<T extends ExamThesisArgs = {}>(args?: Subset<T, ExamThesisArgs>): CheckSelect<T, Prisma__ExamThesisClient<ExamThesis | null >, Prisma__ExamThesisClient<ExamThesisGetPayload<T> | null >>;

    solution<T extends ExamSolutionArgs = {}>(args?: Subset<T, ExamSolutionArgs>): CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution | null >, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T> | null >>;

    attachments<T extends ExamAttachmentFindManyArgs = {}>(args?: Subset<T, ExamAttachmentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ExamAttachment>>, PrismaPromise<Array<ExamAttachmentGetPayload<T>>>>;

    course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Exam findUnique
   */
  export type ExamFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * Throw an Error if a Exam can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Exam to fetch.
     * 
    **/
    where: ExamWhereUniqueInput
  }


  /**
   * Exam findFirst
   */
  export type ExamFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * Throw an Error if a Exam can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Exam to fetch.
     * 
    **/
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exams.
     * 
    **/
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exams.
     * 
    **/
    distinct?: Enumerable<ExamScalarFieldEnum>
  }


  /**
   * Exam findMany
   */
  export type ExamFindManyArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * Filter, which Exams to fetch.
     * 
    **/
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exams.
     * 
    **/
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExamScalarFieldEnum>
  }


  /**
   * Exam create
   */
  export type ExamCreateArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * The data needed to create a Exam.
     * 
    **/
    data: XOR<ExamCreateInput, ExamUncheckedCreateInput>
  }


  /**
   * Exam createMany
   */
  export type ExamCreateManyArgs = {
    data: Enumerable<ExamCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Exam update
   */
  export type ExamUpdateArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * The data needed to update a Exam.
     * 
    **/
    data: XOR<ExamUpdateInput, ExamUncheckedUpdateInput>
    /**
     * Choose, which Exam to update.
     * 
    **/
    where: ExamWhereUniqueInput
  }


  /**
   * Exam updateMany
   */
  export type ExamUpdateManyArgs = {
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyInput>
    where?: ExamWhereInput
  }


  /**
   * Exam upsert
   */
  export type ExamUpsertArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * The filter to search for the Exam to update in case it exists.
     * 
    **/
    where: ExamWhereUniqueInput
    /**
     * In case the Exam found by the `where` argument doesn't exist, create a new Exam with this data.
     * 
    **/
    create: XOR<ExamCreateInput, ExamUncheckedCreateInput>
    /**
     * In case the Exam was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExamUpdateInput, ExamUncheckedUpdateInput>
  }


  /**
   * Exam delete
   */
  export type ExamDeleteArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
    /**
     * Filter which Exam to delete.
     * 
    **/
    where: ExamWhereUniqueInput
  }


  /**
   * Exam deleteMany
   */
  export type ExamDeleteManyArgs = {
    where?: ExamWhereInput
  }


  /**
   * Exam without action
   */
  export type ExamArgs = {
    /**
     * Select specific fields to fetch from the Exam
     * 
    **/
    select?: ExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamInclude | null
  }



  /**
   * Model ExamThesis
   */


  export type AggregateExamThesis = {
    _count: ExamThesisCountAggregateOutputType | null
    _avg: ExamThesisAvgAggregateOutputType | null
    _sum: ExamThesisSumAggregateOutputType | null
    _min: ExamThesisMinAggregateOutputType | null
    _max: ExamThesisMaxAggregateOutputType | null
  }

  export type ExamThesisAvgAggregateOutputType = {
    id: number | null
  }

  export type ExamThesisSumAggregateOutputType = {
    id: number | null
  }

  export type ExamThesisMinAggregateOutputType = {
    id: number | null
    filetype: string | null
    verified: boolean | null
    includes_solution: boolean | null
    uploader_id: string | null
    uploader: string | null
    uploaded: Date | null
  }

  export type ExamThesisMaxAggregateOutputType = {
    id: number | null
    filetype: string | null
    verified: boolean | null
    includes_solution: boolean | null
    uploader_id: string | null
    uploader: string | null
    uploaded: Date | null
  }

  export type ExamThesisCountAggregateOutputType = {
    id: number
    filetype: number
    verified: number
    includes_solution: number
    uploader_id: number
    uploader: number
    uploaded: number
    _all: number
  }


  export type ExamThesisAvgAggregateInputType = {
    id?: true
  }

  export type ExamThesisSumAggregateInputType = {
    id?: true
  }

  export type ExamThesisMinAggregateInputType = {
    id?: true
    filetype?: true
    verified?: true
    includes_solution?: true
    uploader_id?: true
    uploader?: true
    uploaded?: true
  }

  export type ExamThesisMaxAggregateInputType = {
    id?: true
    filetype?: true
    verified?: true
    includes_solution?: true
    uploader_id?: true
    uploader?: true
    uploaded?: true
  }

  export type ExamThesisCountAggregateInputType = {
    id?: true
    filetype?: true
    verified?: true
    includes_solution?: true
    uploader_id?: true
    uploader?: true
    uploaded?: true
    _all?: true
  }

  export type ExamThesisAggregateArgs = {
    /**
     * Filter which ExamThesis to aggregate.
     * 
    **/
    where?: ExamThesisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamTheses to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamThesisOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExamThesisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamTheses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamTheses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamTheses
    **/
    _count?: true | ExamThesisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamThesisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamThesisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamThesisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamThesisMaxAggregateInputType
  }

  export type GetExamThesisAggregateType<T extends ExamThesisAggregateArgs> = {
        [P in keyof T & keyof AggregateExamThesis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamThesis[P]>
      : GetScalarType<T[P], AggregateExamThesis[P]>
  }




  export type ExamThesisGroupByArgs = {
    where?: ExamThesisWhereInput
    orderBy?: Enumerable<ExamThesisOrderByWithAggregationInput>
    by: Array<ExamThesisScalarFieldEnum>
    having?: ExamThesisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamThesisCountAggregateInputType | true
    _avg?: ExamThesisAvgAggregateInputType
    _sum?: ExamThesisSumAggregateInputType
    _min?: ExamThesisMinAggregateInputType
    _max?: ExamThesisMaxAggregateInputType
  }


  export type ExamThesisGroupByOutputType = {
    id: number
    filetype: string
    verified: boolean
    includes_solution: boolean
    uploader_id: string | null
    uploader: string | null
    uploaded: Date
    _count: ExamThesisCountAggregateOutputType | null
    _avg: ExamThesisAvgAggregateOutputType | null
    _sum: ExamThesisSumAggregateOutputType | null
    _min: ExamThesisMinAggregateOutputType | null
    _max: ExamThesisMaxAggregateOutputType | null
  }

  type GetExamThesisGroupByPayload<T extends ExamThesisGroupByArgs> = Promise<
    Array<
      PickArray<ExamThesisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamThesisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamThesisGroupByOutputType[P]>
            : GetScalarType<T[P], ExamThesisGroupByOutputType[P]>
        }
      >
    >


  export type ExamThesisSelect = {
    id?: boolean
    filetype?: boolean
    verified?: boolean
    includes_solution?: boolean
    exams?: boolean | ExamFindManyArgs
    uploader_id?: boolean
    uploader?: boolean
    uploaded?: boolean
    _count?: boolean | ExamThesisCountOutputTypeArgs
  }

  export type ExamThesisInclude = {
    exams?: boolean | ExamFindManyArgs
    _count?: boolean | ExamThesisCountOutputTypeArgs
  }

  export type ExamThesisGetPayload<
    S extends boolean | null | undefined | ExamThesisArgs,
    U = keyof S
      > = S extends true
        ? ExamThesis
    : S extends undefined
    ? never
    : S extends ExamThesisArgs | ExamThesisFindManyArgs
    ?'include' extends U
    ? ExamThesis  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'exams'
        ? Array < ExamGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? ExamThesisCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExamThesis ?ExamThesis [P]
  : 
          P extends 'exams'
        ? Array < ExamGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? ExamThesisCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : ExamThesis
  : ExamThesis


  type ExamThesisCountArgs = Merge<
    Omit<ExamThesisFindManyArgs, 'select' | 'include'> & {
      select?: ExamThesisCountAggregateInputType | true
    }
  >

  export interface ExamThesisDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ExamThesis that matches the filter.
     * @param {ExamThesisFindUniqueArgs} args - Arguments to find a ExamThesis
     * @example
     * // Get one ExamThesis
     * const examThesis = await prisma.examThesis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExamThesisFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExamThesisFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ExamThesis'> extends True ? CheckSelect<T, Prisma__ExamThesisClient<ExamThesis>, Prisma__ExamThesisClient<ExamThesisGetPayload<T>>> : CheckSelect<T, Prisma__ExamThesisClient<ExamThesis | null >, Prisma__ExamThesisClient<ExamThesisGetPayload<T> | null >>

    /**
     * Find the first ExamThesis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamThesisFindFirstArgs} args - Arguments to find a ExamThesis
     * @example
     * // Get one ExamThesis
     * const examThesis = await prisma.examThesis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExamThesisFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExamThesisFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ExamThesis'> extends True ? CheckSelect<T, Prisma__ExamThesisClient<ExamThesis>, Prisma__ExamThesisClient<ExamThesisGetPayload<T>>> : CheckSelect<T, Prisma__ExamThesisClient<ExamThesis | null >, Prisma__ExamThesisClient<ExamThesisGetPayload<T> | null >>

    /**
     * Find zero or more ExamTheses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamThesisFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamTheses
     * const examTheses = await prisma.examThesis.findMany()
     * 
     * // Get first 10 ExamTheses
     * const examTheses = await prisma.examThesis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examThesisWithIdOnly = await prisma.examThesis.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExamThesisFindManyArgs>(
      args?: SelectSubset<T, ExamThesisFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ExamThesis>>, PrismaPromise<Array<ExamThesisGetPayload<T>>>>

    /**
     * Create a ExamThesis.
     * @param {ExamThesisCreateArgs} args - Arguments to create a ExamThesis.
     * @example
     * // Create one ExamThesis
     * const ExamThesis = await prisma.examThesis.create({
     *   data: {
     *     // ... data to create a ExamThesis
     *   }
     * })
     * 
    **/
    create<T extends ExamThesisCreateArgs>(
      args: SelectSubset<T, ExamThesisCreateArgs>
    ): CheckSelect<T, Prisma__ExamThesisClient<ExamThesis>, Prisma__ExamThesisClient<ExamThesisGetPayload<T>>>

    /**
     * Create many ExamTheses.
     *     @param {ExamThesisCreateManyArgs} args - Arguments to create many ExamTheses.
     *     @example
     *     // Create many ExamTheses
     *     const examThesis = await prisma.examThesis.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExamThesisCreateManyArgs>(
      args?: SelectSubset<T, ExamThesisCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ExamThesis.
     * @param {ExamThesisDeleteArgs} args - Arguments to delete one ExamThesis.
     * @example
     * // Delete one ExamThesis
     * const ExamThesis = await prisma.examThesis.delete({
     *   where: {
     *     // ... filter to delete one ExamThesis
     *   }
     * })
     * 
    **/
    delete<T extends ExamThesisDeleteArgs>(
      args: SelectSubset<T, ExamThesisDeleteArgs>
    ): CheckSelect<T, Prisma__ExamThesisClient<ExamThesis>, Prisma__ExamThesisClient<ExamThesisGetPayload<T>>>

    /**
     * Update one ExamThesis.
     * @param {ExamThesisUpdateArgs} args - Arguments to update one ExamThesis.
     * @example
     * // Update one ExamThesis
     * const examThesis = await prisma.examThesis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExamThesisUpdateArgs>(
      args: SelectSubset<T, ExamThesisUpdateArgs>
    ): CheckSelect<T, Prisma__ExamThesisClient<ExamThesis>, Prisma__ExamThesisClient<ExamThesisGetPayload<T>>>

    /**
     * Delete zero or more ExamTheses.
     * @param {ExamThesisDeleteManyArgs} args - Arguments to filter ExamTheses to delete.
     * @example
     * // Delete a few ExamTheses
     * const { count } = await prisma.examThesis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExamThesisDeleteManyArgs>(
      args?: SelectSubset<T, ExamThesisDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamTheses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamThesisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamTheses
     * const examThesis = await prisma.examThesis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExamThesisUpdateManyArgs>(
      args: SelectSubset<T, ExamThesisUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ExamThesis.
     * @param {ExamThesisUpsertArgs} args - Arguments to update or create a ExamThesis.
     * @example
     * // Update or create a ExamThesis
     * const examThesis = await prisma.examThesis.upsert({
     *   create: {
     *     // ... data to create a ExamThesis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamThesis we want to update
     *   }
     * })
    **/
    upsert<T extends ExamThesisUpsertArgs>(
      args: SelectSubset<T, ExamThesisUpsertArgs>
    ): CheckSelect<T, Prisma__ExamThesisClient<ExamThesis>, Prisma__ExamThesisClient<ExamThesisGetPayload<T>>>

    /**
     * Count the number of ExamTheses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamThesisCountArgs} args - Arguments to filter ExamTheses to count.
     * @example
     * // Count the number of ExamTheses
     * const count = await prisma.examThesis.count({
     *   where: {
     *     // ... the filter for the ExamTheses we want to count
     *   }
     * })
    **/
    count<T extends ExamThesisCountArgs>(
      args?: Subset<T, ExamThesisCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamThesisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamThesis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamThesisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamThesisAggregateArgs>(args: Subset<T, ExamThesisAggregateArgs>): PrismaPromise<GetExamThesisAggregateType<T>>

    /**
     * Group by ExamThesis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamThesisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamThesisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamThesisGroupByArgs['orderBy'] }
        : { orderBy?: ExamThesisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamThesisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamThesisGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamThesis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ExamThesisClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    exams<T extends ExamFindManyArgs = {}>(args?: Subset<T, ExamFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Exam>>, PrismaPromise<Array<ExamGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ExamThesis findUnique
   */
  export type ExamThesisFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * Throw an Error if a ExamThesis can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ExamThesis to fetch.
     * 
    **/
    where: ExamThesisWhereUniqueInput
  }


  /**
   * ExamThesis findFirst
   */
  export type ExamThesisFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * Throw an Error if a ExamThesis can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ExamThesis to fetch.
     * 
    **/
    where?: ExamThesisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamTheses to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamThesisOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamTheses.
     * 
    **/
    cursor?: ExamThesisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamTheses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamTheses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamTheses.
     * 
    **/
    distinct?: Enumerable<ExamThesisScalarFieldEnum>
  }


  /**
   * ExamThesis findMany
   */
  export type ExamThesisFindManyArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * Filter, which ExamTheses to fetch.
     * 
    **/
    where?: ExamThesisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamTheses to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamThesisOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamTheses.
     * 
    **/
    cursor?: ExamThesisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamTheses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamTheses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExamThesisScalarFieldEnum>
  }


  /**
   * ExamThesis create
   */
  export type ExamThesisCreateArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * The data needed to create a ExamThesis.
     * 
    **/
    data: XOR<ExamThesisCreateInput, ExamThesisUncheckedCreateInput>
  }


  /**
   * ExamThesis createMany
   */
  export type ExamThesisCreateManyArgs = {
    data: Enumerable<ExamThesisCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ExamThesis update
   */
  export type ExamThesisUpdateArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * The data needed to update a ExamThesis.
     * 
    **/
    data: XOR<ExamThesisUpdateInput, ExamThesisUncheckedUpdateInput>
    /**
     * Choose, which ExamThesis to update.
     * 
    **/
    where: ExamThesisWhereUniqueInput
  }


  /**
   * ExamThesis updateMany
   */
  export type ExamThesisUpdateManyArgs = {
    data: XOR<ExamThesisUpdateManyMutationInput, ExamThesisUncheckedUpdateManyInput>
    where?: ExamThesisWhereInput
  }


  /**
   * ExamThesis upsert
   */
  export type ExamThesisUpsertArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * The filter to search for the ExamThesis to update in case it exists.
     * 
    **/
    where: ExamThesisWhereUniqueInput
    /**
     * In case the ExamThesis found by the `where` argument doesn't exist, create a new ExamThesis with this data.
     * 
    **/
    create: XOR<ExamThesisCreateInput, ExamThesisUncheckedCreateInput>
    /**
     * In case the ExamThesis was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExamThesisUpdateInput, ExamThesisUncheckedUpdateInput>
  }


  /**
   * ExamThesis delete
   */
  export type ExamThesisDeleteArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
    /**
     * Filter which ExamThesis to delete.
     * 
    **/
    where: ExamThesisWhereUniqueInput
  }


  /**
   * ExamThesis deleteMany
   */
  export type ExamThesisDeleteManyArgs = {
    where?: ExamThesisWhereInput
  }


  /**
   * ExamThesis without action
   */
  export type ExamThesisArgs = {
    /**
     * Select specific fields to fetch from the ExamThesis
     * 
    **/
    select?: ExamThesisSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamThesisInclude | null
  }



  /**
   * Model ExamSolution
   */


  export type AggregateExamSolution = {
    _count: ExamSolutionCountAggregateOutputType | null
    _avg: ExamSolutionAvgAggregateOutputType | null
    _sum: ExamSolutionSumAggregateOutputType | null
    _min: ExamSolutionMinAggregateOutputType | null
    _max: ExamSolutionMaxAggregateOutputType | null
  }

  export type ExamSolutionAvgAggregateOutputType = {
    id: number | null
  }

  export type ExamSolutionSumAggregateOutputType = {
    id: number | null
  }

  export type ExamSolutionMinAggregateOutputType = {
    id: number | null
    filetype: string | null
    verified: boolean | null
    uploader_id: string | null
    uploader: string | null
    uploaded: Date | null
  }

  export type ExamSolutionMaxAggregateOutputType = {
    id: number | null
    filetype: string | null
    verified: boolean | null
    uploader_id: string | null
    uploader: string | null
    uploaded: Date | null
  }

  export type ExamSolutionCountAggregateOutputType = {
    id: number
    filetype: number
    verified: number
    uploader_id: number
    uploader: number
    uploaded: number
    _all: number
  }


  export type ExamSolutionAvgAggregateInputType = {
    id?: true
  }

  export type ExamSolutionSumAggregateInputType = {
    id?: true
  }

  export type ExamSolutionMinAggregateInputType = {
    id?: true
    filetype?: true
    verified?: true
    uploader_id?: true
    uploader?: true
    uploaded?: true
  }

  export type ExamSolutionMaxAggregateInputType = {
    id?: true
    filetype?: true
    verified?: true
    uploader_id?: true
    uploader?: true
    uploaded?: true
  }

  export type ExamSolutionCountAggregateInputType = {
    id?: true
    filetype?: true
    verified?: true
    uploader_id?: true
    uploader?: true
    uploaded?: true
    _all?: true
  }

  export type ExamSolutionAggregateArgs = {
    /**
     * Filter which ExamSolution to aggregate.
     * 
    **/
    where?: ExamSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSolutions to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamSolutionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExamSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSolutions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSolutions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamSolutions
    **/
    _count?: true | ExamSolutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamSolutionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamSolutionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamSolutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamSolutionMaxAggregateInputType
  }

  export type GetExamSolutionAggregateType<T extends ExamSolutionAggregateArgs> = {
        [P in keyof T & keyof AggregateExamSolution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamSolution[P]>
      : GetScalarType<T[P], AggregateExamSolution[P]>
  }




  export type ExamSolutionGroupByArgs = {
    where?: ExamSolutionWhereInput
    orderBy?: Enumerable<ExamSolutionOrderByWithAggregationInput>
    by: Array<ExamSolutionScalarFieldEnum>
    having?: ExamSolutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamSolutionCountAggregateInputType | true
    _avg?: ExamSolutionAvgAggregateInputType
    _sum?: ExamSolutionSumAggregateInputType
    _min?: ExamSolutionMinAggregateInputType
    _max?: ExamSolutionMaxAggregateInputType
  }


  export type ExamSolutionGroupByOutputType = {
    id: number
    filetype: string
    verified: boolean
    uploader_id: string | null
    uploader: string | null
    uploaded: Date
    _count: ExamSolutionCountAggregateOutputType | null
    _avg: ExamSolutionAvgAggregateOutputType | null
    _sum: ExamSolutionSumAggregateOutputType | null
    _min: ExamSolutionMinAggregateOutputType | null
    _max: ExamSolutionMaxAggregateOutputType | null
  }

  type GetExamSolutionGroupByPayload<T extends ExamSolutionGroupByArgs> = Promise<
    Array<
      PickArray<ExamSolutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamSolutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamSolutionGroupByOutputType[P]>
            : GetScalarType<T[P], ExamSolutionGroupByOutputType[P]>
        }
      >
    >


  export type ExamSolutionSelect = {
    id?: boolean
    filetype?: boolean
    verified?: boolean
    exams?: boolean | ExamFindManyArgs
    uploader_id?: boolean
    uploader?: boolean
    uploaded?: boolean
    _count?: boolean | ExamSolutionCountOutputTypeArgs
  }

  export type ExamSolutionInclude = {
    exams?: boolean | ExamFindManyArgs
    _count?: boolean | ExamSolutionCountOutputTypeArgs
  }

  export type ExamSolutionGetPayload<
    S extends boolean | null | undefined | ExamSolutionArgs,
    U = keyof S
      > = S extends true
        ? ExamSolution
    : S extends undefined
    ? never
    : S extends ExamSolutionArgs | ExamSolutionFindManyArgs
    ?'include' extends U
    ? ExamSolution  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'exams'
        ? Array < ExamGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? ExamSolutionCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExamSolution ?ExamSolution [P]
  : 
          P extends 'exams'
        ? Array < ExamGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? ExamSolutionCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : ExamSolution
  : ExamSolution


  type ExamSolutionCountArgs = Merge<
    Omit<ExamSolutionFindManyArgs, 'select' | 'include'> & {
      select?: ExamSolutionCountAggregateInputType | true
    }
  >

  export interface ExamSolutionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ExamSolution that matches the filter.
     * @param {ExamSolutionFindUniqueArgs} args - Arguments to find a ExamSolution
     * @example
     * // Get one ExamSolution
     * const examSolution = await prisma.examSolution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExamSolutionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExamSolutionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ExamSolution'> extends True ? CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution>, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T>>> : CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution | null >, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T> | null >>

    /**
     * Find the first ExamSolution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamSolutionFindFirstArgs} args - Arguments to find a ExamSolution
     * @example
     * // Get one ExamSolution
     * const examSolution = await prisma.examSolution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExamSolutionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExamSolutionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ExamSolution'> extends True ? CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution>, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T>>> : CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution | null >, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T> | null >>

    /**
     * Find zero or more ExamSolutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamSolutionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamSolutions
     * const examSolutions = await prisma.examSolution.findMany()
     * 
     * // Get first 10 ExamSolutions
     * const examSolutions = await prisma.examSolution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examSolutionWithIdOnly = await prisma.examSolution.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExamSolutionFindManyArgs>(
      args?: SelectSubset<T, ExamSolutionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ExamSolution>>, PrismaPromise<Array<ExamSolutionGetPayload<T>>>>

    /**
     * Create a ExamSolution.
     * @param {ExamSolutionCreateArgs} args - Arguments to create a ExamSolution.
     * @example
     * // Create one ExamSolution
     * const ExamSolution = await prisma.examSolution.create({
     *   data: {
     *     // ... data to create a ExamSolution
     *   }
     * })
     * 
    **/
    create<T extends ExamSolutionCreateArgs>(
      args: SelectSubset<T, ExamSolutionCreateArgs>
    ): CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution>, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T>>>

    /**
     * Create many ExamSolutions.
     *     @param {ExamSolutionCreateManyArgs} args - Arguments to create many ExamSolutions.
     *     @example
     *     // Create many ExamSolutions
     *     const examSolution = await prisma.examSolution.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExamSolutionCreateManyArgs>(
      args?: SelectSubset<T, ExamSolutionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ExamSolution.
     * @param {ExamSolutionDeleteArgs} args - Arguments to delete one ExamSolution.
     * @example
     * // Delete one ExamSolution
     * const ExamSolution = await prisma.examSolution.delete({
     *   where: {
     *     // ... filter to delete one ExamSolution
     *   }
     * })
     * 
    **/
    delete<T extends ExamSolutionDeleteArgs>(
      args: SelectSubset<T, ExamSolutionDeleteArgs>
    ): CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution>, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T>>>

    /**
     * Update one ExamSolution.
     * @param {ExamSolutionUpdateArgs} args - Arguments to update one ExamSolution.
     * @example
     * // Update one ExamSolution
     * const examSolution = await prisma.examSolution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExamSolutionUpdateArgs>(
      args: SelectSubset<T, ExamSolutionUpdateArgs>
    ): CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution>, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T>>>

    /**
     * Delete zero or more ExamSolutions.
     * @param {ExamSolutionDeleteManyArgs} args - Arguments to filter ExamSolutions to delete.
     * @example
     * // Delete a few ExamSolutions
     * const { count } = await prisma.examSolution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExamSolutionDeleteManyArgs>(
      args?: SelectSubset<T, ExamSolutionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamSolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamSolutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamSolutions
     * const examSolution = await prisma.examSolution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExamSolutionUpdateManyArgs>(
      args: SelectSubset<T, ExamSolutionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ExamSolution.
     * @param {ExamSolutionUpsertArgs} args - Arguments to update or create a ExamSolution.
     * @example
     * // Update or create a ExamSolution
     * const examSolution = await prisma.examSolution.upsert({
     *   create: {
     *     // ... data to create a ExamSolution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamSolution we want to update
     *   }
     * })
    **/
    upsert<T extends ExamSolutionUpsertArgs>(
      args: SelectSubset<T, ExamSolutionUpsertArgs>
    ): CheckSelect<T, Prisma__ExamSolutionClient<ExamSolution>, Prisma__ExamSolutionClient<ExamSolutionGetPayload<T>>>

    /**
     * Count the number of ExamSolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamSolutionCountArgs} args - Arguments to filter ExamSolutions to count.
     * @example
     * // Count the number of ExamSolutions
     * const count = await prisma.examSolution.count({
     *   where: {
     *     // ... the filter for the ExamSolutions we want to count
     *   }
     * })
    **/
    count<T extends ExamSolutionCountArgs>(
      args?: Subset<T, ExamSolutionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamSolutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamSolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamSolutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamSolutionAggregateArgs>(args: Subset<T, ExamSolutionAggregateArgs>): PrismaPromise<GetExamSolutionAggregateType<T>>

    /**
     * Group by ExamSolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamSolutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamSolutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamSolutionGroupByArgs['orderBy'] }
        : { orderBy?: ExamSolutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamSolutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamSolutionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamSolution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ExamSolutionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    exams<T extends ExamFindManyArgs = {}>(args?: Subset<T, ExamFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Exam>>, PrismaPromise<Array<ExamGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ExamSolution findUnique
   */
  export type ExamSolutionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * Throw an Error if a ExamSolution can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ExamSolution to fetch.
     * 
    **/
    where: ExamSolutionWhereUniqueInput
  }


  /**
   * ExamSolution findFirst
   */
  export type ExamSolutionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * Throw an Error if a ExamSolution can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ExamSolution to fetch.
     * 
    **/
    where?: ExamSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSolutions to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamSolutionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamSolutions.
     * 
    **/
    cursor?: ExamSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSolutions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSolutions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamSolutions.
     * 
    **/
    distinct?: Enumerable<ExamSolutionScalarFieldEnum>
  }


  /**
   * ExamSolution findMany
   */
  export type ExamSolutionFindManyArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * Filter, which ExamSolutions to fetch.
     * 
    **/
    where?: ExamSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSolutions to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamSolutionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamSolutions.
     * 
    **/
    cursor?: ExamSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSolutions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSolutions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExamSolutionScalarFieldEnum>
  }


  /**
   * ExamSolution create
   */
  export type ExamSolutionCreateArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * The data needed to create a ExamSolution.
     * 
    **/
    data: XOR<ExamSolutionCreateInput, ExamSolutionUncheckedCreateInput>
  }


  /**
   * ExamSolution createMany
   */
  export type ExamSolutionCreateManyArgs = {
    data: Enumerable<ExamSolutionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ExamSolution update
   */
  export type ExamSolutionUpdateArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * The data needed to update a ExamSolution.
     * 
    **/
    data: XOR<ExamSolutionUpdateInput, ExamSolutionUncheckedUpdateInput>
    /**
     * Choose, which ExamSolution to update.
     * 
    **/
    where: ExamSolutionWhereUniqueInput
  }


  /**
   * ExamSolution updateMany
   */
  export type ExamSolutionUpdateManyArgs = {
    data: XOR<ExamSolutionUpdateManyMutationInput, ExamSolutionUncheckedUpdateManyInput>
    where?: ExamSolutionWhereInput
  }


  /**
   * ExamSolution upsert
   */
  export type ExamSolutionUpsertArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * The filter to search for the ExamSolution to update in case it exists.
     * 
    **/
    where: ExamSolutionWhereUniqueInput
    /**
     * In case the ExamSolution found by the `where` argument doesn't exist, create a new ExamSolution with this data.
     * 
    **/
    create: XOR<ExamSolutionCreateInput, ExamSolutionUncheckedCreateInput>
    /**
     * In case the ExamSolution was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExamSolutionUpdateInput, ExamSolutionUncheckedUpdateInput>
  }


  /**
   * ExamSolution delete
   */
  export type ExamSolutionDeleteArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
    /**
     * Filter which ExamSolution to delete.
     * 
    **/
    where: ExamSolutionWhereUniqueInput
  }


  /**
   * ExamSolution deleteMany
   */
  export type ExamSolutionDeleteManyArgs = {
    where?: ExamSolutionWhereInput
  }


  /**
   * ExamSolution without action
   */
  export type ExamSolutionArgs = {
    /**
     * Select specific fields to fetch from the ExamSolution
     * 
    **/
    select?: ExamSolutionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamSolutionInclude | null
  }



  /**
   * Model ExamAttachment
   */


  export type AggregateExamAttachment = {
    _count: ExamAttachmentCountAggregateOutputType | null
    _avg: ExamAttachmentAvgAggregateOutputType | null
    _sum: ExamAttachmentSumAggregateOutputType | null
    _min: ExamAttachmentMinAggregateOutputType | null
    _max: ExamAttachmentMaxAggregateOutputType | null
  }

  export type ExamAttachmentAvgAggregateOutputType = {
    id: number | null
  }

  export type ExamAttachmentSumAggregateOutputType = {
    id: number | null
  }

  export type ExamAttachmentMinAggregateOutputType = {
    id: number | null
    name: string | null
    filetype: string | null
    verified: boolean | null
    uploader: string | null
    uploaded: Date | null
    exam_course_code: string | null
    exam_date: string | null
  }

  export type ExamAttachmentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    filetype: string | null
    verified: boolean | null
    uploader: string | null
    uploaded: Date | null
    exam_course_code: string | null
    exam_date: string | null
  }

  export type ExamAttachmentCountAggregateOutputType = {
    id: number
    name: number
    filetype: number
    verified: number
    uploader: number
    uploaded: number
    exam_course_code: number
    exam_date: number
    _all: number
  }


  export type ExamAttachmentAvgAggregateInputType = {
    id?: true
  }

  export type ExamAttachmentSumAggregateInputType = {
    id?: true
  }

  export type ExamAttachmentMinAggregateInputType = {
    id?: true
    name?: true
    filetype?: true
    verified?: true
    uploader?: true
    uploaded?: true
    exam_course_code?: true
    exam_date?: true
  }

  export type ExamAttachmentMaxAggregateInputType = {
    id?: true
    name?: true
    filetype?: true
    verified?: true
    uploader?: true
    uploaded?: true
    exam_course_code?: true
    exam_date?: true
  }

  export type ExamAttachmentCountAggregateInputType = {
    id?: true
    name?: true
    filetype?: true
    verified?: true
    uploader?: true
    uploaded?: true
    exam_course_code?: true
    exam_date?: true
    _all?: true
  }

  export type ExamAttachmentAggregateArgs = {
    /**
     * Filter which ExamAttachment to aggregate.
     * 
    **/
    where?: ExamAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttachments to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamAttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExamAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttachments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttachments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamAttachments
    **/
    _count?: true | ExamAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamAttachmentMaxAggregateInputType
  }

  export type GetExamAttachmentAggregateType<T extends ExamAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateExamAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamAttachment[P]>
      : GetScalarType<T[P], AggregateExamAttachment[P]>
  }




  export type ExamAttachmentGroupByArgs = {
    where?: ExamAttachmentWhereInput
    orderBy?: Enumerable<ExamAttachmentOrderByWithAggregationInput>
    by: Array<ExamAttachmentScalarFieldEnum>
    having?: ExamAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamAttachmentCountAggregateInputType | true
    _avg?: ExamAttachmentAvgAggregateInputType
    _sum?: ExamAttachmentSumAggregateInputType
    _min?: ExamAttachmentMinAggregateInputType
    _max?: ExamAttachmentMaxAggregateInputType
  }


  export type ExamAttachmentGroupByOutputType = {
    id: number
    name: string
    filetype: string
    verified: boolean
    uploader: string | null
    uploaded: Date
    exam_course_code: string
    exam_date: string
    _count: ExamAttachmentCountAggregateOutputType | null
    _avg: ExamAttachmentAvgAggregateOutputType | null
    _sum: ExamAttachmentSumAggregateOutputType | null
    _min: ExamAttachmentMinAggregateOutputType | null
    _max: ExamAttachmentMaxAggregateOutputType | null
  }

  type GetExamAttachmentGroupByPayload<T extends ExamAttachmentGroupByArgs> = Promise<
    Array<
      PickArray<ExamAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], ExamAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type ExamAttachmentSelect = {
    id?: boolean
    name?: boolean
    filetype?: boolean
    verified?: boolean
    uploader?: boolean
    uploaded?: boolean
    exams?: boolean | ExamArgs
    exam_course_code?: boolean
    exam_date?: boolean
  }

  export type ExamAttachmentInclude = {
    exams?: boolean | ExamArgs
  }

  export type ExamAttachmentGetPayload<
    S extends boolean | null | undefined | ExamAttachmentArgs,
    U = keyof S
      > = S extends true
        ? ExamAttachment
    : S extends undefined
    ? never
    : S extends ExamAttachmentArgs | ExamAttachmentFindManyArgs
    ?'include' extends U
    ? ExamAttachment  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'exams'
        ? ExamGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ExamAttachment ?ExamAttachment [P]
  : 
          P extends 'exams'
        ? ExamGetPayload<S['select'][P]> : never
  } 
    : ExamAttachment
  : ExamAttachment


  type ExamAttachmentCountArgs = Merge<
    Omit<ExamAttachmentFindManyArgs, 'select' | 'include'> & {
      select?: ExamAttachmentCountAggregateInputType | true
    }
  >

  export interface ExamAttachmentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ExamAttachment that matches the filter.
     * @param {ExamAttachmentFindUniqueArgs} args - Arguments to find a ExamAttachment
     * @example
     * // Get one ExamAttachment
     * const examAttachment = await prisma.examAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExamAttachmentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExamAttachmentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ExamAttachment'> extends True ? CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment>, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T>>> : CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment | null >, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T> | null >>

    /**
     * Find the first ExamAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttachmentFindFirstArgs} args - Arguments to find a ExamAttachment
     * @example
     * // Get one ExamAttachment
     * const examAttachment = await prisma.examAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExamAttachmentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExamAttachmentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ExamAttachment'> extends True ? CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment>, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T>>> : CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment | null >, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T> | null >>

    /**
     * Find zero or more ExamAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttachmentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamAttachments
     * const examAttachments = await prisma.examAttachment.findMany()
     * 
     * // Get first 10 ExamAttachments
     * const examAttachments = await prisma.examAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examAttachmentWithIdOnly = await prisma.examAttachment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExamAttachmentFindManyArgs>(
      args?: SelectSubset<T, ExamAttachmentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ExamAttachment>>, PrismaPromise<Array<ExamAttachmentGetPayload<T>>>>

    /**
     * Create a ExamAttachment.
     * @param {ExamAttachmentCreateArgs} args - Arguments to create a ExamAttachment.
     * @example
     * // Create one ExamAttachment
     * const ExamAttachment = await prisma.examAttachment.create({
     *   data: {
     *     // ... data to create a ExamAttachment
     *   }
     * })
     * 
    **/
    create<T extends ExamAttachmentCreateArgs>(
      args: SelectSubset<T, ExamAttachmentCreateArgs>
    ): CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment>, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T>>>

    /**
     * Create many ExamAttachments.
     *     @param {ExamAttachmentCreateManyArgs} args - Arguments to create many ExamAttachments.
     *     @example
     *     // Create many ExamAttachments
     *     const examAttachment = await prisma.examAttachment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExamAttachmentCreateManyArgs>(
      args?: SelectSubset<T, ExamAttachmentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ExamAttachment.
     * @param {ExamAttachmentDeleteArgs} args - Arguments to delete one ExamAttachment.
     * @example
     * // Delete one ExamAttachment
     * const ExamAttachment = await prisma.examAttachment.delete({
     *   where: {
     *     // ... filter to delete one ExamAttachment
     *   }
     * })
     * 
    **/
    delete<T extends ExamAttachmentDeleteArgs>(
      args: SelectSubset<T, ExamAttachmentDeleteArgs>
    ): CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment>, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T>>>

    /**
     * Update one ExamAttachment.
     * @param {ExamAttachmentUpdateArgs} args - Arguments to update one ExamAttachment.
     * @example
     * // Update one ExamAttachment
     * const examAttachment = await prisma.examAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExamAttachmentUpdateArgs>(
      args: SelectSubset<T, ExamAttachmentUpdateArgs>
    ): CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment>, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T>>>

    /**
     * Delete zero or more ExamAttachments.
     * @param {ExamAttachmentDeleteManyArgs} args - Arguments to filter ExamAttachments to delete.
     * @example
     * // Delete a few ExamAttachments
     * const { count } = await prisma.examAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExamAttachmentDeleteManyArgs>(
      args?: SelectSubset<T, ExamAttachmentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamAttachments
     * const examAttachment = await prisma.examAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExamAttachmentUpdateManyArgs>(
      args: SelectSubset<T, ExamAttachmentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ExamAttachment.
     * @param {ExamAttachmentUpsertArgs} args - Arguments to update or create a ExamAttachment.
     * @example
     * // Update or create a ExamAttachment
     * const examAttachment = await prisma.examAttachment.upsert({
     *   create: {
     *     // ... data to create a ExamAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamAttachment we want to update
     *   }
     * })
    **/
    upsert<T extends ExamAttachmentUpsertArgs>(
      args: SelectSubset<T, ExamAttachmentUpsertArgs>
    ): CheckSelect<T, Prisma__ExamAttachmentClient<ExamAttachment>, Prisma__ExamAttachmentClient<ExamAttachmentGetPayload<T>>>

    /**
     * Count the number of ExamAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttachmentCountArgs} args - Arguments to filter ExamAttachments to count.
     * @example
     * // Count the number of ExamAttachments
     * const count = await prisma.examAttachment.count({
     *   where: {
     *     // ... the filter for the ExamAttachments we want to count
     *   }
     * })
    **/
    count<T extends ExamAttachmentCountArgs>(
      args?: Subset<T, ExamAttachmentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamAttachmentAggregateArgs>(args: Subset<T, ExamAttachmentAggregateArgs>): PrismaPromise<GetExamAttachmentAggregateType<T>>

    /**
     * Group by ExamAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: ExamAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamAttachmentGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ExamAttachmentClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    exams<T extends ExamArgs = {}>(args?: Subset<T, ExamArgs>): CheckSelect<T, Prisma__ExamClient<Exam | null >, Prisma__ExamClient<ExamGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ExamAttachment findUnique
   */
  export type ExamAttachmentFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * Throw an Error if a ExamAttachment can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ExamAttachment to fetch.
     * 
    **/
    where: ExamAttachmentWhereUniqueInput
  }


  /**
   * ExamAttachment findFirst
   */
  export type ExamAttachmentFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * Throw an Error if a ExamAttachment can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ExamAttachment to fetch.
     * 
    **/
    where?: ExamAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttachments to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamAttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamAttachments.
     * 
    **/
    cursor?: ExamAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttachments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttachments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamAttachments.
     * 
    **/
    distinct?: Enumerable<ExamAttachmentScalarFieldEnum>
  }


  /**
   * ExamAttachment findMany
   */
  export type ExamAttachmentFindManyArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * Filter, which ExamAttachments to fetch.
     * 
    **/
    where?: ExamAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttachments to fetch.
     * 
    **/
    orderBy?: Enumerable<ExamAttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamAttachments.
     * 
    **/
    cursor?: ExamAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttachments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttachments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExamAttachmentScalarFieldEnum>
  }


  /**
   * ExamAttachment create
   */
  export type ExamAttachmentCreateArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * The data needed to create a ExamAttachment.
     * 
    **/
    data: XOR<ExamAttachmentCreateInput, ExamAttachmentUncheckedCreateInput>
  }


  /**
   * ExamAttachment createMany
   */
  export type ExamAttachmentCreateManyArgs = {
    data: Enumerable<ExamAttachmentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ExamAttachment update
   */
  export type ExamAttachmentUpdateArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * The data needed to update a ExamAttachment.
     * 
    **/
    data: XOR<ExamAttachmentUpdateInput, ExamAttachmentUncheckedUpdateInput>
    /**
     * Choose, which ExamAttachment to update.
     * 
    **/
    where: ExamAttachmentWhereUniqueInput
  }


  /**
   * ExamAttachment updateMany
   */
  export type ExamAttachmentUpdateManyArgs = {
    data: XOR<ExamAttachmentUpdateManyMutationInput, ExamAttachmentUncheckedUpdateManyInput>
    where?: ExamAttachmentWhereInput
  }


  /**
   * ExamAttachment upsert
   */
  export type ExamAttachmentUpsertArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * The filter to search for the ExamAttachment to update in case it exists.
     * 
    **/
    where: ExamAttachmentWhereUniqueInput
    /**
     * In case the ExamAttachment found by the `where` argument doesn't exist, create a new ExamAttachment with this data.
     * 
    **/
    create: XOR<ExamAttachmentCreateInput, ExamAttachmentUncheckedCreateInput>
    /**
     * In case the ExamAttachment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExamAttachmentUpdateInput, ExamAttachmentUncheckedUpdateInput>
  }


  /**
   * ExamAttachment delete
   */
  export type ExamAttachmentDeleteArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
    /**
     * Filter which ExamAttachment to delete.
     * 
    **/
    where: ExamAttachmentWhereUniqueInput
  }


  /**
   * ExamAttachment deleteMany
   */
  export type ExamAttachmentDeleteManyArgs = {
    where?: ExamAttachmentWhereInput
  }


  /**
   * ExamAttachment without action
   */
  export type ExamAttachmentArgs = {
    /**
     * Select specific fields to fetch from the ExamAttachment
     * 
    **/
    select?: ExamAttachmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExamAttachmentInclude | null
  }



  /**
   * Model AlternativeExam
   */


  export type AggregateAlternativeExam = {
    _count: AlternativeExamCountAggregateOutputType | null
    _avg: AlternativeExamAvgAggregateOutputType | null
    _sum: AlternativeExamSumAggregateOutputType | null
    _min: AlternativeExamMinAggregateOutputType | null
    _max: AlternativeExamMaxAggregateOutputType | null
  }

  export type AlternativeExamAvgAggregateOutputType = {
    failed: number | null
    passed: number | null
  }

  export type AlternativeExamSumAggregateOutputType = {
    failed: number | null
    passed: number | null
  }

  export type AlternativeExamMinAggregateOutputType = {
    course_code: string | null
    exam_code: string | null
    date: string | null
    academic_year: string | null
    failed: number | null
    passed: number | null
  }

  export type AlternativeExamMaxAggregateOutputType = {
    course_code: string | null
    exam_code: string | null
    date: string | null
    academic_year: string | null
    failed: number | null
    passed: number | null
  }

  export type AlternativeExamCountAggregateOutputType = {
    course_code: number
    exam_code: number
    date: number
    academic_year: number
    failed: number
    passed: number
    _all: number
  }


  export type AlternativeExamAvgAggregateInputType = {
    failed?: true
    passed?: true
  }

  export type AlternativeExamSumAggregateInputType = {
    failed?: true
    passed?: true
  }

  export type AlternativeExamMinAggregateInputType = {
    course_code?: true
    exam_code?: true
    date?: true
    academic_year?: true
    failed?: true
    passed?: true
  }

  export type AlternativeExamMaxAggregateInputType = {
    course_code?: true
    exam_code?: true
    date?: true
    academic_year?: true
    failed?: true
    passed?: true
  }

  export type AlternativeExamCountAggregateInputType = {
    course_code?: true
    exam_code?: true
    date?: true
    academic_year?: true
    failed?: true
    passed?: true
    _all?: true
  }

  export type AlternativeExamAggregateArgs = {
    /**
     * Filter which AlternativeExam to aggregate.
     * 
    **/
    where?: AlternativeExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlternativeExams to fetch.
     * 
    **/
    orderBy?: Enumerable<AlternativeExamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AlternativeExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlternativeExams from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlternativeExams.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlternativeExams
    **/
    _count?: true | AlternativeExamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlternativeExamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlternativeExamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlternativeExamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlternativeExamMaxAggregateInputType
  }

  export type GetAlternativeExamAggregateType<T extends AlternativeExamAggregateArgs> = {
        [P in keyof T & keyof AggregateAlternativeExam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlternativeExam[P]>
      : GetScalarType<T[P], AggregateAlternativeExam[P]>
  }




  export type AlternativeExamGroupByArgs = {
    where?: AlternativeExamWhereInput
    orderBy?: Enumerable<AlternativeExamOrderByWithAggregationInput>
    by: Array<AlternativeExamScalarFieldEnum>
    having?: AlternativeExamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlternativeExamCountAggregateInputType | true
    _avg?: AlternativeExamAvgAggregateInputType
    _sum?: AlternativeExamSumAggregateInputType
    _min?: AlternativeExamMinAggregateInputType
    _max?: AlternativeExamMaxAggregateInputType
  }


  export type AlternativeExamGroupByOutputType = {
    course_code: string
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
    _count: AlternativeExamCountAggregateOutputType | null
    _avg: AlternativeExamAvgAggregateOutputType | null
    _sum: AlternativeExamSumAggregateOutputType | null
    _min: AlternativeExamMinAggregateOutputType | null
    _max: AlternativeExamMaxAggregateOutputType | null
  }

  type GetAlternativeExamGroupByPayload<T extends AlternativeExamGroupByArgs> = Promise<
    Array<
      PickArray<AlternativeExamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlternativeExamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlternativeExamGroupByOutputType[P]>
            : GetScalarType<T[P], AlternativeExamGroupByOutputType[P]>
        }
      >
    >


  export type AlternativeExamSelect = {
    course_code?: boolean
    exam_code?: boolean
    date?: boolean
    academic_year?: boolean
    failed?: boolean
    passed?: boolean
    course?: boolean | CourseArgs
  }

  export type AlternativeExamInclude = {
    course?: boolean | CourseArgs
  }

  export type AlternativeExamGetPayload<
    S extends boolean | null | undefined | AlternativeExamArgs,
    U = keyof S
      > = S extends true
        ? AlternativeExam
    : S extends undefined
    ? never
    : S extends AlternativeExamArgs | AlternativeExamFindManyArgs
    ?'include' extends U
    ? AlternativeExam  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'course'
        ? CourseGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof AlternativeExam ?AlternativeExam [P]
  : 
          P extends 'course'
        ? CourseGetPayload<S['select'][P]> : never
  } 
    : AlternativeExam
  : AlternativeExam


  type AlternativeExamCountArgs = Merge<
    Omit<AlternativeExamFindManyArgs, 'select' | 'include'> & {
      select?: AlternativeExamCountAggregateInputType | true
    }
  >

  export interface AlternativeExamDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AlternativeExam that matches the filter.
     * @param {AlternativeExamFindUniqueArgs} args - Arguments to find a AlternativeExam
     * @example
     * // Get one AlternativeExam
     * const alternativeExam = await prisma.alternativeExam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AlternativeExamFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AlternativeExamFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AlternativeExam'> extends True ? CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam>, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T>>> : CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam | null >, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T> | null >>

    /**
     * Find the first AlternativeExam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlternativeExamFindFirstArgs} args - Arguments to find a AlternativeExam
     * @example
     * // Get one AlternativeExam
     * const alternativeExam = await prisma.alternativeExam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AlternativeExamFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AlternativeExamFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AlternativeExam'> extends True ? CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam>, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T>>> : CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam | null >, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T> | null >>

    /**
     * Find zero or more AlternativeExams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlternativeExamFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlternativeExams
     * const alternativeExams = await prisma.alternativeExam.findMany()
     * 
     * // Get first 10 AlternativeExams
     * const alternativeExams = await prisma.alternativeExam.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const alternativeExamWithCourse_codeOnly = await prisma.alternativeExam.findMany({ select: { course_code: true } })
     * 
    **/
    findMany<T extends AlternativeExamFindManyArgs>(
      args?: SelectSubset<T, AlternativeExamFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AlternativeExam>>, PrismaPromise<Array<AlternativeExamGetPayload<T>>>>

    /**
     * Create a AlternativeExam.
     * @param {AlternativeExamCreateArgs} args - Arguments to create a AlternativeExam.
     * @example
     * // Create one AlternativeExam
     * const AlternativeExam = await prisma.alternativeExam.create({
     *   data: {
     *     // ... data to create a AlternativeExam
     *   }
     * })
     * 
    **/
    create<T extends AlternativeExamCreateArgs>(
      args: SelectSubset<T, AlternativeExamCreateArgs>
    ): CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam>, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T>>>

    /**
     * Create many AlternativeExams.
     *     @param {AlternativeExamCreateManyArgs} args - Arguments to create many AlternativeExams.
     *     @example
     *     // Create many AlternativeExams
     *     const alternativeExam = await prisma.alternativeExam.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AlternativeExamCreateManyArgs>(
      args?: SelectSubset<T, AlternativeExamCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AlternativeExam.
     * @param {AlternativeExamDeleteArgs} args - Arguments to delete one AlternativeExam.
     * @example
     * // Delete one AlternativeExam
     * const AlternativeExam = await prisma.alternativeExam.delete({
     *   where: {
     *     // ... filter to delete one AlternativeExam
     *   }
     * })
     * 
    **/
    delete<T extends AlternativeExamDeleteArgs>(
      args: SelectSubset<T, AlternativeExamDeleteArgs>
    ): CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam>, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T>>>

    /**
     * Update one AlternativeExam.
     * @param {AlternativeExamUpdateArgs} args - Arguments to update one AlternativeExam.
     * @example
     * // Update one AlternativeExam
     * const alternativeExam = await prisma.alternativeExam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AlternativeExamUpdateArgs>(
      args: SelectSubset<T, AlternativeExamUpdateArgs>
    ): CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam>, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T>>>

    /**
     * Delete zero or more AlternativeExams.
     * @param {AlternativeExamDeleteManyArgs} args - Arguments to filter AlternativeExams to delete.
     * @example
     * // Delete a few AlternativeExams
     * const { count } = await prisma.alternativeExam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AlternativeExamDeleteManyArgs>(
      args?: SelectSubset<T, AlternativeExamDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlternativeExams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlternativeExamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlternativeExams
     * const alternativeExam = await prisma.alternativeExam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AlternativeExamUpdateManyArgs>(
      args: SelectSubset<T, AlternativeExamUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AlternativeExam.
     * @param {AlternativeExamUpsertArgs} args - Arguments to update or create a AlternativeExam.
     * @example
     * // Update or create a AlternativeExam
     * const alternativeExam = await prisma.alternativeExam.upsert({
     *   create: {
     *     // ... data to create a AlternativeExam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlternativeExam we want to update
     *   }
     * })
    **/
    upsert<T extends AlternativeExamUpsertArgs>(
      args: SelectSubset<T, AlternativeExamUpsertArgs>
    ): CheckSelect<T, Prisma__AlternativeExamClient<AlternativeExam>, Prisma__AlternativeExamClient<AlternativeExamGetPayload<T>>>

    /**
     * Count the number of AlternativeExams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlternativeExamCountArgs} args - Arguments to filter AlternativeExams to count.
     * @example
     * // Count the number of AlternativeExams
     * const count = await prisma.alternativeExam.count({
     *   where: {
     *     // ... the filter for the AlternativeExams we want to count
     *   }
     * })
    **/
    count<T extends AlternativeExamCountArgs>(
      args?: Subset<T, AlternativeExamCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlternativeExamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlternativeExam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlternativeExamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlternativeExamAggregateArgs>(args: Subset<T, AlternativeExamAggregateArgs>): PrismaPromise<GetAlternativeExamAggregateType<T>>

    /**
     * Group by AlternativeExam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlternativeExamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlternativeExamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlternativeExamGroupByArgs['orderBy'] }
        : { orderBy?: AlternativeExamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlternativeExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlternativeExamGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlternativeExam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AlternativeExamClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AlternativeExam findUnique
   */
  export type AlternativeExamFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * Throw an Error if a AlternativeExam can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which AlternativeExam to fetch.
     * 
    **/
    where: AlternativeExamWhereUniqueInput
  }


  /**
   * AlternativeExam findFirst
   */
  export type AlternativeExamFindFirstArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * Throw an Error if a AlternativeExam can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which AlternativeExam to fetch.
     * 
    **/
    where?: AlternativeExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlternativeExams to fetch.
     * 
    **/
    orderBy?: Enumerable<AlternativeExamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlternativeExams.
     * 
    **/
    cursor?: AlternativeExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlternativeExams from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlternativeExams.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlternativeExams.
     * 
    **/
    distinct?: Enumerable<AlternativeExamScalarFieldEnum>
  }


  /**
   * AlternativeExam findMany
   */
  export type AlternativeExamFindManyArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * Filter, which AlternativeExams to fetch.
     * 
    **/
    where?: AlternativeExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlternativeExams to fetch.
     * 
    **/
    orderBy?: Enumerable<AlternativeExamOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlternativeExams.
     * 
    **/
    cursor?: AlternativeExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlternativeExams from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlternativeExams.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AlternativeExamScalarFieldEnum>
  }


  /**
   * AlternativeExam create
   */
  export type AlternativeExamCreateArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * The data needed to create a AlternativeExam.
     * 
    **/
    data: XOR<AlternativeExamCreateInput, AlternativeExamUncheckedCreateInput>
  }


  /**
   * AlternativeExam createMany
   */
  export type AlternativeExamCreateManyArgs = {
    data: Enumerable<AlternativeExamCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AlternativeExam update
   */
  export type AlternativeExamUpdateArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * The data needed to update a AlternativeExam.
     * 
    **/
    data: XOR<AlternativeExamUpdateInput, AlternativeExamUncheckedUpdateInput>
    /**
     * Choose, which AlternativeExam to update.
     * 
    **/
    where: AlternativeExamWhereUniqueInput
  }


  /**
   * AlternativeExam updateMany
   */
  export type AlternativeExamUpdateManyArgs = {
    data: XOR<AlternativeExamUpdateManyMutationInput, AlternativeExamUncheckedUpdateManyInput>
    where?: AlternativeExamWhereInput
  }


  /**
   * AlternativeExam upsert
   */
  export type AlternativeExamUpsertArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * The filter to search for the AlternativeExam to update in case it exists.
     * 
    **/
    where: AlternativeExamWhereUniqueInput
    /**
     * In case the AlternativeExam found by the `where` argument doesn't exist, create a new AlternativeExam with this data.
     * 
    **/
    create: XOR<AlternativeExamCreateInput, AlternativeExamUncheckedCreateInput>
    /**
     * In case the AlternativeExam was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AlternativeExamUpdateInput, AlternativeExamUncheckedUpdateInput>
  }


  /**
   * AlternativeExam delete
   */
  export type AlternativeExamDeleteArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
    /**
     * Filter which AlternativeExam to delete.
     * 
    **/
    where: AlternativeExamWhereUniqueInput
  }


  /**
   * AlternativeExam deleteMany
   */
  export type AlternativeExamDeleteManyArgs = {
    where?: AlternativeExamWhereInput
  }


  /**
   * AlternativeExam without action
   */
  export type AlternativeExamArgs = {
    /**
     * Select specific fields to fetch from the AlternativeExam
     * 
    **/
    select?: AlternativeExamSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AlternativeExamInclude | null
  }



  /**
   * Model Period
   */


  export type AggregatePeriod = {
    _count: PeriodCountAggregateOutputType | null
    _avg: PeriodAvgAggregateOutputType | null
    _sum: PeriodSumAggregateOutputType | null
    _min: PeriodMinAggregateOutputType | null
    _max: PeriodMaxAggregateOutputType | null
  }

  export type PeriodAvgAggregateOutputType = {
    study_period: number | null
  }

  export type PeriodSumAggregateOutputType = {
    study_period: number | null
  }

  export type PeriodMinAggregateOutputType = {
    type: string | null
    academic_year: string | null
    study_period: number | null
    start: Date | null
    end: Date | null
  }

  export type PeriodMaxAggregateOutputType = {
    type: string | null
    academic_year: string | null
    study_period: number | null
    start: Date | null
    end: Date | null
  }

  export type PeriodCountAggregateOutputType = {
    type: number
    academic_year: number
    study_period: number
    start: number
    end: number
    _all: number
  }


  export type PeriodAvgAggregateInputType = {
    study_period?: true
  }

  export type PeriodSumAggregateInputType = {
    study_period?: true
  }

  export type PeriodMinAggregateInputType = {
    type?: true
    academic_year?: true
    study_period?: true
    start?: true
    end?: true
  }

  export type PeriodMaxAggregateInputType = {
    type?: true
    academic_year?: true
    study_period?: true
    start?: true
    end?: true
  }

  export type PeriodCountAggregateInputType = {
    type?: true
    academic_year?: true
    study_period?: true
    start?: true
    end?: true
    _all?: true
  }

  export type PeriodAggregateArgs = {
    /**
     * Filter which Period to aggregate.
     * 
    **/
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     * 
    **/
    orderBy?: Enumerable<PeriodOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Periods
    **/
    _count?: true | PeriodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PeriodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PeriodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeriodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeriodMaxAggregateInputType
  }

  export type GetPeriodAggregateType<T extends PeriodAggregateArgs> = {
        [P in keyof T & keyof AggregatePeriod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeriod[P]>
      : GetScalarType<T[P], AggregatePeriod[P]>
  }




  export type PeriodGroupByArgs = {
    where?: PeriodWhereInput
    orderBy?: Enumerable<PeriodOrderByWithAggregationInput>
    by: Array<PeriodScalarFieldEnum>
    having?: PeriodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeriodCountAggregateInputType | true
    _avg?: PeriodAvgAggregateInputType
    _sum?: PeriodSumAggregateInputType
    _min?: PeriodMinAggregateInputType
    _max?: PeriodMaxAggregateInputType
  }


  export type PeriodGroupByOutputType = {
    type: string
    academic_year: string
    study_period: number
    start: Date
    end: Date
    _count: PeriodCountAggregateOutputType | null
    _avg: PeriodAvgAggregateOutputType | null
    _sum: PeriodSumAggregateOutputType | null
    _min: PeriodMinAggregateOutputType | null
    _max: PeriodMaxAggregateOutputType | null
  }

  type GetPeriodGroupByPayload<T extends PeriodGroupByArgs> = Promise<
    Array<
      PickArray<PeriodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeriodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeriodGroupByOutputType[P]>
            : GetScalarType<T[P], PeriodGroupByOutputType[P]>
        }
      >
    >


  export type PeriodSelect = {
    type?: boolean
    academic_year?: boolean
    study_period?: boolean
    start?: boolean
    end?: boolean
  }

  export type PeriodGetPayload<
    S extends boolean | null | undefined | PeriodArgs,
    U = keyof S
      > = S extends true
        ? Period
    : S extends undefined
    ? never
    : S extends PeriodArgs | PeriodFindManyArgs
    ?'include' extends U
    ? Period 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Period ?Period [P]
  : 
     never
  } 
    : Period
  : Period


  type PeriodCountArgs = Merge<
    Omit<PeriodFindManyArgs, 'select' | 'include'> & {
      select?: PeriodCountAggregateInputType | true
    }
  >

  export interface PeriodDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Period that matches the filter.
     * @param {PeriodFindUniqueArgs} args - Arguments to find a Period
     * @example
     * // Get one Period
     * const period = await prisma.period.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PeriodFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PeriodFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Period'> extends True ? CheckSelect<T, Prisma__PeriodClient<Period>, Prisma__PeriodClient<PeriodGetPayload<T>>> : CheckSelect<T, Prisma__PeriodClient<Period | null >, Prisma__PeriodClient<PeriodGetPayload<T> | null >>

    /**
     * Find the first Period that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodFindFirstArgs} args - Arguments to find a Period
     * @example
     * // Get one Period
     * const period = await prisma.period.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PeriodFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PeriodFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Period'> extends True ? CheckSelect<T, Prisma__PeriodClient<Period>, Prisma__PeriodClient<PeriodGetPayload<T>>> : CheckSelect<T, Prisma__PeriodClient<Period | null >, Prisma__PeriodClient<PeriodGetPayload<T> | null >>

    /**
     * Find zero or more Periods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Periods
     * const periods = await prisma.period.findMany()
     * 
     * // Get first 10 Periods
     * const periods = await prisma.period.findMany({ take: 10 })
     * 
     * // Only select the `type`
     * const periodWithTypeOnly = await prisma.period.findMany({ select: { type: true } })
     * 
    **/
    findMany<T extends PeriodFindManyArgs>(
      args?: SelectSubset<T, PeriodFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Period>>, PrismaPromise<Array<PeriodGetPayload<T>>>>

    /**
     * Create a Period.
     * @param {PeriodCreateArgs} args - Arguments to create a Period.
     * @example
     * // Create one Period
     * const Period = await prisma.period.create({
     *   data: {
     *     // ... data to create a Period
     *   }
     * })
     * 
    **/
    create<T extends PeriodCreateArgs>(
      args: SelectSubset<T, PeriodCreateArgs>
    ): CheckSelect<T, Prisma__PeriodClient<Period>, Prisma__PeriodClient<PeriodGetPayload<T>>>

    /**
     * Create many Periods.
     *     @param {PeriodCreateManyArgs} args - Arguments to create many Periods.
     *     @example
     *     // Create many Periods
     *     const period = await prisma.period.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PeriodCreateManyArgs>(
      args?: SelectSubset<T, PeriodCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Period.
     * @param {PeriodDeleteArgs} args - Arguments to delete one Period.
     * @example
     * // Delete one Period
     * const Period = await prisma.period.delete({
     *   where: {
     *     // ... filter to delete one Period
     *   }
     * })
     * 
    **/
    delete<T extends PeriodDeleteArgs>(
      args: SelectSubset<T, PeriodDeleteArgs>
    ): CheckSelect<T, Prisma__PeriodClient<Period>, Prisma__PeriodClient<PeriodGetPayload<T>>>

    /**
     * Update one Period.
     * @param {PeriodUpdateArgs} args - Arguments to update one Period.
     * @example
     * // Update one Period
     * const period = await prisma.period.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PeriodUpdateArgs>(
      args: SelectSubset<T, PeriodUpdateArgs>
    ): CheckSelect<T, Prisma__PeriodClient<Period>, Prisma__PeriodClient<PeriodGetPayload<T>>>

    /**
     * Delete zero or more Periods.
     * @param {PeriodDeleteManyArgs} args - Arguments to filter Periods to delete.
     * @example
     * // Delete a few Periods
     * const { count } = await prisma.period.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PeriodDeleteManyArgs>(
      args?: SelectSubset<T, PeriodDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Periods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Periods
     * const period = await prisma.period.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PeriodUpdateManyArgs>(
      args: SelectSubset<T, PeriodUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Period.
     * @param {PeriodUpsertArgs} args - Arguments to update or create a Period.
     * @example
     * // Update or create a Period
     * const period = await prisma.period.upsert({
     *   create: {
     *     // ... data to create a Period
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Period we want to update
     *   }
     * })
    **/
    upsert<T extends PeriodUpsertArgs>(
      args: SelectSubset<T, PeriodUpsertArgs>
    ): CheckSelect<T, Prisma__PeriodClient<Period>, Prisma__PeriodClient<PeriodGetPayload<T>>>

    /**
     * Count the number of Periods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodCountArgs} args - Arguments to filter Periods to count.
     * @example
     * // Count the number of Periods
     * const count = await prisma.period.count({
     *   where: {
     *     // ... the filter for the Periods we want to count
     *   }
     * })
    **/
    count<T extends PeriodCountArgs>(
      args?: Subset<T, PeriodCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeriodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Period.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PeriodAggregateArgs>(args: Subset<T, PeriodAggregateArgs>): PrismaPromise<GetPeriodAggregateType<T>>

    /**
     * Group by Period.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PeriodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeriodGroupByArgs['orderBy'] }
        : { orderBy?: PeriodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeriodGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Period.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PeriodClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Period findUnique
   */
  export type PeriodFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * Throw an Error if a Period can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Period to fetch.
     * 
    **/
    where: PeriodWhereUniqueInput
  }


  /**
   * Period findFirst
   */
  export type PeriodFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * Throw an Error if a Period can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Period to fetch.
     * 
    **/
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     * 
    **/
    orderBy?: Enumerable<PeriodOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Periods.
     * 
    **/
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periods.
     * 
    **/
    distinct?: Enumerable<PeriodScalarFieldEnum>
  }


  /**
   * Period findMany
   */
  export type PeriodFindManyArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * Filter, which Periods to fetch.
     * 
    **/
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     * 
    **/
    orderBy?: Enumerable<PeriodOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Periods.
     * 
    **/
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PeriodScalarFieldEnum>
  }


  /**
   * Period create
   */
  export type PeriodCreateArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * The data needed to create a Period.
     * 
    **/
    data: XOR<PeriodCreateInput, PeriodUncheckedCreateInput>
  }


  /**
   * Period createMany
   */
  export type PeriodCreateManyArgs = {
    data: Enumerable<PeriodCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Period update
   */
  export type PeriodUpdateArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * The data needed to update a Period.
     * 
    **/
    data: XOR<PeriodUpdateInput, PeriodUncheckedUpdateInput>
    /**
     * Choose, which Period to update.
     * 
    **/
    where: PeriodWhereUniqueInput
  }


  /**
   * Period updateMany
   */
  export type PeriodUpdateManyArgs = {
    data: XOR<PeriodUpdateManyMutationInput, PeriodUncheckedUpdateManyInput>
    where?: PeriodWhereInput
  }


  /**
   * Period upsert
   */
  export type PeriodUpsertArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * The filter to search for the Period to update in case it exists.
     * 
    **/
    where: PeriodWhereUniqueInput
    /**
     * In case the Period found by the `where` argument doesn't exist, create a new Period with this data.
     * 
    **/
    create: XOR<PeriodCreateInput, PeriodUncheckedCreateInput>
    /**
     * In case the Period was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PeriodUpdateInput, PeriodUncheckedUpdateInput>
  }


  /**
   * Period delete
   */
  export type PeriodDeleteArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
    /**
     * Filter which Period to delete.
     * 
    **/
    where: PeriodWhereUniqueInput
  }


  /**
   * Period deleteMany
   */
  export type PeriodDeleteManyArgs = {
    where?: PeriodWhereInput
  }


  /**
   * Period without action
   */
  export type PeriodArgs = {
    /**
     * Select specific fields to fetch from the Period
     * 
    **/
    select?: PeriodSelect | null
  }



  /**
   * Model Survey
   */


  export type AggregateSurvey = {
    _count: SurveyCountAggregateOutputType | null
    _avg: SurveyAvgAggregateOutputType | null
    _sum: SurveySumAggregateOutputType | null
    _min: SurveyMinAggregateOutputType | null
    _max: SurveyMaxAggregateOutputType | null
  }

  export type SurveyAvgAggregateOutputType = {
    start_period: number | null
    end_period: number | null
    respondents: number | null
    responses: number | null
    answer_frequency: number | null
    prerequisite_mean: number | null
    prerequisite_median: number | null
    goals_mean: number | null
    goals_median: number | null
    structure_mean: number | null
    structure_median: number | null
    teaching_mean: number | null
    teaching_median: number | null
    litterature_mean: number | null
    litterature_median: number | null
    assessment_mean: number | null
    assessment_median: number | null
    administration_mean: number | null
    administration_median: number | null
    workload_mean: number | null
    workload_median: number | null
    working_environment_mean: number | null
    working_environment_median: number | null
    total_impression_mean: number | null
    total_impression_median: number | null
  }

  export type SurveySumAggregateOutputType = {
    start_period: number | null
    end_period: number | null
    respondents: number | null
    responses: number | null
    answer_frequency: number | null
    prerequisite_mean: number | null
    prerequisite_median: number | null
    goals_mean: number | null
    goals_median: number | null
    structure_mean: number | null
    structure_median: number | null
    teaching_mean: number | null
    teaching_median: number | null
    litterature_mean: number | null
    litterature_median: number | null
    assessment_mean: number | null
    assessment_median: number | null
    administration_mean: number | null
    administration_median: number | null
    workload_mean: number | null
    workload_median: number | null
    working_environment_mean: number | null
    working_environment_median: number | null
    total_impression_mean: number | null
    total_impression_median: number | null
  }

  export type SurveyMinAggregateOutputType = {
    course_code: string | null
    academic_year: string | null
    start_period: number | null
    end_period: number | null
    language: string | null
    respondents: number | null
    responses: number | null
    answer_frequency: number | null
    prerequisite_mean: number | null
    prerequisite_median: number | null
    goals_mean: number | null
    goals_median: number | null
    structure_mean: number | null
    structure_median: number | null
    teaching_mean: number | null
    teaching_median: number | null
    litterature_mean: number | null
    litterature_median: number | null
    assessment_mean: number | null
    assessment_median: number | null
    administration_mean: number | null
    administration_median: number | null
    workload_mean: number | null
    workload_median: number | null
    working_environment_mean: number | null
    working_environment_median: number | null
    total_impression_mean: number | null
    total_impression_median: number | null
    has_minutes: boolean | null
  }

  export type SurveyMaxAggregateOutputType = {
    course_code: string | null
    academic_year: string | null
    start_period: number | null
    end_period: number | null
    language: string | null
    respondents: number | null
    responses: number | null
    answer_frequency: number | null
    prerequisite_mean: number | null
    prerequisite_median: number | null
    goals_mean: number | null
    goals_median: number | null
    structure_mean: number | null
    structure_median: number | null
    teaching_mean: number | null
    teaching_median: number | null
    litterature_mean: number | null
    litterature_median: number | null
    assessment_mean: number | null
    assessment_median: number | null
    administration_mean: number | null
    administration_median: number | null
    workload_mean: number | null
    workload_median: number | null
    working_environment_mean: number | null
    working_environment_median: number | null
    total_impression_mean: number | null
    total_impression_median: number | null
    has_minutes: boolean | null
  }

  export type SurveyCountAggregateOutputType = {
    course_code: number
    academic_year: number
    start_period: number
    end_period: number
    language: number
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean: number
    working_environment_median: number
    total_impression_mean: number
    total_impression_median: number
    has_minutes: number
    _all: number
  }


  export type SurveyAvgAggregateInputType = {
    start_period?: true
    end_period?: true
    respondents?: true
    responses?: true
    answer_frequency?: true
    prerequisite_mean?: true
    prerequisite_median?: true
    goals_mean?: true
    goals_median?: true
    structure_mean?: true
    structure_median?: true
    teaching_mean?: true
    teaching_median?: true
    litterature_mean?: true
    litterature_median?: true
    assessment_mean?: true
    assessment_median?: true
    administration_mean?: true
    administration_median?: true
    workload_mean?: true
    workload_median?: true
    working_environment_mean?: true
    working_environment_median?: true
    total_impression_mean?: true
    total_impression_median?: true
  }

  export type SurveySumAggregateInputType = {
    start_period?: true
    end_period?: true
    respondents?: true
    responses?: true
    answer_frequency?: true
    prerequisite_mean?: true
    prerequisite_median?: true
    goals_mean?: true
    goals_median?: true
    structure_mean?: true
    structure_median?: true
    teaching_mean?: true
    teaching_median?: true
    litterature_mean?: true
    litterature_median?: true
    assessment_mean?: true
    assessment_median?: true
    administration_mean?: true
    administration_median?: true
    workload_mean?: true
    workload_median?: true
    working_environment_mean?: true
    working_environment_median?: true
    total_impression_mean?: true
    total_impression_median?: true
  }

  export type SurveyMinAggregateInputType = {
    course_code?: true
    academic_year?: true
    start_period?: true
    end_period?: true
    language?: true
    respondents?: true
    responses?: true
    answer_frequency?: true
    prerequisite_mean?: true
    prerequisite_median?: true
    goals_mean?: true
    goals_median?: true
    structure_mean?: true
    structure_median?: true
    teaching_mean?: true
    teaching_median?: true
    litterature_mean?: true
    litterature_median?: true
    assessment_mean?: true
    assessment_median?: true
    administration_mean?: true
    administration_median?: true
    workload_mean?: true
    workload_median?: true
    working_environment_mean?: true
    working_environment_median?: true
    total_impression_mean?: true
    total_impression_median?: true
    has_minutes?: true
  }

  export type SurveyMaxAggregateInputType = {
    course_code?: true
    academic_year?: true
    start_period?: true
    end_period?: true
    language?: true
    respondents?: true
    responses?: true
    answer_frequency?: true
    prerequisite_mean?: true
    prerequisite_median?: true
    goals_mean?: true
    goals_median?: true
    structure_mean?: true
    structure_median?: true
    teaching_mean?: true
    teaching_median?: true
    litterature_mean?: true
    litterature_median?: true
    assessment_mean?: true
    assessment_median?: true
    administration_mean?: true
    administration_median?: true
    workload_mean?: true
    workload_median?: true
    working_environment_mean?: true
    working_environment_median?: true
    total_impression_mean?: true
    total_impression_median?: true
    has_minutes?: true
  }

  export type SurveyCountAggregateInputType = {
    course_code?: true
    academic_year?: true
    start_period?: true
    end_period?: true
    language?: true
    respondents?: true
    responses?: true
    answer_frequency?: true
    prerequisite_mean?: true
    prerequisite_median?: true
    goals_mean?: true
    goals_median?: true
    structure_mean?: true
    structure_median?: true
    teaching_mean?: true
    teaching_median?: true
    litterature_mean?: true
    litterature_median?: true
    assessment_mean?: true
    assessment_median?: true
    administration_mean?: true
    administration_median?: true
    workload_mean?: true
    workload_median?: true
    working_environment_mean?: true
    working_environment_median?: true
    total_impression_mean?: true
    total_impression_median?: true
    has_minutes?: true
    _all?: true
  }

  export type SurveyAggregateArgs = {
    /**
     * Filter which Survey to aggregate.
     * 
    **/
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     * 
    **/
    orderBy?: Enumerable<SurveyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Surveys
    **/
    _count?: true | SurveyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyMaxAggregateInputType
  }

  export type GetSurveyAggregateType<T extends SurveyAggregateArgs> = {
        [P in keyof T & keyof AggregateSurvey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurvey[P]>
      : GetScalarType<T[P], AggregateSurvey[P]>
  }




  export type SurveyGroupByArgs = {
    where?: SurveyWhereInput
    orderBy?: Enumerable<SurveyOrderByWithAggregationInput>
    by: Array<SurveyScalarFieldEnum>
    having?: SurveyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyCountAggregateInputType | true
    _avg?: SurveyAvgAggregateInputType
    _sum?: SurveySumAggregateInputType
    _min?: SurveyMinAggregateInputType
    _max?: SurveyMaxAggregateInputType
  }


  export type SurveyGroupByOutputType = {
    course_code: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean: number | null
    working_environment_median: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes: boolean
    _count: SurveyCountAggregateOutputType | null
    _avg: SurveyAvgAggregateOutputType | null
    _sum: SurveySumAggregateOutputType | null
    _min: SurveyMinAggregateOutputType | null
    _max: SurveyMaxAggregateOutputType | null
  }

  type GetSurveyGroupByPayload<T extends SurveyGroupByArgs> = Promise<
    Array<
      PickArray<SurveyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyGroupByOutputType[P]>
        }
      >
    >


  export type SurveySelect = {
    course_code?: boolean
    academic_year?: boolean
    start_period?: boolean
    end_period?: boolean
    language?: boolean
    respondents?: boolean
    responses?: boolean
    answer_frequency?: boolean
    prerequisite_mean?: boolean
    prerequisite_median?: boolean
    goals_mean?: boolean
    goals_median?: boolean
    structure_mean?: boolean
    structure_median?: boolean
    teaching_mean?: boolean
    teaching_median?: boolean
    litterature_mean?: boolean
    litterature_median?: boolean
    assessment_mean?: boolean
    assessment_median?: boolean
    administration_mean?: boolean
    administration_median?: boolean
    workload_mean?: boolean
    workload_median?: boolean
    working_environment_mean?: boolean
    working_environment_median?: boolean
    total_impression_mean?: boolean
    total_impression_median?: boolean
    has_minutes?: boolean
    course?: boolean | CourseArgs
    instance?: boolean | CourseInstanceArgs
  }

  export type SurveyInclude = {
    course?: boolean | CourseArgs
    instance?: boolean | CourseInstanceArgs
  }

  export type SurveyGetPayload<
    S extends boolean | null | undefined | SurveyArgs,
    U = keyof S
      > = S extends true
        ? Survey
    : S extends undefined
    ? never
    : S extends SurveyArgs | SurveyFindManyArgs
    ?'include' extends U
    ? Survey  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'course'
        ? CourseGetPayload<S['include'][P]> :
        P extends 'instance'
        ? CourseInstanceGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Survey ?Survey [P]
  : 
          P extends 'course'
        ? CourseGetPayload<S['select'][P]> :
        P extends 'instance'
        ? CourseInstanceGetPayload<S['select'][P]> : never
  } 
    : Survey
  : Survey


  type SurveyCountArgs = Merge<
    Omit<SurveyFindManyArgs, 'select' | 'include'> & {
      select?: SurveyCountAggregateInputType | true
    }
  >

  export interface SurveyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Survey that matches the filter.
     * @param {SurveyFindUniqueArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SurveyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SurveyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Survey'> extends True ? CheckSelect<T, Prisma__SurveyClient<Survey>, Prisma__SurveyClient<SurveyGetPayload<T>>> : CheckSelect<T, Prisma__SurveyClient<Survey | null >, Prisma__SurveyClient<SurveyGetPayload<T> | null >>

    /**
     * Find the first Survey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindFirstArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SurveyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SurveyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Survey'> extends True ? CheckSelect<T, Prisma__SurveyClient<Survey>, Prisma__SurveyClient<SurveyGetPayload<T>>> : CheckSelect<T, Prisma__SurveyClient<Survey | null >, Prisma__SurveyClient<SurveyGetPayload<T> | null >>

    /**
     * Find zero or more Surveys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Surveys
     * const surveys = await prisma.survey.findMany()
     * 
     * // Get first 10 Surveys
     * const surveys = await prisma.survey.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const surveyWithCourse_codeOnly = await prisma.survey.findMany({ select: { course_code: true } })
     * 
    **/
    findMany<T extends SurveyFindManyArgs>(
      args?: SelectSubset<T, SurveyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Survey>>, PrismaPromise<Array<SurveyGetPayload<T>>>>

    /**
     * Create a Survey.
     * @param {SurveyCreateArgs} args - Arguments to create a Survey.
     * @example
     * // Create one Survey
     * const Survey = await prisma.survey.create({
     *   data: {
     *     // ... data to create a Survey
     *   }
     * })
     * 
    **/
    create<T extends SurveyCreateArgs>(
      args: SelectSubset<T, SurveyCreateArgs>
    ): CheckSelect<T, Prisma__SurveyClient<Survey>, Prisma__SurveyClient<SurveyGetPayload<T>>>

    /**
     * Create many Surveys.
     *     @param {SurveyCreateManyArgs} args - Arguments to create many Surveys.
     *     @example
     *     // Create many Surveys
     *     const survey = await prisma.survey.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SurveyCreateManyArgs>(
      args?: SelectSubset<T, SurveyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Survey.
     * @param {SurveyDeleteArgs} args - Arguments to delete one Survey.
     * @example
     * // Delete one Survey
     * const Survey = await prisma.survey.delete({
     *   where: {
     *     // ... filter to delete one Survey
     *   }
     * })
     * 
    **/
    delete<T extends SurveyDeleteArgs>(
      args: SelectSubset<T, SurveyDeleteArgs>
    ): CheckSelect<T, Prisma__SurveyClient<Survey>, Prisma__SurveyClient<SurveyGetPayload<T>>>

    /**
     * Update one Survey.
     * @param {SurveyUpdateArgs} args - Arguments to update one Survey.
     * @example
     * // Update one Survey
     * const survey = await prisma.survey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SurveyUpdateArgs>(
      args: SelectSubset<T, SurveyUpdateArgs>
    ): CheckSelect<T, Prisma__SurveyClient<Survey>, Prisma__SurveyClient<SurveyGetPayload<T>>>

    /**
     * Delete zero or more Surveys.
     * @param {SurveyDeleteManyArgs} args - Arguments to filter Surveys to delete.
     * @example
     * // Delete a few Surveys
     * const { count } = await prisma.survey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SurveyDeleteManyArgs>(
      args?: SelectSubset<T, SurveyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Surveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Surveys
     * const survey = await prisma.survey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SurveyUpdateManyArgs>(
      args: SelectSubset<T, SurveyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Survey.
     * @param {SurveyUpsertArgs} args - Arguments to update or create a Survey.
     * @example
     * // Update or create a Survey
     * const survey = await prisma.survey.upsert({
     *   create: {
     *     // ... data to create a Survey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Survey we want to update
     *   }
     * })
    **/
    upsert<T extends SurveyUpsertArgs>(
      args: SelectSubset<T, SurveyUpsertArgs>
    ): CheckSelect<T, Prisma__SurveyClient<Survey>, Prisma__SurveyClient<SurveyGetPayload<T>>>

    /**
     * Count the number of Surveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCountArgs} args - Arguments to filter Surveys to count.
     * @example
     * // Count the number of Surveys
     * const count = await prisma.survey.count({
     *   where: {
     *     // ... the filter for the Surveys we want to count
     *   }
     * })
    **/
    count<T extends SurveyCountArgs>(
      args?: Subset<T, SurveyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Survey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyAggregateArgs>(args: Subset<T, SurveyAggregateArgs>): PrismaPromise<GetSurveyAggregateType<T>>

    /**
     * Group by Survey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyGroupByArgs['orderBy'] }
        : { orderBy?: SurveyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Survey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SurveyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    course<T extends CourseArgs = {}>(args?: Subset<T, CourseArgs>): CheckSelect<T, Prisma__CourseClient<Course | null >, Prisma__CourseClient<CourseGetPayload<T> | null >>;

    instance<T extends CourseInstanceArgs = {}>(args?: Subset<T, CourseInstanceArgs>): CheckSelect<T, Prisma__CourseInstanceClient<CourseInstance | null >, Prisma__CourseInstanceClient<CourseInstanceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Survey findUnique
   */
  export type SurveyFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * Throw an Error if a Survey can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Survey to fetch.
     * 
    **/
    where: SurveyWhereUniqueInput
  }


  /**
   * Survey findFirst
   */
  export type SurveyFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * Throw an Error if a Survey can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Survey to fetch.
     * 
    **/
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     * 
    **/
    orderBy?: Enumerable<SurveyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Surveys.
     * 
    **/
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Surveys.
     * 
    **/
    distinct?: Enumerable<SurveyScalarFieldEnum>
  }


  /**
   * Survey findMany
   */
  export type SurveyFindManyArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * Filter, which Surveys to fetch.
     * 
    **/
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     * 
    **/
    orderBy?: Enumerable<SurveyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Surveys.
     * 
    **/
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SurveyScalarFieldEnum>
  }


  /**
   * Survey create
   */
  export type SurveyCreateArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * The data needed to create a Survey.
     * 
    **/
    data: XOR<SurveyCreateInput, SurveyUncheckedCreateInput>
  }


  /**
   * Survey createMany
   */
  export type SurveyCreateManyArgs = {
    data: Enumerable<SurveyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Survey update
   */
  export type SurveyUpdateArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * The data needed to update a Survey.
     * 
    **/
    data: XOR<SurveyUpdateInput, SurveyUncheckedUpdateInput>
    /**
     * Choose, which Survey to update.
     * 
    **/
    where: SurveyWhereUniqueInput
  }


  /**
   * Survey updateMany
   */
  export type SurveyUpdateManyArgs = {
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyInput>
    where?: SurveyWhereInput
  }


  /**
   * Survey upsert
   */
  export type SurveyUpsertArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * The filter to search for the Survey to update in case it exists.
     * 
    **/
    where: SurveyWhereUniqueInput
    /**
     * In case the Survey found by the `where` argument doesn't exist, create a new Survey with this data.
     * 
    **/
    create: XOR<SurveyCreateInput, SurveyUncheckedCreateInput>
    /**
     * In case the Survey was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SurveyUpdateInput, SurveyUncheckedUpdateInput>
  }


  /**
   * Survey delete
   */
  export type SurveyDeleteArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
    /**
     * Filter which Survey to delete.
     * 
    **/
    where: SurveyWhereUniqueInput
  }


  /**
   * Survey deleteMany
   */
  export type SurveyDeleteManyArgs = {
    where?: SurveyWhereInput
  }


  /**
   * Survey without action
   */
  export type SurveyArgs = {
    /**
     * Select specific fields to fetch from the Survey
     * 
    **/
    select?: SurveySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SurveyInclude | null
  }



  /**
   * Model Department
   */


  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    id: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    id: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: number | null
    name_sv: string | null
    name_en: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: number | null
    name_sv: string | null
    name_en: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name_sv: number
    name_en: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    id?: true
  }

  export type DepartmentSumAggregateInputType = {
    id?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    name_sv?: true
    name_en?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name_sv?: true
    name_en?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name_sv?: true
    name_en?: true
    _all?: true
  }

  export type DepartmentAggregateArgs = {
    /**
     * Filter which Department to aggregate.
     * 
    **/
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     * 
    **/
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs = {
    where?: DepartmentWhereInput
    orderBy?: Enumerable<DepartmentOrderByWithAggregationInput>
    by: Array<DepartmentScalarFieldEnum>
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }


  export type DepartmentGroupByOutputType = {
    id: number
    name_sv: string
    name_en: string
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Promise<
    Array<
      PickArray<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect = {
    id?: boolean
    name_sv?: boolean
    name_en?: boolean
    Course?: boolean | CourseFindManyArgs
    _count?: boolean | DepartmentCountOutputTypeArgs
  }

  export type DepartmentInclude = {
    Course?: boolean | CourseFindManyArgs
    _count?: boolean | DepartmentCountOutputTypeArgs
  }

  export type DepartmentGetPayload<
    S extends boolean | null | undefined | DepartmentArgs,
    U = keyof S
      > = S extends true
        ? Department
    : S extends undefined
    ? never
    : S extends DepartmentArgs | DepartmentFindManyArgs
    ?'include' extends U
    ? Department  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Course'
        ? Array < CourseGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? DepartmentCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Department ?Department [P]
  : 
          P extends 'Course'
        ? Array < CourseGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? DepartmentCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Department
  : Department


  type DepartmentCountArgs = Merge<
    Omit<DepartmentFindManyArgs, 'select' | 'include'> & {
      select?: DepartmentCountAggregateInputType | true
    }
  >

  export interface DepartmentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DepartmentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DepartmentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Department'> extends True ? CheckSelect<T, Prisma__DepartmentClient<Department>, Prisma__DepartmentClient<DepartmentGetPayload<T>>> : CheckSelect<T, Prisma__DepartmentClient<Department | null >, Prisma__DepartmentClient<DepartmentGetPayload<T> | null >>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DepartmentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DepartmentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Department'> extends True ? CheckSelect<T, Prisma__DepartmentClient<Department>, Prisma__DepartmentClient<DepartmentGetPayload<T>>> : CheckSelect<T, Prisma__DepartmentClient<Department | null >, Prisma__DepartmentClient<DepartmentGetPayload<T> | null >>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DepartmentFindManyArgs>(
      args?: SelectSubset<T, DepartmentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Department>>, PrismaPromise<Array<DepartmentGetPayload<T>>>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
    **/
    create<T extends DepartmentCreateArgs>(
      args: SelectSubset<T, DepartmentCreateArgs>
    ): CheckSelect<T, Prisma__DepartmentClient<Department>, Prisma__DepartmentClient<DepartmentGetPayload<T>>>

    /**
     * Create many Departments.
     *     @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     *     @example
     *     // Create many Departments
     *     const department = await prisma.department.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DepartmentCreateManyArgs>(
      args?: SelectSubset<T, DepartmentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
    **/
    delete<T extends DepartmentDeleteArgs>(
      args: SelectSubset<T, DepartmentDeleteArgs>
    ): CheckSelect<T, Prisma__DepartmentClient<Department>, Prisma__DepartmentClient<DepartmentGetPayload<T>>>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DepartmentUpdateArgs>(
      args: SelectSubset<T, DepartmentUpdateArgs>
    ): CheckSelect<T, Prisma__DepartmentClient<Department>, Prisma__DepartmentClient<DepartmentGetPayload<T>>>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DepartmentDeleteManyArgs>(
      args?: SelectSubset<T, DepartmentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DepartmentUpdateManyArgs>(
      args: SelectSubset<T, DepartmentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
    **/
    upsert<T extends DepartmentUpsertArgs>(
      args: SelectSubset<T, DepartmentUpsertArgs>
    ): CheckSelect<T, Prisma__DepartmentClient<Department>, Prisma__DepartmentClient<DepartmentGetPayload<T>>>

    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DepartmentClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Course<T extends CourseFindManyArgs = {}>(args?: Subset<T, CourseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Course>>, PrismaPromise<Array<CourseGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * Throw an Error if a Department can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Department to fetch.
     * 
    **/
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * Throw an Error if a Department can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Department to fetch.
     * 
    **/
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     * 
    **/
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     * 
    **/
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     * 
    **/
    distinct?: Enumerable<DepartmentScalarFieldEnum>
  }


  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * Filter, which Departments to fetch.
     * 
    **/
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     * 
    **/
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     * 
    **/
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DepartmentScalarFieldEnum>
  }


  /**
   * Department create
   */
  export type DepartmentCreateArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * The data needed to create a Department.
     * 
    **/
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }


  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs = {
    data: Enumerable<DepartmentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Department update
   */
  export type DepartmentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * The data needed to update a Department.
     * 
    **/
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     * 
    **/
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs = {
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    where?: DepartmentWhereInput
  }


  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * The filter to search for the Department to update in case it exists.
     * 
    **/
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     * 
    **/
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }


  /**
   * Department delete
   */
  export type DepartmentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
    /**
     * Filter which Department to delete.
     * 
    **/
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs = {
    where?: DepartmentWhereInput
  }


  /**
   * Department without action
   */
  export type DepartmentArgs = {
    /**
     * Select specific fields to fetch from the Department
     * 
    **/
    select?: DepartmentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DepartmentInclude | null
  }



  /**
   * Model Programme
   */


  export type AggregateProgramme = {
    _count: ProgrammeCountAggregateOutputType | null
    _min: ProgrammeMinAggregateOutputType | null
    _max: ProgrammeMaxAggregateOutputType | null
  }

  export type ProgrammeMinAggregateOutputType = {
    code: string | null
    name_sv: string | null
    name_en: string | null
    active: boolean | null
  }

  export type ProgrammeMaxAggregateOutputType = {
    code: string | null
    name_sv: string | null
    name_en: string | null
    active: boolean | null
  }

  export type ProgrammeCountAggregateOutputType = {
    code: number
    name_sv: number
    name_en: number
    active: number
    _all: number
  }


  export type ProgrammeMinAggregateInputType = {
    code?: true
    name_sv?: true
    name_en?: true
    active?: true
  }

  export type ProgrammeMaxAggregateInputType = {
    code?: true
    name_sv?: true
    name_en?: true
    active?: true
  }

  export type ProgrammeCountAggregateInputType = {
    code?: true
    name_sv?: true
    name_en?: true
    active?: true
    _all?: true
  }

  export type ProgrammeAggregateArgs = {
    /**
     * Filter which Programme to aggregate.
     * 
    **/
    where?: ProgrammeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programmes to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProgrammeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programmes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programmes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programmes
    **/
    _count?: true | ProgrammeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgrammeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgrammeMaxAggregateInputType
  }

  export type GetProgrammeAggregateType<T extends ProgrammeAggregateArgs> = {
        [P in keyof T & keyof AggregateProgramme]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgramme[P]>
      : GetScalarType<T[P], AggregateProgramme[P]>
  }




  export type ProgrammeGroupByArgs = {
    where?: ProgrammeWhereInput
    orderBy?: Enumerable<ProgrammeOrderByWithAggregationInput>
    by: Array<ProgrammeScalarFieldEnum>
    having?: ProgrammeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgrammeCountAggregateInputType | true
    _min?: ProgrammeMinAggregateInputType
    _max?: ProgrammeMaxAggregateInputType
  }


  export type ProgrammeGroupByOutputType = {
    code: string
    name_sv: string
    name_en: string
    active: boolean
    _count: ProgrammeCountAggregateOutputType | null
    _min: ProgrammeMinAggregateOutputType | null
    _max: ProgrammeMaxAggregateOutputType | null
  }

  type GetProgrammeGroupByPayload<T extends ProgrammeGroupByArgs> = Promise<
    Array<
      PickArray<ProgrammeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgrammeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgrammeGroupByOutputType[P]>
            : GetScalarType<T[P], ProgrammeGroupByOutputType[P]>
        }
      >
    >


  export type ProgrammeSelect = {
    code?: boolean
    name_sv?: boolean
    name_en?: boolean
    active?: boolean
    courses?: boolean | CourseFindManyArgs
    programme_plans?: boolean | ProgrammePlanEntryFindManyArgs
    _count?: boolean | ProgrammeCountOutputTypeArgs
  }

  export type ProgrammeInclude = {
    courses?: boolean | CourseFindManyArgs
    programme_plans?: boolean | ProgrammePlanEntryFindManyArgs
    _count?: boolean | ProgrammeCountOutputTypeArgs
  }

  export type ProgrammeGetPayload<
    S extends boolean | null | undefined | ProgrammeArgs,
    U = keyof S
      > = S extends true
        ? Programme
    : S extends undefined
    ? never
    : S extends ProgrammeArgs | ProgrammeFindManyArgs
    ?'include' extends U
    ? Programme  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'courses'
        ? Array < CourseGetPayload<S['include'][P]>>  :
        P extends 'programme_plans'
        ? Array < ProgrammePlanEntryGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? ProgrammeCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Programme ?Programme [P]
  : 
          P extends 'courses'
        ? Array < CourseGetPayload<S['select'][P]>>  :
        P extends 'programme_plans'
        ? Array < ProgrammePlanEntryGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? ProgrammeCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Programme
  : Programme


  type ProgrammeCountArgs = Merge<
    Omit<ProgrammeFindManyArgs, 'select' | 'include'> & {
      select?: ProgrammeCountAggregateInputType | true
    }
  >

  export interface ProgrammeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Programme that matches the filter.
     * @param {ProgrammeFindUniqueArgs} args - Arguments to find a Programme
     * @example
     * // Get one Programme
     * const programme = await prisma.programme.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProgrammeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProgrammeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Programme'> extends True ? CheckSelect<T, Prisma__ProgrammeClient<Programme>, Prisma__ProgrammeClient<ProgrammeGetPayload<T>>> : CheckSelect<T, Prisma__ProgrammeClient<Programme | null >, Prisma__ProgrammeClient<ProgrammeGetPayload<T> | null >>

    /**
     * Find the first Programme that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeFindFirstArgs} args - Arguments to find a Programme
     * @example
     * // Get one Programme
     * const programme = await prisma.programme.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProgrammeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProgrammeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Programme'> extends True ? CheckSelect<T, Prisma__ProgrammeClient<Programme>, Prisma__ProgrammeClient<ProgrammeGetPayload<T>>> : CheckSelect<T, Prisma__ProgrammeClient<Programme | null >, Prisma__ProgrammeClient<ProgrammeGetPayload<T> | null >>

    /**
     * Find zero or more Programmes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programmes
     * const programmes = await prisma.programme.findMany()
     * 
     * // Get first 10 Programmes
     * const programmes = await prisma.programme.findMany({ take: 10 })
     * 
     * // Only select the `code`
     * const programmeWithCodeOnly = await prisma.programme.findMany({ select: { code: true } })
     * 
    **/
    findMany<T extends ProgrammeFindManyArgs>(
      args?: SelectSubset<T, ProgrammeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Programme>>, PrismaPromise<Array<ProgrammeGetPayload<T>>>>

    /**
     * Create a Programme.
     * @param {ProgrammeCreateArgs} args - Arguments to create a Programme.
     * @example
     * // Create one Programme
     * const Programme = await prisma.programme.create({
     *   data: {
     *     // ... data to create a Programme
     *   }
     * })
     * 
    **/
    create<T extends ProgrammeCreateArgs>(
      args: SelectSubset<T, ProgrammeCreateArgs>
    ): CheckSelect<T, Prisma__ProgrammeClient<Programme>, Prisma__ProgrammeClient<ProgrammeGetPayload<T>>>

    /**
     * Create many Programmes.
     *     @param {ProgrammeCreateManyArgs} args - Arguments to create many Programmes.
     *     @example
     *     // Create many Programmes
     *     const programme = await prisma.programme.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProgrammeCreateManyArgs>(
      args?: SelectSubset<T, ProgrammeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Programme.
     * @param {ProgrammeDeleteArgs} args - Arguments to delete one Programme.
     * @example
     * // Delete one Programme
     * const Programme = await prisma.programme.delete({
     *   where: {
     *     // ... filter to delete one Programme
     *   }
     * })
     * 
    **/
    delete<T extends ProgrammeDeleteArgs>(
      args: SelectSubset<T, ProgrammeDeleteArgs>
    ): CheckSelect<T, Prisma__ProgrammeClient<Programme>, Prisma__ProgrammeClient<ProgrammeGetPayload<T>>>

    /**
     * Update one Programme.
     * @param {ProgrammeUpdateArgs} args - Arguments to update one Programme.
     * @example
     * // Update one Programme
     * const programme = await prisma.programme.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProgrammeUpdateArgs>(
      args: SelectSubset<T, ProgrammeUpdateArgs>
    ): CheckSelect<T, Prisma__ProgrammeClient<Programme>, Prisma__ProgrammeClient<ProgrammeGetPayload<T>>>

    /**
     * Delete zero or more Programmes.
     * @param {ProgrammeDeleteManyArgs} args - Arguments to filter Programmes to delete.
     * @example
     * // Delete a few Programmes
     * const { count } = await prisma.programme.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProgrammeDeleteManyArgs>(
      args?: SelectSubset<T, ProgrammeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programmes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programmes
     * const programme = await prisma.programme.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProgrammeUpdateManyArgs>(
      args: SelectSubset<T, ProgrammeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Programme.
     * @param {ProgrammeUpsertArgs} args - Arguments to update or create a Programme.
     * @example
     * // Update or create a Programme
     * const programme = await prisma.programme.upsert({
     *   create: {
     *     // ... data to create a Programme
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Programme we want to update
     *   }
     * })
    **/
    upsert<T extends ProgrammeUpsertArgs>(
      args: SelectSubset<T, ProgrammeUpsertArgs>
    ): CheckSelect<T, Prisma__ProgrammeClient<Programme>, Prisma__ProgrammeClient<ProgrammeGetPayload<T>>>

    /**
     * Count the number of Programmes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeCountArgs} args - Arguments to filter Programmes to count.
     * @example
     * // Count the number of Programmes
     * const count = await prisma.programme.count({
     *   where: {
     *     // ... the filter for the Programmes we want to count
     *   }
     * })
    **/
    count<T extends ProgrammeCountArgs>(
      args?: Subset<T, ProgrammeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgrammeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Programme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgrammeAggregateArgs>(args: Subset<T, ProgrammeAggregateArgs>): PrismaPromise<GetProgrammeAggregateType<T>>

    /**
     * Group by Programme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgrammeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgrammeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgrammeGroupByArgs['orderBy'] }
        : { orderBy?: ProgrammeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgrammeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgrammeGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Programme.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProgrammeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    courses<T extends CourseFindManyArgs = {}>(args?: Subset<T, CourseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Course>>, PrismaPromise<Array<CourseGetPayload<T>>>>;

    programme_plans<T extends ProgrammePlanEntryFindManyArgs = {}>(args?: Subset<T, ProgrammePlanEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProgrammePlanEntry>>, PrismaPromise<Array<ProgrammePlanEntryGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Programme findUnique
   */
  export type ProgrammeFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * Throw an Error if a Programme can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Programme to fetch.
     * 
    **/
    where: ProgrammeWhereUniqueInput
  }


  /**
   * Programme findFirst
   */
  export type ProgrammeFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * Throw an Error if a Programme can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Programme to fetch.
     * 
    **/
    where?: ProgrammeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programmes to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programmes.
     * 
    **/
    cursor?: ProgrammeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programmes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programmes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programmes.
     * 
    **/
    distinct?: Enumerable<ProgrammeScalarFieldEnum>
  }


  /**
   * Programme findMany
   */
  export type ProgrammeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * Filter, which Programmes to fetch.
     * 
    **/
    where?: ProgrammeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programmes to fetch.
     * 
    **/
    orderBy?: Enumerable<ProgrammeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programmes.
     * 
    **/
    cursor?: ProgrammeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programmes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programmes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProgrammeScalarFieldEnum>
  }


  /**
   * Programme create
   */
  export type ProgrammeCreateArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * The data needed to create a Programme.
     * 
    **/
    data: XOR<ProgrammeCreateInput, ProgrammeUncheckedCreateInput>
  }


  /**
   * Programme createMany
   */
  export type ProgrammeCreateManyArgs = {
    data: Enumerable<ProgrammeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Programme update
   */
  export type ProgrammeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * The data needed to update a Programme.
     * 
    **/
    data: XOR<ProgrammeUpdateInput, ProgrammeUncheckedUpdateInput>
    /**
     * Choose, which Programme to update.
     * 
    **/
    where: ProgrammeWhereUniqueInput
  }


  /**
   * Programme updateMany
   */
  export type ProgrammeUpdateManyArgs = {
    data: XOR<ProgrammeUpdateManyMutationInput, ProgrammeUncheckedUpdateManyInput>
    where?: ProgrammeWhereInput
  }


  /**
   * Programme upsert
   */
  export type ProgrammeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * The filter to search for the Programme to update in case it exists.
     * 
    **/
    where: ProgrammeWhereUniqueInput
    /**
     * In case the Programme found by the `where` argument doesn't exist, create a new Programme with this data.
     * 
    **/
    create: XOR<ProgrammeCreateInput, ProgrammeUncheckedCreateInput>
    /**
     * In case the Programme was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProgrammeUpdateInput, ProgrammeUncheckedUpdateInput>
  }


  /**
   * Programme delete
   */
  export type ProgrammeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
    /**
     * Filter which Programme to delete.
     * 
    **/
    where: ProgrammeWhereUniqueInput
  }


  /**
   * Programme deleteMany
   */
  export type ProgrammeDeleteManyArgs = {
    where?: ProgrammeWhereInput
  }


  /**
   * Programme without action
   */
  export type ProgrammeArgs = {
    /**
     * Select specific fields to fetch from the Programme
     * 
    **/
    select?: ProgrammeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProgrammeInclude | null
  }



  /**
   * Model Alerts
   */


  export type AggregateAlerts = {
    _count: AlertsCountAggregateOutputType | null
    _avg: AlertsAvgAggregateOutputType | null
    _sum: AlertsSumAggregateOutputType | null
    _min: AlertsMinAggregateOutputType | null
    _max: AlertsMaxAggregateOutputType | null
  }

  export type AlertsAvgAggregateOutputType = {
    id: number | null
  }

  export type AlertsSumAggregateOutputType = {
    id: number | null
  }

  export type AlertsMinAggregateOutputType = {
    id: number | null
    start: Date | null
    end: Date | null
    message: string | null
    color: string | null
  }

  export type AlertsMaxAggregateOutputType = {
    id: number | null
    start: Date | null
    end: Date | null
    message: string | null
    color: string | null
  }

  export type AlertsCountAggregateOutputType = {
    id: number
    start: number
    end: number
    message: number
    color: number
    _all: number
  }


  export type AlertsAvgAggregateInputType = {
    id?: true
  }

  export type AlertsSumAggregateInputType = {
    id?: true
  }

  export type AlertsMinAggregateInputType = {
    id?: true
    start?: true
    end?: true
    message?: true
    color?: true
  }

  export type AlertsMaxAggregateInputType = {
    id?: true
    start?: true
    end?: true
    message?: true
    color?: true
  }

  export type AlertsCountAggregateInputType = {
    id?: true
    start?: true
    end?: true
    message?: true
    color?: true
    _all?: true
  }

  export type AlertsAggregateArgs = {
    /**
     * Filter which Alerts to aggregate.
     * 
    **/
    where?: AlertsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     * 
    **/
    orderBy?: Enumerable<AlertsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AlertsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertsMaxAggregateInputType
  }

  export type GetAlertsAggregateType<T extends AlertsAggregateArgs> = {
        [P in keyof T & keyof AggregateAlerts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlerts[P]>
      : GetScalarType<T[P], AggregateAlerts[P]>
  }




  export type AlertsGroupByArgs = {
    where?: AlertsWhereInput
    orderBy?: Enumerable<AlertsOrderByWithAggregationInput>
    by: Array<AlertsScalarFieldEnum>
    having?: AlertsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertsCountAggregateInputType | true
    _avg?: AlertsAvgAggregateInputType
    _sum?: AlertsSumAggregateInputType
    _min?: AlertsMinAggregateInputType
    _max?: AlertsMaxAggregateInputType
  }


  export type AlertsGroupByOutputType = {
    id: number
    start: Date
    end: Date
    message: string
    color: string
    _count: AlertsCountAggregateOutputType | null
    _avg: AlertsAvgAggregateOutputType | null
    _sum: AlertsSumAggregateOutputType | null
    _min: AlertsMinAggregateOutputType | null
    _max: AlertsMaxAggregateOutputType | null
  }

  type GetAlertsGroupByPayload<T extends AlertsGroupByArgs> = Promise<
    Array<
      PickArray<AlertsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertsGroupByOutputType[P]>
            : GetScalarType<T[P], AlertsGroupByOutputType[P]>
        }
      >
    >


  export type AlertsSelect = {
    id?: boolean
    start?: boolean
    end?: boolean
    message?: boolean
    color?: boolean
  }

  export type AlertsGetPayload<
    S extends boolean | null | undefined | AlertsArgs,
    U = keyof S
      > = S extends true
        ? Alerts
    : S extends undefined
    ? never
    : S extends AlertsArgs | AlertsFindManyArgs
    ?'include' extends U
    ? Alerts 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Alerts ?Alerts [P]
  : 
     never
  } 
    : Alerts
  : Alerts


  type AlertsCountArgs = Merge<
    Omit<AlertsFindManyArgs, 'select' | 'include'> & {
      select?: AlertsCountAggregateInputType | true
    }
  >

  export interface AlertsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Alerts that matches the filter.
     * @param {AlertsFindUniqueArgs} args - Arguments to find a Alerts
     * @example
     * // Get one Alerts
     * const alerts = await prisma.alerts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AlertsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AlertsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Alerts'> extends True ? CheckSelect<T, Prisma__AlertsClient<Alerts>, Prisma__AlertsClient<AlertsGetPayload<T>>> : CheckSelect<T, Prisma__AlertsClient<Alerts | null >, Prisma__AlertsClient<AlertsGetPayload<T> | null >>

    /**
     * Find the first Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertsFindFirstArgs} args - Arguments to find a Alerts
     * @example
     * // Get one Alerts
     * const alerts = await prisma.alerts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AlertsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AlertsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Alerts'> extends True ? CheckSelect<T, Prisma__AlertsClient<Alerts>, Prisma__AlertsClient<AlertsGetPayload<T>>> : CheckSelect<T, Prisma__AlertsClient<Alerts | null >, Prisma__AlertsClient<AlertsGetPayload<T> | null >>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alerts.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alerts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertsWithIdOnly = await prisma.alerts.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AlertsFindManyArgs>(
      args?: SelectSubset<T, AlertsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Alerts>>, PrismaPromise<Array<AlertsGetPayload<T>>>>

    /**
     * Create a Alerts.
     * @param {AlertsCreateArgs} args - Arguments to create a Alerts.
     * @example
     * // Create one Alerts
     * const Alerts = await prisma.alerts.create({
     *   data: {
     *     // ... data to create a Alerts
     *   }
     * })
     * 
    **/
    create<T extends AlertsCreateArgs>(
      args: SelectSubset<T, AlertsCreateArgs>
    ): CheckSelect<T, Prisma__AlertsClient<Alerts>, Prisma__AlertsClient<AlertsGetPayload<T>>>

    /**
     * Create many Alerts.
     *     @param {AlertsCreateManyArgs} args - Arguments to create many Alerts.
     *     @example
     *     // Create many Alerts
     *     const alerts = await prisma.alerts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AlertsCreateManyArgs>(
      args?: SelectSubset<T, AlertsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Alerts.
     * @param {AlertsDeleteArgs} args - Arguments to delete one Alerts.
     * @example
     * // Delete one Alerts
     * const Alerts = await prisma.alerts.delete({
     *   where: {
     *     // ... filter to delete one Alerts
     *   }
     * })
     * 
    **/
    delete<T extends AlertsDeleteArgs>(
      args: SelectSubset<T, AlertsDeleteArgs>
    ): CheckSelect<T, Prisma__AlertsClient<Alerts>, Prisma__AlertsClient<AlertsGetPayload<T>>>

    /**
     * Update one Alerts.
     * @param {AlertsUpdateArgs} args - Arguments to update one Alerts.
     * @example
     * // Update one Alerts
     * const alerts = await prisma.alerts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AlertsUpdateArgs>(
      args: SelectSubset<T, AlertsUpdateArgs>
    ): CheckSelect<T, Prisma__AlertsClient<Alerts>, Prisma__AlertsClient<AlertsGetPayload<T>>>

    /**
     * Delete zero or more Alerts.
     * @param {AlertsDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alerts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AlertsDeleteManyArgs>(
      args?: SelectSubset<T, AlertsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alerts = await prisma.alerts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AlertsUpdateManyArgs>(
      args: SelectSubset<T, AlertsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Alerts.
     * @param {AlertsUpsertArgs} args - Arguments to update or create a Alerts.
     * @example
     * // Update or create a Alerts
     * const alerts = await prisma.alerts.upsert({
     *   create: {
     *     // ... data to create a Alerts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alerts we want to update
     *   }
     * })
    **/
    upsert<T extends AlertsUpsertArgs>(
      args: SelectSubset<T, AlertsUpsertArgs>
    ): CheckSelect<T, Prisma__AlertsClient<Alerts>, Prisma__AlertsClient<AlertsGetPayload<T>>>

    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertsCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alerts.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertsCountArgs>(
      args?: Subset<T, AlertsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertsAggregateArgs>(args: Subset<T, AlertsAggregateArgs>): PrismaPromise<GetAlertsAggregateType<T>>

    /**
     * Group by Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertsGroupByArgs['orderBy'] }
        : { orderBy?: AlertsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alerts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AlertsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Alerts findUnique
   */
  export type AlertsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * Throw an Error if a Alerts can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Alerts to fetch.
     * 
    **/
    where: AlertsWhereUniqueInput
  }


  /**
   * Alerts findFirst
   */
  export type AlertsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * Throw an Error if a Alerts can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Alerts to fetch.
     * 
    **/
    where?: AlertsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     * 
    **/
    orderBy?: Enumerable<AlertsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     * 
    **/
    cursor?: AlertsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     * 
    **/
    distinct?: Enumerable<AlertsScalarFieldEnum>
  }


  /**
   * Alerts findMany
   */
  export type AlertsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * Filter, which Alerts to fetch.
     * 
    **/
    where?: AlertsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     * 
    **/
    orderBy?: Enumerable<AlertsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     * 
    **/
    cursor?: AlertsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AlertsScalarFieldEnum>
  }


  /**
   * Alerts create
   */
  export type AlertsCreateArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * The data needed to create a Alerts.
     * 
    **/
    data: XOR<AlertsCreateInput, AlertsUncheckedCreateInput>
  }


  /**
   * Alerts createMany
   */
  export type AlertsCreateManyArgs = {
    data: Enumerable<AlertsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Alerts update
   */
  export type AlertsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * The data needed to update a Alerts.
     * 
    **/
    data: XOR<AlertsUpdateInput, AlertsUncheckedUpdateInput>
    /**
     * Choose, which Alerts to update.
     * 
    **/
    where: AlertsWhereUniqueInput
  }


  /**
   * Alerts updateMany
   */
  export type AlertsUpdateManyArgs = {
    data: XOR<AlertsUpdateManyMutationInput, AlertsUncheckedUpdateManyInput>
    where?: AlertsWhereInput
  }


  /**
   * Alerts upsert
   */
  export type AlertsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * The filter to search for the Alerts to update in case it exists.
     * 
    **/
    where: AlertsWhereUniqueInput
    /**
     * In case the Alerts found by the `where` argument doesn't exist, create a new Alerts with this data.
     * 
    **/
    create: XOR<AlertsCreateInput, AlertsUncheckedCreateInput>
    /**
     * In case the Alerts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AlertsUpdateInput, AlertsUncheckedUpdateInput>
  }


  /**
   * Alerts delete
   */
  export type AlertsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
    /**
     * Filter which Alerts to delete.
     * 
    **/
    where: AlertsWhereUniqueInput
  }


  /**
   * Alerts deleteMany
   */
  export type AlertsDeleteManyArgs = {
    where?: AlertsWhereInput
  }


  /**
   * Alerts without action
   */
  export type AlertsArgs = {
    /**
     * Select specific fields to fetch from the Alerts
     * 
    **/
    select?: AlertsSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CourseScalarFieldEnum: {
    course_code: 'course_code',
    owner_code: 'owner_code',
    name_sv: 'name_sv',
    name_en: 'name_en',
    department_id: 'department_id'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const CourseInstanceScalarFieldEnum: {
    course_code: 'course_code',
    study_portal_id: 'study_portal_id',
    academic_year: 'academic_year',
    start_period: 'start_period',
    end_period: 'end_period',
    language: 'language',
    examiner_cid: 'examiner_cid'
  };

  export type CourseInstanceScalarFieldEnum = (typeof CourseInstanceScalarFieldEnum)[keyof typeof CourseInstanceScalarFieldEnum]


  export const CourseModuleScalarFieldEnum: {
    course_instance_id: 'course_instance_id',
    module_id: 'module_id',
    kind: 'kind',
    points: 'points',
    start_period: 'start_period',
    end_period: 'end_period'
  };

  export type CourseModuleScalarFieldEnum = (typeof CourseModuleScalarFieldEnum)[keyof typeof CourseModuleScalarFieldEnum]


  export const ModuleResultScalarFieldEnum: {
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
  };

  export type ModuleResultScalarFieldEnum = (typeof ModuleResultScalarFieldEnum)[keyof typeof ModuleResultScalarFieldEnum]


  export const ModuleDatesScalarFieldEnum: {
    course_instance_id: 'course_instance_id',
    module_id: 'module_id',
    primary_date: 'primary_date',
    secondary_date: 'secondary_date',
    tertiary_date: 'tertiary_date'
  };

  export type ModuleDatesScalarFieldEnum = (typeof ModuleDatesScalarFieldEnum)[keyof typeof ModuleDatesScalarFieldEnum]


  export const ProgrammeInstanceScalarFieldEnum: {
    instance_id: 'instance_id',
    programme_code: 'programme_code',
    admission_year: 'admission_year'
  };

  export type ProgrammeInstanceScalarFieldEnum = (typeof ProgrammeInstanceScalarFieldEnum)[keyof typeof ProgrammeInstanceScalarFieldEnum]


  export const ProgrammePlanEntryScalarFieldEnum: {
    programme_code: 'programme_code',
    programme_instance_id: 'programme_instance_id',
    course_code: 'course_code',
    course_instance_id: 'course_instance_id',
    grade: 'grade',
    electivity: 'electivity'
  };

  export type ProgrammePlanEntryScalarFieldEnum = (typeof ProgrammePlanEntryScalarFieldEnum)[keyof typeof ProgrammePlanEntryScalarFieldEnum]


  export const ExaminerScalarFieldEnum: {
    cid: 'cid',
    name: 'name'
  };

  export type ExaminerScalarFieldEnum = (typeof ExaminerScalarFieldEnum)[keyof typeof ExaminerScalarFieldEnum]


  export const ExamScalarFieldEnum: {
    course_code: 'course_code',
    date: 'date',
    academic_year: 'academic_year',
    failed: 'failed',
    three: 'three',
    four: 'four',
    five: 'five',
    thesis_id: 'thesis_id',
    solution_id: 'solution_id'
  };

  export type ExamScalarFieldEnum = (typeof ExamScalarFieldEnum)[keyof typeof ExamScalarFieldEnum]


  export const ExamThesisScalarFieldEnum: {
    id: 'id',
    filetype: 'filetype',
    verified: 'verified',
    includes_solution: 'includes_solution',
    uploader_id: 'uploader_id',
    uploader: 'uploader',
    uploaded: 'uploaded'
  };

  export type ExamThesisScalarFieldEnum = (typeof ExamThesisScalarFieldEnum)[keyof typeof ExamThesisScalarFieldEnum]


  export const ExamSolutionScalarFieldEnum: {
    id: 'id',
    filetype: 'filetype',
    verified: 'verified',
    uploader_id: 'uploader_id',
    uploader: 'uploader',
    uploaded: 'uploaded'
  };

  export type ExamSolutionScalarFieldEnum = (typeof ExamSolutionScalarFieldEnum)[keyof typeof ExamSolutionScalarFieldEnum]


  export const ExamAttachmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    filetype: 'filetype',
    verified: 'verified',
    uploader: 'uploader',
    uploaded: 'uploaded',
    exam_course_code: 'exam_course_code',
    exam_date: 'exam_date'
  };

  export type ExamAttachmentScalarFieldEnum = (typeof ExamAttachmentScalarFieldEnum)[keyof typeof ExamAttachmentScalarFieldEnum]


  export const AlternativeExamScalarFieldEnum: {
    course_code: 'course_code',
    exam_code: 'exam_code',
    date: 'date',
    academic_year: 'academic_year',
    failed: 'failed',
    passed: 'passed'
  };

  export type AlternativeExamScalarFieldEnum = (typeof AlternativeExamScalarFieldEnum)[keyof typeof AlternativeExamScalarFieldEnum]


  export const PeriodScalarFieldEnum: {
    type: 'type',
    academic_year: 'academic_year',
    study_period: 'study_period',
    start: 'start',
    end: 'end'
  };

  export type PeriodScalarFieldEnum = (typeof PeriodScalarFieldEnum)[keyof typeof PeriodScalarFieldEnum]


  export const SurveyScalarFieldEnum: {
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
  };

  export type SurveyScalarFieldEnum = (typeof SurveyScalarFieldEnum)[keyof typeof SurveyScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name_sv: 'name_sv',
    name_en: 'name_en'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const ProgrammeScalarFieldEnum: {
    code: 'code',
    name_sv: 'name_sv',
    name_en: 'name_en',
    active: 'active'
  };

  export type ProgrammeScalarFieldEnum = (typeof ProgrammeScalarFieldEnum)[keyof typeof ProgrammeScalarFieldEnum]


  export const AlertsScalarFieldEnum: {
    id: 'id',
    start: 'start',
    end: 'end',
    message: 'message',
    color: 'color'
  };

  export type AlertsScalarFieldEnum = (typeof AlertsScalarFieldEnum)[keyof typeof AlertsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type CourseWhereInput = {
    AND?: Enumerable<CourseWhereInput>
    OR?: Enumerable<CourseWhereInput>
    NOT?: Enumerable<CourseWhereInput>
    course_code?: StringFilter | string
    owner_code?: StringFilter | string
    name_sv?: StringFilter | string
    name_en?: StringFilter | string
    exams?: ExamListRelationFilter
    owner?: XOR<ProgrammeRelationFilter, ProgrammeWhereInput>
    department_id?: IntNullableFilter | number | null
    department?: XOR<DepartmentRelationFilter, DepartmentWhereInput> | null
    instances?: CourseInstanceListRelationFilter
    surveys?: SurveyListRelationFilter
    programme_plan?: ProgrammePlanEntryListRelationFilter
    alternative_examinations?: AlternativeExamListRelationFilter
    ModuleResults?: ModuleResultListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    course_code?: SortOrder
    owner_code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    exams?: ExamOrderByRelationAggregateInput
    owner?: ProgrammeOrderByWithRelationInput
    department_id?: SortOrder
    department?: DepartmentOrderByWithRelationInput
    instances?: CourseInstanceOrderByRelationAggregateInput
    surveys?: SurveyOrderByRelationAggregateInput
    programme_plan?: ProgrammePlanEntryOrderByRelationAggregateInput
    alternative_examinations?: AlternativeExamOrderByRelationAggregateInput
    ModuleResults?: ModuleResultOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = {
    course_code?: string
  }

  export type CourseOrderByWithAggregationInput = {
    course_code?: SortOrder
    owner_code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    department_id?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CourseScalarWhereWithAggregatesInput>
    OR?: Enumerable<CourseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CourseScalarWhereWithAggregatesInput>
    course_code?: StringWithAggregatesFilter | string
    owner_code?: StringWithAggregatesFilter | string
    name_sv?: StringWithAggregatesFilter | string
    name_en?: StringWithAggregatesFilter | string
    department_id?: IntNullableWithAggregatesFilter | number | null
  }

  export type CourseInstanceWhereInput = {
    AND?: Enumerable<CourseInstanceWhereInput>
    OR?: Enumerable<CourseInstanceWhereInput>
    NOT?: Enumerable<CourseInstanceWhereInput>
    course_code?: StringFilter | string
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    study_portal_id?: StringFilter | string
    academic_year?: StringFilter | string
    start_period?: IntFilter | number
    end_period?: IntFilter | number
    language?: StringFilter | string
    examiner_cid?: StringFilter | string
    examiner?: XOR<ExaminerRelationFilter, ExaminerWhereInput>
    survey?: XOR<SurveyRelationFilter, SurveyWhereInput> | null
    programme_plan_entries?: ProgrammePlanEntryListRelationFilter
    modules?: CourseModuleListRelationFilter
  }

  export type CourseInstanceOrderByWithRelationInput = {
    course_code?: SortOrder
    course?: CourseOrderByWithRelationInput
    study_portal_id?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    examiner_cid?: SortOrder
    examiner?: ExaminerOrderByWithRelationInput
    survey?: SurveyOrderByWithRelationInput
    programme_plan_entries?: ProgrammePlanEntryOrderByRelationAggregateInput
    modules?: CourseModuleOrderByRelationAggregateInput
  }

  export type CourseInstanceWhereUniqueInput = {
    study_portal_id?: string
    course_code_academic_year_start_period_end_period?: CourseInstanceCourse_codeAcademic_yearStart_periodEnd_periodCompoundUniqueInput
  }

  export type CourseInstanceOrderByWithAggregationInput = {
    course_code?: SortOrder
    study_portal_id?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    examiner_cid?: SortOrder
    _count?: CourseInstanceCountOrderByAggregateInput
    _avg?: CourseInstanceAvgOrderByAggregateInput
    _max?: CourseInstanceMaxOrderByAggregateInput
    _min?: CourseInstanceMinOrderByAggregateInput
    _sum?: CourseInstanceSumOrderByAggregateInput
  }

  export type CourseInstanceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CourseInstanceScalarWhereWithAggregatesInput>
    OR?: Enumerable<CourseInstanceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CourseInstanceScalarWhereWithAggregatesInput>
    course_code?: StringWithAggregatesFilter | string
    study_portal_id?: StringWithAggregatesFilter | string
    academic_year?: StringWithAggregatesFilter | string
    start_period?: IntWithAggregatesFilter | number
    end_period?: IntWithAggregatesFilter | number
    language?: StringWithAggregatesFilter | string
    examiner_cid?: StringWithAggregatesFilter | string
  }

  export type CourseModuleWhereInput = {
    AND?: Enumerable<CourseModuleWhereInput>
    OR?: Enumerable<CourseModuleWhereInput>
    NOT?: Enumerable<CourseModuleWhereInput>
    course_instance_id?: StringFilter | string
    module_id?: StringFilter | string
    kind?: StringFilter | string
    points?: IntFilter | number
    start_period?: IntFilter | number
    end_period?: IntFilter | number
    course_instance?: XOR<CourseInstanceRelationFilter, CourseInstanceWhereInput>
    dates?: XOR<ModuleDatesRelationFilter, ModuleDatesWhereInput> | null
  }

  export type CourseModuleOrderByWithRelationInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    kind?: SortOrder
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    course_instance?: CourseInstanceOrderByWithRelationInput
    dates?: ModuleDatesOrderByWithRelationInput
  }

  export type CourseModuleWhereUniqueInput = {
    course_instance_id_module_id?: CourseModuleCourse_instance_idModule_idCompoundUniqueInput
  }

  export type CourseModuleOrderByWithAggregationInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    kind?: SortOrder
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    _count?: CourseModuleCountOrderByAggregateInput
    _avg?: CourseModuleAvgOrderByAggregateInput
    _max?: CourseModuleMaxOrderByAggregateInput
    _min?: CourseModuleMinOrderByAggregateInput
    _sum?: CourseModuleSumOrderByAggregateInput
  }

  export type CourseModuleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CourseModuleScalarWhereWithAggregatesInput>
    OR?: Enumerable<CourseModuleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CourseModuleScalarWhereWithAggregatesInput>
    course_instance_id?: StringWithAggregatesFilter | string
    module_id?: StringWithAggregatesFilter | string
    kind?: StringWithAggregatesFilter | string
    points?: IntWithAggregatesFilter | number
    start_period?: IntWithAggregatesFilter | number
    end_period?: IntWithAggregatesFilter | number
  }

  export type ModuleResultWhereInput = {
    AND?: Enumerable<ModuleResultWhereInput>
    OR?: Enumerable<ModuleResultWhereInput>
    NOT?: Enumerable<ModuleResultWhereInput>
    course_code?: StringFilter | string
    date?: StringFilter | string
    academic_year?: StringFilter | string
    module_id?: StringFilter | string
    name?: StringFilter | string
    grading_system?: EnumGradingSystemFilter | GradingSystem
    points?: IntFilter | number
    failed?: IntFilter | number
    three?: IntFilter | number
    four?: IntFilter | number
    five?: IntFilter | number
    course?: XOR<CourseRelationFilter, CourseWhereInput>
  }

  export type ModuleResultOrderByWithRelationInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    module_id?: SortOrder
    name?: SortOrder
    grading_system?: SortOrder
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    course?: CourseOrderByWithRelationInput
  }

  export type ModuleResultWhereUniqueInput = {
    course_code_module_id_date?: ModuleResultCourse_codeModule_idDateCompoundUniqueInput
  }

  export type ModuleResultOrderByWithAggregationInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    module_id?: SortOrder
    name?: SortOrder
    grading_system?: SortOrder
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    _count?: ModuleResultCountOrderByAggregateInput
    _avg?: ModuleResultAvgOrderByAggregateInput
    _max?: ModuleResultMaxOrderByAggregateInput
    _min?: ModuleResultMinOrderByAggregateInput
    _sum?: ModuleResultSumOrderByAggregateInput
  }

  export type ModuleResultScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModuleResultScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModuleResultScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModuleResultScalarWhereWithAggregatesInput>
    course_code?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    academic_year?: StringWithAggregatesFilter | string
    module_id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    grading_system?: EnumGradingSystemWithAggregatesFilter | GradingSystem
    points?: IntWithAggregatesFilter | number
    failed?: IntWithAggregatesFilter | number
    three?: IntWithAggregatesFilter | number
    four?: IntWithAggregatesFilter | number
    five?: IntWithAggregatesFilter | number
  }

  export type ModuleDatesWhereInput = {
    AND?: Enumerable<ModuleDatesWhereInput>
    OR?: Enumerable<ModuleDatesWhereInput>
    NOT?: Enumerable<ModuleDatesWhereInput>
    course_instance_id?: StringFilter | string
    module_id?: StringFilter | string
    module?: XOR<CourseModuleRelationFilter, CourseModuleWhereInput>
    primary_date?: StringFilter | string
    secondary_date?: StringNullableFilter | string | null
    tertiary_date?: StringNullableFilter | string | null
  }

  export type ModuleDatesOrderByWithRelationInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    module?: CourseModuleOrderByWithRelationInput
    primary_date?: SortOrder
    secondary_date?: SortOrder
    tertiary_date?: SortOrder
  }

  export type ModuleDatesWhereUniqueInput = {
    course_instance_id_module_id?: ModuleDatesCourse_instance_idModule_idCompoundUniqueInput
  }

  export type ModuleDatesOrderByWithAggregationInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    primary_date?: SortOrder
    secondary_date?: SortOrder
    tertiary_date?: SortOrder
    _count?: ModuleDatesCountOrderByAggregateInput
    _max?: ModuleDatesMaxOrderByAggregateInput
    _min?: ModuleDatesMinOrderByAggregateInput
  }

  export type ModuleDatesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ModuleDatesScalarWhereWithAggregatesInput>
    OR?: Enumerable<ModuleDatesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ModuleDatesScalarWhereWithAggregatesInput>
    course_instance_id?: StringWithAggregatesFilter | string
    module_id?: StringWithAggregatesFilter | string
    primary_date?: StringWithAggregatesFilter | string
    secondary_date?: StringNullableWithAggregatesFilter | string | null
    tertiary_date?: StringNullableWithAggregatesFilter | string | null
  }

  export type ProgrammeInstanceWhereInput = {
    AND?: Enumerable<ProgrammeInstanceWhereInput>
    OR?: Enumerable<ProgrammeInstanceWhereInput>
    NOT?: Enumerable<ProgrammeInstanceWhereInput>
    instance_id?: StringFilter | string
    programme_code?: StringFilter | string
    admission_year?: StringFilter | string
    ProgrammePlanEntry?: ProgrammePlanEntryListRelationFilter
  }

  export type ProgrammeInstanceOrderByWithRelationInput = {
    instance_id?: SortOrder
    programme_code?: SortOrder
    admission_year?: SortOrder
    ProgrammePlanEntry?: ProgrammePlanEntryOrderByRelationAggregateInput
  }

  export type ProgrammeInstanceWhereUniqueInput = {
    instance_id?: string
  }

  export type ProgrammeInstanceOrderByWithAggregationInput = {
    instance_id?: SortOrder
    programme_code?: SortOrder
    admission_year?: SortOrder
    _count?: ProgrammeInstanceCountOrderByAggregateInput
    _max?: ProgrammeInstanceMaxOrderByAggregateInput
    _min?: ProgrammeInstanceMinOrderByAggregateInput
  }

  export type ProgrammeInstanceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProgrammeInstanceScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProgrammeInstanceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProgrammeInstanceScalarWhereWithAggregatesInput>
    instance_id?: StringWithAggregatesFilter | string
    programme_code?: StringWithAggregatesFilter | string
    admission_year?: StringWithAggregatesFilter | string
  }

  export type ProgrammePlanEntryWhereInput = {
    AND?: Enumerable<ProgrammePlanEntryWhereInput>
    OR?: Enumerable<ProgrammePlanEntryWhereInput>
    NOT?: Enumerable<ProgrammePlanEntryWhereInput>
    programme_code?: StringFilter | string
    programme_instance_id?: StringFilter | string
    course_code?: StringFilter | string
    course_instance_id?: StringFilter | string
    grade?: IntFilter | number
    electivity?: EnumElectivityFilter | Electivity
    programme?: XOR<ProgrammeRelationFilter, ProgrammeWhereInput>
    programme_instance?: XOR<ProgrammeInstanceRelationFilter, ProgrammeInstanceWhereInput>
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    course_instance?: XOR<CourseInstanceRelationFilter, CourseInstanceWhereInput>
  }

  export type ProgrammePlanEntryOrderByWithRelationInput = {
    programme_code?: SortOrder
    programme_instance_id?: SortOrder
    course_code?: SortOrder
    course_instance_id?: SortOrder
    grade?: SortOrder
    electivity?: SortOrder
    programme?: ProgrammeOrderByWithRelationInput
    programme_instance?: ProgrammeInstanceOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    course_instance?: CourseInstanceOrderByWithRelationInput
  }

  export type ProgrammePlanEntryWhereUniqueInput = {
    programme_instance_id_course_instance_id?: ProgrammePlanEntryProgramme_instance_idCourse_instance_idCompoundUniqueInput
  }

  export type ProgrammePlanEntryOrderByWithAggregationInput = {
    programme_code?: SortOrder
    programme_instance_id?: SortOrder
    course_code?: SortOrder
    course_instance_id?: SortOrder
    grade?: SortOrder
    electivity?: SortOrder
    _count?: ProgrammePlanEntryCountOrderByAggregateInput
    _avg?: ProgrammePlanEntryAvgOrderByAggregateInput
    _max?: ProgrammePlanEntryMaxOrderByAggregateInput
    _min?: ProgrammePlanEntryMinOrderByAggregateInput
    _sum?: ProgrammePlanEntrySumOrderByAggregateInput
  }

  export type ProgrammePlanEntryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProgrammePlanEntryScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProgrammePlanEntryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProgrammePlanEntryScalarWhereWithAggregatesInput>
    programme_code?: StringWithAggregatesFilter | string
    programme_instance_id?: StringWithAggregatesFilter | string
    course_code?: StringWithAggregatesFilter | string
    course_instance_id?: StringWithAggregatesFilter | string
    grade?: IntWithAggregatesFilter | number
    electivity?: EnumElectivityWithAggregatesFilter | Electivity
  }

  export type ExaminerWhereInput = {
    AND?: Enumerable<ExaminerWhereInput>
    OR?: Enumerable<ExaminerWhereInput>
    NOT?: Enumerable<ExaminerWhereInput>
    cid?: StringFilter | string
    name?: StringFilter | string
    CourseInstance?: CourseInstanceListRelationFilter
  }

  export type ExaminerOrderByWithRelationInput = {
    cid?: SortOrder
    name?: SortOrder
    CourseInstance?: CourseInstanceOrderByRelationAggregateInput
  }

  export type ExaminerWhereUniqueInput = {
    cid?: string
  }

  export type ExaminerOrderByWithAggregationInput = {
    cid?: SortOrder
    name?: SortOrder
    _count?: ExaminerCountOrderByAggregateInput
    _max?: ExaminerMaxOrderByAggregateInput
    _min?: ExaminerMinOrderByAggregateInput
  }

  export type ExaminerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExaminerScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExaminerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExaminerScalarWhereWithAggregatesInput>
    cid?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
  }

  export type ExamWhereInput = {
    AND?: Enumerable<ExamWhereInput>
    OR?: Enumerable<ExamWhereInput>
    NOT?: Enumerable<ExamWhereInput>
    course_code?: StringFilter | string
    date?: StringFilter | string
    academic_year?: StringFilter | string
    failed?: IntFilter | number
    three?: IntFilter | number
    four?: IntFilter | number
    five?: IntFilter | number
    thesis_id?: IntNullableFilter | number | null
    thesis?: XOR<ExamThesisRelationFilter, ExamThesisWhereInput> | null
    solution_id?: IntNullableFilter | number | null
    solution?: XOR<ExamSolutionRelationFilter, ExamSolutionWhereInput> | null
    attachments?: ExamAttachmentListRelationFilter
    course?: XOR<CourseRelationFilter, CourseWhereInput>
  }

  export type ExamOrderByWithRelationInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    thesis?: ExamThesisOrderByWithRelationInput
    solution_id?: SortOrder
    solution?: ExamSolutionOrderByWithRelationInput
    attachments?: ExamAttachmentOrderByRelationAggregateInput
    course?: CourseOrderByWithRelationInput
  }

  export type ExamWhereUniqueInput = {
    course_code_date?: ExamCourse_codeDateCompoundUniqueInput
  }

  export type ExamOrderByWithAggregationInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    solution_id?: SortOrder
    _count?: ExamCountOrderByAggregateInput
    _avg?: ExamAvgOrderByAggregateInput
    _max?: ExamMaxOrderByAggregateInput
    _min?: ExamMinOrderByAggregateInput
    _sum?: ExamSumOrderByAggregateInput
  }

  export type ExamScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExamScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExamScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExamScalarWhereWithAggregatesInput>
    course_code?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    academic_year?: StringWithAggregatesFilter | string
    failed?: IntWithAggregatesFilter | number
    three?: IntWithAggregatesFilter | number
    four?: IntWithAggregatesFilter | number
    five?: IntWithAggregatesFilter | number
    thesis_id?: IntNullableWithAggregatesFilter | number | null
    solution_id?: IntNullableWithAggregatesFilter | number | null
  }

  export type ExamThesisWhereInput = {
    AND?: Enumerable<ExamThesisWhereInput>
    OR?: Enumerable<ExamThesisWhereInput>
    NOT?: Enumerable<ExamThesisWhereInput>
    id?: IntFilter | number
    filetype?: StringFilter | string
    verified?: BoolFilter | boolean
    includes_solution?: BoolFilter | boolean
    exams?: ExamListRelationFilter
    uploader_id?: StringNullableFilter | string | null
    uploader?: StringNullableFilter | string | null
    uploaded?: DateTimeFilter | Date | string
  }

  export type ExamThesisOrderByWithRelationInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    includes_solution?: SortOrder
    exams?: ExamOrderByRelationAggregateInput
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamThesisWhereUniqueInput = {
    id?: number
  }

  export type ExamThesisOrderByWithAggregationInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    includes_solution?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    _count?: ExamThesisCountOrderByAggregateInput
    _avg?: ExamThesisAvgOrderByAggregateInput
    _max?: ExamThesisMaxOrderByAggregateInput
    _min?: ExamThesisMinOrderByAggregateInput
    _sum?: ExamThesisSumOrderByAggregateInput
  }

  export type ExamThesisScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExamThesisScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExamThesisScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExamThesisScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    filetype?: StringWithAggregatesFilter | string
    verified?: BoolWithAggregatesFilter | boolean
    includes_solution?: BoolWithAggregatesFilter | boolean
    uploader_id?: StringNullableWithAggregatesFilter | string | null
    uploader?: StringNullableWithAggregatesFilter | string | null
    uploaded?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ExamSolutionWhereInput = {
    AND?: Enumerable<ExamSolutionWhereInput>
    OR?: Enumerable<ExamSolutionWhereInput>
    NOT?: Enumerable<ExamSolutionWhereInput>
    id?: IntFilter | number
    filetype?: StringFilter | string
    verified?: BoolFilter | boolean
    exams?: ExamListRelationFilter
    uploader_id?: StringNullableFilter | string | null
    uploader?: StringNullableFilter | string | null
    uploaded?: DateTimeFilter | Date | string
  }

  export type ExamSolutionOrderByWithRelationInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    exams?: ExamOrderByRelationAggregateInput
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamSolutionWhereUniqueInput = {
    id?: number
  }

  export type ExamSolutionOrderByWithAggregationInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    _count?: ExamSolutionCountOrderByAggregateInput
    _avg?: ExamSolutionAvgOrderByAggregateInput
    _max?: ExamSolutionMaxOrderByAggregateInput
    _min?: ExamSolutionMinOrderByAggregateInput
    _sum?: ExamSolutionSumOrderByAggregateInput
  }

  export type ExamSolutionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExamSolutionScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExamSolutionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExamSolutionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    filetype?: StringWithAggregatesFilter | string
    verified?: BoolWithAggregatesFilter | boolean
    uploader_id?: StringNullableWithAggregatesFilter | string | null
    uploader?: StringNullableWithAggregatesFilter | string | null
    uploaded?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ExamAttachmentWhereInput = {
    AND?: Enumerable<ExamAttachmentWhereInput>
    OR?: Enumerable<ExamAttachmentWhereInput>
    NOT?: Enumerable<ExamAttachmentWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    filetype?: StringFilter | string
    verified?: BoolFilter | boolean
    uploader?: StringNullableFilter | string | null
    uploaded?: DateTimeFilter | Date | string
    exams?: XOR<ExamRelationFilter, ExamWhereInput>
    exam_course_code?: StringFilter | string
    exam_date?: StringFilter | string
  }

  export type ExamAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    exams?: ExamOrderByWithRelationInput
    exam_course_code?: SortOrder
    exam_date?: SortOrder
  }

  export type ExamAttachmentWhereUniqueInput = {
    id?: number
  }

  export type ExamAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    exam_course_code?: SortOrder
    exam_date?: SortOrder
    _count?: ExamAttachmentCountOrderByAggregateInput
    _avg?: ExamAttachmentAvgOrderByAggregateInput
    _max?: ExamAttachmentMaxOrderByAggregateInput
    _min?: ExamAttachmentMinOrderByAggregateInput
    _sum?: ExamAttachmentSumOrderByAggregateInput
  }

  export type ExamAttachmentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExamAttachmentScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExamAttachmentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExamAttachmentScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    filetype?: StringWithAggregatesFilter | string
    verified?: BoolWithAggregatesFilter | boolean
    uploader?: StringNullableWithAggregatesFilter | string | null
    uploaded?: DateTimeWithAggregatesFilter | Date | string
    exam_course_code?: StringWithAggregatesFilter | string
    exam_date?: StringWithAggregatesFilter | string
  }

  export type AlternativeExamWhereInput = {
    AND?: Enumerable<AlternativeExamWhereInput>
    OR?: Enumerable<AlternativeExamWhereInput>
    NOT?: Enumerable<AlternativeExamWhereInput>
    course_code?: StringFilter | string
    exam_code?: StringFilter | string
    date?: StringFilter | string
    academic_year?: StringFilter | string
    failed?: IntFilter | number
    passed?: IntFilter | number
    course?: XOR<CourseRelationFilter, CourseWhereInput>
  }

  export type AlternativeExamOrderByWithRelationInput = {
    course_code?: SortOrder
    exam_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    passed?: SortOrder
    course?: CourseOrderByWithRelationInput
  }

  export type AlternativeExamWhereUniqueInput = {
    course_code_exam_code_date?: AlternativeExamCourse_codeExam_codeDateCompoundUniqueInput
  }

  export type AlternativeExamOrderByWithAggregationInput = {
    course_code?: SortOrder
    exam_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    passed?: SortOrder
    _count?: AlternativeExamCountOrderByAggregateInput
    _avg?: AlternativeExamAvgOrderByAggregateInput
    _max?: AlternativeExamMaxOrderByAggregateInput
    _min?: AlternativeExamMinOrderByAggregateInput
    _sum?: AlternativeExamSumOrderByAggregateInput
  }

  export type AlternativeExamScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AlternativeExamScalarWhereWithAggregatesInput>
    OR?: Enumerable<AlternativeExamScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AlternativeExamScalarWhereWithAggregatesInput>
    course_code?: StringWithAggregatesFilter | string
    exam_code?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    academic_year?: StringWithAggregatesFilter | string
    failed?: IntWithAggregatesFilter | number
    passed?: IntWithAggregatesFilter | number
  }

  export type PeriodWhereInput = {
    AND?: Enumerable<PeriodWhereInput>
    OR?: Enumerable<PeriodWhereInput>
    NOT?: Enumerable<PeriodWhereInput>
    type?: StringFilter | string
    academic_year?: StringFilter | string
    study_period?: IntFilter | number
    start?: DateTimeFilter | Date | string
    end?: DateTimeFilter | Date | string
  }

  export type PeriodOrderByWithRelationInput = {
    type?: SortOrder
    academic_year?: SortOrder
    study_period?: SortOrder
    start?: SortOrder
    end?: SortOrder
  }

  export type PeriodWhereUniqueInput = {
    type_academic_year_study_period?: PeriodTypeAcademic_yearStudy_periodCompoundUniqueInput
  }

  export type PeriodOrderByWithAggregationInput = {
    type?: SortOrder
    academic_year?: SortOrder
    study_period?: SortOrder
    start?: SortOrder
    end?: SortOrder
    _count?: PeriodCountOrderByAggregateInput
    _avg?: PeriodAvgOrderByAggregateInput
    _max?: PeriodMaxOrderByAggregateInput
    _min?: PeriodMinOrderByAggregateInput
    _sum?: PeriodSumOrderByAggregateInput
  }

  export type PeriodScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PeriodScalarWhereWithAggregatesInput>
    OR?: Enumerable<PeriodScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PeriodScalarWhereWithAggregatesInput>
    type?: StringWithAggregatesFilter | string
    academic_year?: StringWithAggregatesFilter | string
    study_period?: IntWithAggregatesFilter | number
    start?: DateTimeWithAggregatesFilter | Date | string
    end?: DateTimeWithAggregatesFilter | Date | string
  }

  export type SurveyWhereInput = {
    AND?: Enumerable<SurveyWhereInput>
    OR?: Enumerable<SurveyWhereInput>
    NOT?: Enumerable<SurveyWhereInput>
    course_code?: StringFilter | string
    academic_year?: StringFilter | string
    start_period?: IntFilter | number
    end_period?: IntFilter | number
    language?: StringFilter | string
    respondents?: IntFilter | number
    responses?: IntFilter | number
    answer_frequency?: FloatFilter | number
    prerequisite_mean?: FloatFilter | number
    prerequisite_median?: FloatFilter | number
    goals_mean?: FloatFilter | number
    goals_median?: FloatFilter | number
    structure_mean?: FloatFilter | number
    structure_median?: FloatFilter | number
    teaching_mean?: FloatFilter | number
    teaching_median?: FloatFilter | number
    litterature_mean?: FloatFilter | number
    litterature_median?: FloatFilter | number
    assessment_mean?: FloatFilter | number
    assessment_median?: FloatFilter | number
    administration_mean?: FloatFilter | number
    administration_median?: FloatFilter | number
    workload_mean?: FloatFilter | number
    workload_median?: FloatFilter | number
    working_environment_mean?: FloatNullableFilter | number | null
    working_environment_median?: FloatNullableFilter | number | null
    total_impression_mean?: FloatFilter | number
    total_impression_median?: FloatFilter | number
    has_minutes?: BoolFilter | boolean
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    instance?: XOR<CourseInstanceRelationFilter, CourseInstanceWhereInput>
  }

  export type SurveyOrderByWithRelationInput = {
    course_code?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
    has_minutes?: SortOrder
    course?: CourseOrderByWithRelationInput
    instance?: CourseInstanceOrderByWithRelationInput
  }

  export type SurveyWhereUniqueInput = {
    course_code_academic_year_start_period_end_period?: SurveyCourse_codeAcademic_yearStart_periodEnd_periodCompoundUniqueInput
  }

  export type SurveyOrderByWithAggregationInput = {
    course_code?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
    has_minutes?: SortOrder
    _count?: SurveyCountOrderByAggregateInput
    _avg?: SurveyAvgOrderByAggregateInput
    _max?: SurveyMaxOrderByAggregateInput
    _min?: SurveyMinOrderByAggregateInput
    _sum?: SurveySumOrderByAggregateInput
  }

  export type SurveyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SurveyScalarWhereWithAggregatesInput>
    OR?: Enumerable<SurveyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SurveyScalarWhereWithAggregatesInput>
    course_code?: StringWithAggregatesFilter | string
    academic_year?: StringWithAggregatesFilter | string
    start_period?: IntWithAggregatesFilter | number
    end_period?: IntWithAggregatesFilter | number
    language?: StringWithAggregatesFilter | string
    respondents?: IntWithAggregatesFilter | number
    responses?: IntWithAggregatesFilter | number
    answer_frequency?: FloatWithAggregatesFilter | number
    prerequisite_mean?: FloatWithAggregatesFilter | number
    prerequisite_median?: FloatWithAggregatesFilter | number
    goals_mean?: FloatWithAggregatesFilter | number
    goals_median?: FloatWithAggregatesFilter | number
    structure_mean?: FloatWithAggregatesFilter | number
    structure_median?: FloatWithAggregatesFilter | number
    teaching_mean?: FloatWithAggregatesFilter | number
    teaching_median?: FloatWithAggregatesFilter | number
    litterature_mean?: FloatWithAggregatesFilter | number
    litterature_median?: FloatWithAggregatesFilter | number
    assessment_mean?: FloatWithAggregatesFilter | number
    assessment_median?: FloatWithAggregatesFilter | number
    administration_mean?: FloatWithAggregatesFilter | number
    administration_median?: FloatWithAggregatesFilter | number
    workload_mean?: FloatWithAggregatesFilter | number
    workload_median?: FloatWithAggregatesFilter | number
    working_environment_mean?: FloatNullableWithAggregatesFilter | number | null
    working_environment_median?: FloatNullableWithAggregatesFilter | number | null
    total_impression_mean?: FloatWithAggregatesFilter | number
    total_impression_median?: FloatWithAggregatesFilter | number
    has_minutes?: BoolWithAggregatesFilter | boolean
  }

  export type DepartmentWhereInput = {
    AND?: Enumerable<DepartmentWhereInput>
    OR?: Enumerable<DepartmentWhereInput>
    NOT?: Enumerable<DepartmentWhereInput>
    id?: IntFilter | number
    name_sv?: StringFilter | string
    name_en?: StringFilter | string
    Course?: CourseListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    Course?: CourseOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = {
    id?: number
  }

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DepartmentScalarWhereWithAggregatesInput>
    OR?: Enumerable<DepartmentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DepartmentScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name_sv?: StringWithAggregatesFilter | string
    name_en?: StringWithAggregatesFilter | string
  }

  export type ProgrammeWhereInput = {
    AND?: Enumerable<ProgrammeWhereInput>
    OR?: Enumerable<ProgrammeWhereInput>
    NOT?: Enumerable<ProgrammeWhereInput>
    code?: StringFilter | string
    name_sv?: StringFilter | string
    name_en?: StringFilter | string
    active?: BoolFilter | boolean
    courses?: CourseListRelationFilter
    programme_plans?: ProgrammePlanEntryListRelationFilter
  }

  export type ProgrammeOrderByWithRelationInput = {
    code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    active?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
    programme_plans?: ProgrammePlanEntryOrderByRelationAggregateInput
  }

  export type ProgrammeWhereUniqueInput = {
    code?: string
  }

  export type ProgrammeOrderByWithAggregationInput = {
    code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    active?: SortOrder
    _count?: ProgrammeCountOrderByAggregateInput
    _max?: ProgrammeMaxOrderByAggregateInput
    _min?: ProgrammeMinOrderByAggregateInput
  }

  export type ProgrammeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProgrammeScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProgrammeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProgrammeScalarWhereWithAggregatesInput>
    code?: StringWithAggregatesFilter | string
    name_sv?: StringWithAggregatesFilter | string
    name_en?: StringWithAggregatesFilter | string
    active?: BoolWithAggregatesFilter | boolean
  }

  export type AlertsWhereInput = {
    AND?: Enumerable<AlertsWhereInput>
    OR?: Enumerable<AlertsWhereInput>
    NOT?: Enumerable<AlertsWhereInput>
    id?: IntFilter | number
    start?: DateTimeFilter | Date | string
    end?: DateTimeFilter | Date | string
    message?: StringFilter | string
    color?: StringFilter | string
  }

  export type AlertsOrderByWithRelationInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    message?: SortOrder
    color?: SortOrder
  }

  export type AlertsWhereUniqueInput = {
    id?: number
  }

  export type AlertsOrderByWithAggregationInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    message?: SortOrder
    color?: SortOrder
    _count?: AlertsCountOrderByAggregateInput
    _avg?: AlertsAvgOrderByAggregateInput
    _max?: AlertsMaxOrderByAggregateInput
    _min?: AlertsMinOrderByAggregateInput
    _sum?: AlertsSumOrderByAggregateInput
  }

  export type AlertsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AlertsScalarWhereWithAggregatesInput>
    OR?: Enumerable<AlertsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AlertsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    start?: DateTimeWithAggregatesFilter | Date | string
    end?: DateTimeWithAggregatesFilter | Date | string
    message?: StringWithAggregatesFilter | string
    color?: StringWithAggregatesFilter | string
  }

  export type CourseCreateInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseCreateManyInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
  }

  export type CourseUpdateManyMutationInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseInstanceCreateInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    course: CourseCreateNestedOneWithoutInstancesInput
    examiner: ExaminerCreateNestedOneWithoutCourseInstanceInput
    survey?: SurveyCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedCreateInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
    survey?: SurveyUncheckedCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUpdateInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneRequiredWithoutInstancesInput
    examiner?: ExaminerUpdateOneRequiredWithoutCourseInstanceInput
    survey?: SurveyUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
    survey?: SurveyUncheckedUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateManyInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
  }

  export type CourseInstanceUpdateManyMutationInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
  }

  export type CourseInstanceUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
  }

  export type CourseModuleCreateInput = {
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
    course_instance: CourseInstanceCreateNestedOneWithoutModulesInput
    dates?: ModuleDatesCreateNestedOneWithoutModuleInput
  }

  export type CourseModuleUncheckedCreateInput = {
    course_instance_id: string
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
    dates?: ModuleDatesUncheckedCreateNestedOneWithoutModuleInput
  }

  export type CourseModuleUpdateInput = {
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    course_instance?: CourseInstanceUpdateOneRequiredWithoutModulesInput
    dates?: ModuleDatesUpdateOneWithoutModuleInput
  }

  export type CourseModuleUncheckedUpdateInput = {
    course_instance_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    dates?: ModuleDatesUncheckedUpdateOneWithoutModuleInput
  }

  export type CourseModuleCreateManyInput = {
    course_instance_id: string
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
  }

  export type CourseModuleUpdateManyMutationInput = {
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
  }

  export type CourseModuleUncheckedUpdateManyInput = {
    course_instance_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleResultCreateInput = {
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
    course: CourseCreateNestedOneWithoutModuleResultsInput
  }

  export type ModuleResultUncheckedCreateInput = {
    course_code: string
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
  }

  export type ModuleResultUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    course?: CourseUpdateOneRequiredWithoutModuleResultsInput
  }

  export type ModuleResultUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleResultCreateManyInput = {
    course_code: string
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
  }

  export type ModuleResultUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleResultUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleDatesCreateInput = {
    primary_date: string
    secondary_date?: string | null
    tertiary_date?: string | null
    module: CourseModuleCreateNestedOneWithoutDatesInput
  }

  export type ModuleDatesUncheckedCreateInput = {
    course_instance_id: string
    module_id: string
    primary_date: string
    secondary_date?: string | null
    tertiary_date?: string | null
  }

  export type ModuleDatesUpdateInput = {
    primary_date?: StringFieldUpdateOperationsInput | string
    secondary_date?: NullableStringFieldUpdateOperationsInput | string | null
    tertiary_date?: NullableStringFieldUpdateOperationsInput | string | null
    module?: CourseModuleUpdateOneRequiredWithoutDatesInput
  }

  export type ModuleDatesUncheckedUpdateInput = {
    course_instance_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    primary_date?: StringFieldUpdateOperationsInput | string
    secondary_date?: NullableStringFieldUpdateOperationsInput | string | null
    tertiary_date?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ModuleDatesCreateManyInput = {
    course_instance_id: string
    module_id: string
    primary_date: string
    secondary_date?: string | null
    tertiary_date?: string | null
  }

  export type ModuleDatesUpdateManyMutationInput = {
    primary_date?: StringFieldUpdateOperationsInput | string
    secondary_date?: NullableStringFieldUpdateOperationsInput | string | null
    tertiary_date?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ModuleDatesUncheckedUpdateManyInput = {
    course_instance_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    primary_date?: StringFieldUpdateOperationsInput | string
    secondary_date?: NullableStringFieldUpdateOperationsInput | string | null
    tertiary_date?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProgrammeInstanceCreateInput = {
    instance_id: string
    programme_code: string
    admission_year: string
    ProgrammePlanEntry?: ProgrammePlanEntryCreateNestedManyWithoutProgramme_instanceInput
  }

  export type ProgrammeInstanceUncheckedCreateInput = {
    instance_id: string
    programme_code: string
    admission_year: string
    ProgrammePlanEntry?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutProgramme_instanceInput
  }

  export type ProgrammeInstanceUpdateInput = {
    instance_id?: StringFieldUpdateOperationsInput | string
    programme_code?: StringFieldUpdateOperationsInput | string
    admission_year?: StringFieldUpdateOperationsInput | string
    ProgrammePlanEntry?: ProgrammePlanEntryUpdateManyWithoutProgramme_instanceInput
  }

  export type ProgrammeInstanceUncheckedUpdateInput = {
    instance_id?: StringFieldUpdateOperationsInput | string
    programme_code?: StringFieldUpdateOperationsInput | string
    admission_year?: StringFieldUpdateOperationsInput | string
    ProgrammePlanEntry?: ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_instanceInput
  }

  export type ProgrammeInstanceCreateManyInput = {
    instance_id: string
    programme_code: string
    admission_year: string
  }

  export type ProgrammeInstanceUpdateManyMutationInput = {
    instance_id?: StringFieldUpdateOperationsInput | string
    programme_code?: StringFieldUpdateOperationsInput | string
    admission_year?: StringFieldUpdateOperationsInput | string
  }

  export type ProgrammeInstanceUncheckedUpdateManyInput = {
    instance_id?: StringFieldUpdateOperationsInput | string
    programme_code?: StringFieldUpdateOperationsInput | string
    admission_year?: StringFieldUpdateOperationsInput | string
  }

  export type ProgrammePlanEntryCreateInput = {
    grade: number
    electivity: Electivity
    programme: ProgrammeCreateNestedOneWithoutProgramme_plansInput
    programme_instance: ProgrammeInstanceCreateNestedOneWithoutProgrammePlanEntryInput
    course: CourseCreateNestedOneWithoutProgramme_planInput
    course_instance: CourseInstanceCreateNestedOneWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedCreateInput = {
    programme_code: string
    programme_instance_id: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryUpdateInput = {
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
    programme?: ProgrammeUpdateOneRequiredWithoutProgramme_plansInput
    programme_instance?: ProgrammeInstanceUpdateOneRequiredWithoutProgrammePlanEntryInput
    course?: CourseUpdateOneRequiredWithoutProgramme_planInput
    course_instance?: CourseInstanceUpdateOneRequiredWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedUpdateInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ProgrammePlanEntryCreateManyInput = {
    programme_code: string
    programme_instance_id: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryUpdateManyMutationInput = {
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ProgrammePlanEntryUncheckedUpdateManyInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ExaminerCreateInput = {
    cid: string
    name: string
    CourseInstance?: CourseInstanceCreateNestedManyWithoutExaminerInput
  }

  export type ExaminerUncheckedCreateInput = {
    cid: string
    name: string
    CourseInstance?: CourseInstanceUncheckedCreateNestedManyWithoutExaminerInput
  }

  export type ExaminerUpdateInput = {
    cid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    CourseInstance?: CourseInstanceUpdateManyWithoutExaminerInput
  }

  export type ExaminerUncheckedUpdateInput = {
    cid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    CourseInstance?: CourseInstanceUncheckedUpdateManyWithoutExaminerInput
  }

  export type ExaminerCreateManyInput = {
    cid: string
    name: string
  }

  export type ExaminerUpdateManyMutationInput = {
    cid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminerUncheckedUpdateManyInput = {
    cid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExamCreateInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis?: ExamThesisCreateNestedOneWithoutExamsInput
    solution?: ExamSolutionCreateNestedOneWithoutExamsInput
    attachments?: ExamAttachmentCreateNestedManyWithoutExamsInput
    course: CourseCreateNestedOneWithoutExamsInput
  }

  export type ExamUncheckedCreateInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
    solution_id?: number | null
    attachments?: ExamAttachmentUncheckedCreateNestedManyWithoutExamsInput
  }

  export type ExamUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis?: ExamThesisUpdateOneWithoutExamsInput
    solution?: ExamSolutionUpdateOneWithoutExamsInput
    attachments?: ExamAttachmentUpdateManyWithoutExamsInput
    course?: CourseUpdateOneRequiredWithoutExamsInput
  }

  export type ExamUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis_id?: NullableIntFieldUpdateOperationsInput | number | null
    solution_id?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: ExamAttachmentUncheckedUpdateManyWithoutExamsInput
  }

  export type ExamCreateManyInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
    solution_id?: number | null
  }

  export type ExamUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ExamUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis_id?: NullableIntFieldUpdateOperationsInput | number | null
    solution_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ExamThesisCreateInput = {
    filetype: string
    verified?: boolean
    includes_solution?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
    exams?: ExamCreateNestedManyWithoutThesisInput
  }

  export type ExamThesisUncheckedCreateInput = {
    id?: number
    filetype: string
    verified?: boolean
    includes_solution?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
    exams?: ExamUncheckedCreateNestedManyWithoutThesisInput
  }

  export type ExamThesisUpdateInput = {
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    includes_solution?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateManyWithoutThesisInput
  }

  export type ExamThesisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    includes_solution?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUncheckedUpdateManyWithoutThesisInput
  }

  export type ExamThesisCreateManyInput = {
    id?: number
    filetype: string
    verified?: boolean
    includes_solution?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamThesisUpdateManyMutationInput = {
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    includes_solution?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamThesisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    includes_solution?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamSolutionCreateInput = {
    filetype: string
    verified?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
    exams?: ExamCreateNestedManyWithoutSolutionInput
  }

  export type ExamSolutionUncheckedCreateInput = {
    id?: number
    filetype: string
    verified?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
    exams?: ExamUncheckedCreateNestedManyWithoutSolutionInput
  }

  export type ExamSolutionUpdateInput = {
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateManyWithoutSolutionInput
  }

  export type ExamSolutionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUncheckedUpdateManyWithoutSolutionInput
  }

  export type ExamSolutionCreateManyInput = {
    id?: number
    filetype: string
    verified?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamSolutionUpdateManyMutationInput = {
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamSolutionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttachmentCreateInput = {
    name: string
    filetype: string
    verified?: boolean
    uploader?: string | null
    uploaded?: Date | string
    exams: ExamCreateNestedOneWithoutAttachmentsInput
  }

  export type ExamAttachmentUncheckedCreateInput = {
    id?: number
    name: string
    filetype: string
    verified?: boolean
    uploader?: string | null
    uploaded?: Date | string
    exam_course_code: string
    exam_date: string
  }

  export type ExamAttachmentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateOneRequiredWithoutAttachmentsInput
  }

  export type ExamAttachmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exam_course_code?: StringFieldUpdateOperationsInput | string
    exam_date?: StringFieldUpdateOperationsInput | string
  }

  export type ExamAttachmentCreateManyInput = {
    id?: number
    name: string
    filetype: string
    verified?: boolean
    uploader?: string | null
    uploaded?: Date | string
    exam_course_code: string
    exam_date: string
  }

  export type ExamAttachmentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttachmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    exam_course_code?: StringFieldUpdateOperationsInput | string
    exam_date?: StringFieldUpdateOperationsInput | string
  }

  export type AlternativeExamCreateInput = {
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
    course: CourseCreateNestedOneWithoutAlternative_examinationsInput
  }

  export type AlternativeExamUncheckedCreateInput = {
    course_code: string
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
  }

  export type AlternativeExamUpdateInput = {
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
    course?: CourseUpdateOneRequiredWithoutAlternative_examinationsInput
  }

  export type AlternativeExamUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
  }

  export type AlternativeExamCreateManyInput = {
    course_code: string
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
  }

  export type AlternativeExamUpdateManyMutationInput = {
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
  }

  export type AlternativeExamUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
  }

  export type PeriodCreateInput = {
    type: string
    academic_year: string
    study_period: number
    start: Date | string
    end: Date | string
  }

  export type PeriodUncheckedCreateInput = {
    type: string
    academic_year: string
    study_period: number
    start: Date | string
    end: Date | string
  }

  export type PeriodUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    study_period?: IntFieldUpdateOperationsInput | number
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodUncheckedUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    study_period?: IntFieldUpdateOperationsInput | number
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodCreateManyInput = {
    type: string
    academic_year: string
    study_period: number
    start: Date | string
    end: Date | string
  }

  export type PeriodUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    study_period?: IntFieldUpdateOperationsInput | number
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodUncheckedUpdateManyInput = {
    type?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    study_period?: IntFieldUpdateOperationsInput | number
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyCreateInput = {
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
    course: CourseCreateNestedOneWithoutSurveysInput
    instance: CourseInstanceCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUncheckedCreateInput = {
    course_code: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
  }

  export type SurveyUpdateInput = {
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
    course?: CourseUpdateOneRequiredWithoutSurveysInput
    instance?: CourseInstanceUpdateOneRequiredWithoutSurveyInput
  }

  export type SurveyUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SurveyCreateManyInput = {
    course_code: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
  }

  export type SurveyUpdateManyMutationInput = {
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SurveyUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DepartmentCreateInput = {
    id: number
    name_sv: string
    name_en: string
    Course?: CourseCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id: number
    name_sv: string
    name_en: string
    Course?: CourseUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    Course?: CourseUpdateManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    Course?: CourseUncheckedUpdateManyWithoutDepartmentInput
  }

  export type DepartmentCreateManyInput = {
    id: number
    name_sv: string
    name_en: string
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
  }

  export type ProgrammeCreateInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
    courses?: CourseCreateNestedManyWithoutOwnerInput
    programme_plans?: ProgrammePlanEntryCreateNestedManyWithoutProgrammeInput
  }

  export type ProgrammeUncheckedCreateInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
    courses?: CourseUncheckedCreateNestedManyWithoutOwnerInput
    programme_plans?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutProgrammeInput
  }

  export type ProgrammeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courses?: CourseUpdateManyWithoutOwnerInput
    programme_plans?: ProgrammePlanEntryUpdateManyWithoutProgrammeInput
  }

  export type ProgrammeUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courses?: CourseUncheckedUpdateManyWithoutOwnerInput
    programme_plans?: ProgrammePlanEntryUncheckedUpdateManyWithoutProgrammeInput
  }

  export type ProgrammeCreateManyInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
  }

  export type ProgrammeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgrammeUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlertsCreateInput = {
    start: Date | string
    end: Date | string
    message: string
    color: string
  }

  export type AlertsUncheckedCreateInput = {
    id?: number
    start: Date | string
    end: Date | string
    message: string
    color: string
  }

  export type AlertsUpdateInput = {
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type AlertsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type AlertsCreateManyInput = {
    id?: number
    start: Date | string
    end: Date | string
    message: string
    color: string
  }

  export type AlertsUpdateManyMutationInput = {
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type AlertsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type ExamListRelationFilter = {
    every?: ExamWhereInput
    some?: ExamWhereInput
    none?: ExamWhereInput
  }

  export type ProgrammeRelationFilter = {
    is?: ProgrammeWhereInput
    isNot?: ProgrammeWhereInput
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DepartmentRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type CourseInstanceListRelationFilter = {
    every?: CourseInstanceWhereInput
    some?: CourseInstanceWhereInput
    none?: CourseInstanceWhereInput
  }

  export type SurveyListRelationFilter = {
    every?: SurveyWhereInput
    some?: SurveyWhereInput
    none?: SurveyWhereInput
  }

  export type ProgrammePlanEntryListRelationFilter = {
    every?: ProgrammePlanEntryWhereInput
    some?: ProgrammePlanEntryWhereInput
    none?: ProgrammePlanEntryWhereInput
  }

  export type AlternativeExamListRelationFilter = {
    every?: AlternativeExamWhereInput
    some?: AlternativeExamWhereInput
    none?: AlternativeExamWhereInput
  }

  export type ModuleResultListRelationFilter = {
    every?: ModuleResultWhereInput
    some?: ModuleResultWhereInput
    none?: ModuleResultWhereInput
  }

  export type ExamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseInstanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgrammePlanEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlternativeExamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModuleResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    course_code?: SortOrder
    owner_code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    department_id?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    department_id?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    course_code?: SortOrder
    owner_code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    department_id?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    course_code?: SortOrder
    owner_code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    department_id?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    department_id?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type CourseRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type ExaminerRelationFilter = {
    is?: ExaminerWhereInput
    isNot?: ExaminerWhereInput
  }

  export type SurveyRelationFilter = {
    is?: SurveyWhereInput | null
    isNot?: SurveyWhereInput | null
  }

  export type CourseModuleListRelationFilter = {
    every?: CourseModuleWhereInput
    some?: CourseModuleWhereInput
    none?: CourseModuleWhereInput
  }

  export type CourseModuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseInstanceCourse_codeAcademic_yearStart_periodEnd_periodCompoundUniqueInput = {
    course_code: string
    academic_year: string
    start_period: number
    end_period: number
  }

  export type CourseInstanceCountOrderByAggregateInput = {
    course_code?: SortOrder
    study_portal_id?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    examiner_cid?: SortOrder
  }

  export type CourseInstanceAvgOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type CourseInstanceMaxOrderByAggregateInput = {
    course_code?: SortOrder
    study_portal_id?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    examiner_cid?: SortOrder
  }

  export type CourseInstanceMinOrderByAggregateInput = {
    course_code?: SortOrder
    study_portal_id?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    examiner_cid?: SortOrder
  }

  export type CourseInstanceSumOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type CourseInstanceRelationFilter = {
    is?: CourseInstanceWhereInput
    isNot?: CourseInstanceWhereInput
  }

  export type ModuleDatesRelationFilter = {
    is?: ModuleDatesWhereInput | null
    isNot?: ModuleDatesWhereInput | null
  }

  export type CourseModuleCourse_instance_idModule_idCompoundUniqueInput = {
    course_instance_id: string
    module_id: string
  }

  export type CourseModuleCountOrderByAggregateInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    kind?: SortOrder
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type CourseModuleAvgOrderByAggregateInput = {
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type CourseModuleMaxOrderByAggregateInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    kind?: SortOrder
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type CourseModuleMinOrderByAggregateInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    kind?: SortOrder
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type CourseModuleSumOrderByAggregateInput = {
    points?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
  }

  export type EnumGradingSystemFilter = {
    equals?: GradingSystem
    in?: Enumerable<GradingSystem>
    notIn?: Enumerable<GradingSystem>
    not?: NestedEnumGradingSystemFilter | GradingSystem
  }

  export type ModuleResultCourse_codeModule_idDateCompoundUniqueInput = {
    course_code: string
    module_id: string
    date: string
  }

  export type ModuleResultCountOrderByAggregateInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    module_id?: SortOrder
    name?: SortOrder
    grading_system?: SortOrder
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
  }

  export type ModuleResultAvgOrderByAggregateInput = {
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
  }

  export type ModuleResultMaxOrderByAggregateInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    module_id?: SortOrder
    name?: SortOrder
    grading_system?: SortOrder
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
  }

  export type ModuleResultMinOrderByAggregateInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    module_id?: SortOrder
    name?: SortOrder
    grading_system?: SortOrder
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
  }

  export type ModuleResultSumOrderByAggregateInput = {
    points?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
  }

  export type EnumGradingSystemWithAggregatesFilter = {
    equals?: GradingSystem
    in?: Enumerable<GradingSystem>
    notIn?: Enumerable<GradingSystem>
    not?: NestedEnumGradingSystemWithAggregatesFilter | GradingSystem
    _count?: NestedIntFilter
    _min?: NestedEnumGradingSystemFilter
    _max?: NestedEnumGradingSystemFilter
  }

  export type CourseModuleRelationFilter = {
    is?: CourseModuleWhereInput
    isNot?: CourseModuleWhereInput
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type ModuleDatesCourse_instance_idModule_idCompoundUniqueInput = {
    course_instance_id: string
    module_id: string
  }

  export type ModuleDatesCountOrderByAggregateInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    primary_date?: SortOrder
    secondary_date?: SortOrder
    tertiary_date?: SortOrder
  }

  export type ModuleDatesMaxOrderByAggregateInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    primary_date?: SortOrder
    secondary_date?: SortOrder
    tertiary_date?: SortOrder
  }

  export type ModuleDatesMinOrderByAggregateInput = {
    course_instance_id?: SortOrder
    module_id?: SortOrder
    primary_date?: SortOrder
    secondary_date?: SortOrder
    tertiary_date?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type ProgrammeInstanceCountOrderByAggregateInput = {
    instance_id?: SortOrder
    programme_code?: SortOrder
    admission_year?: SortOrder
  }

  export type ProgrammeInstanceMaxOrderByAggregateInput = {
    instance_id?: SortOrder
    programme_code?: SortOrder
    admission_year?: SortOrder
  }

  export type ProgrammeInstanceMinOrderByAggregateInput = {
    instance_id?: SortOrder
    programme_code?: SortOrder
    admission_year?: SortOrder
  }

  export type EnumElectivityFilter = {
    equals?: Electivity
    in?: Enumerable<Electivity>
    notIn?: Enumerable<Electivity>
    not?: NestedEnumElectivityFilter | Electivity
  }

  export type ProgrammeInstanceRelationFilter = {
    is?: ProgrammeInstanceWhereInput
    isNot?: ProgrammeInstanceWhereInput
  }

  export type ProgrammePlanEntryProgramme_instance_idCourse_instance_idCompoundUniqueInput = {
    programme_instance_id: string
    course_instance_id: string
  }

  export type ProgrammePlanEntryCountOrderByAggregateInput = {
    programme_code?: SortOrder
    programme_instance_id?: SortOrder
    course_code?: SortOrder
    course_instance_id?: SortOrder
    grade?: SortOrder
    electivity?: SortOrder
  }

  export type ProgrammePlanEntryAvgOrderByAggregateInput = {
    grade?: SortOrder
  }

  export type ProgrammePlanEntryMaxOrderByAggregateInput = {
    programme_code?: SortOrder
    programme_instance_id?: SortOrder
    course_code?: SortOrder
    course_instance_id?: SortOrder
    grade?: SortOrder
    electivity?: SortOrder
  }

  export type ProgrammePlanEntryMinOrderByAggregateInput = {
    programme_code?: SortOrder
    programme_instance_id?: SortOrder
    course_code?: SortOrder
    course_instance_id?: SortOrder
    grade?: SortOrder
    electivity?: SortOrder
  }

  export type ProgrammePlanEntrySumOrderByAggregateInput = {
    grade?: SortOrder
  }

  export type EnumElectivityWithAggregatesFilter = {
    equals?: Electivity
    in?: Enumerable<Electivity>
    notIn?: Enumerable<Electivity>
    not?: NestedEnumElectivityWithAggregatesFilter | Electivity
    _count?: NestedIntFilter
    _min?: NestedEnumElectivityFilter
    _max?: NestedEnumElectivityFilter
  }

  export type ExaminerCountOrderByAggregateInput = {
    cid?: SortOrder
    name?: SortOrder
  }

  export type ExaminerMaxOrderByAggregateInput = {
    cid?: SortOrder
    name?: SortOrder
  }

  export type ExaminerMinOrderByAggregateInput = {
    cid?: SortOrder
    name?: SortOrder
  }

  export type ExamThesisRelationFilter = {
    is?: ExamThesisWhereInput | null
    isNot?: ExamThesisWhereInput | null
  }

  export type ExamSolutionRelationFilter = {
    is?: ExamSolutionWhereInput | null
    isNot?: ExamSolutionWhereInput | null
  }

  export type ExamAttachmentListRelationFilter = {
    every?: ExamAttachmentWhereInput
    some?: ExamAttachmentWhereInput
    none?: ExamAttachmentWhereInput
  }

  export type ExamAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExamCourse_codeDateCompoundUniqueInput = {
    course_code: string
    date: string
  }

  export type ExamCountOrderByAggregateInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    solution_id?: SortOrder
  }

  export type ExamAvgOrderByAggregateInput = {
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    solution_id?: SortOrder
  }

  export type ExamMaxOrderByAggregateInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    solution_id?: SortOrder
  }

  export type ExamMinOrderByAggregateInput = {
    course_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    solution_id?: SortOrder
  }

  export type ExamSumOrderByAggregateInput = {
    failed?: SortOrder
    three?: SortOrder
    four?: SortOrder
    five?: SortOrder
    thesis_id?: SortOrder
    solution_id?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ExamThesisCountOrderByAggregateInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    includes_solution?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamThesisAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExamThesisMaxOrderByAggregateInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    includes_solution?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamThesisMinOrderByAggregateInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    includes_solution?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamThesisSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type ExamSolutionCountOrderByAggregateInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamSolutionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExamSolutionMaxOrderByAggregateInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamSolutionMinOrderByAggregateInput = {
    id?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader_id?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
  }

  export type ExamSolutionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExamRelationFilter = {
    is?: ExamWhereInput
    isNot?: ExamWhereInput
  }

  export type ExamAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    exam_course_code?: SortOrder
    exam_date?: SortOrder
  }

  export type ExamAttachmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExamAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    exam_course_code?: SortOrder
    exam_date?: SortOrder
  }

  export type ExamAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    filetype?: SortOrder
    verified?: SortOrder
    uploader?: SortOrder
    uploaded?: SortOrder
    exam_course_code?: SortOrder
    exam_date?: SortOrder
  }

  export type ExamAttachmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AlternativeExamCourse_codeExam_codeDateCompoundUniqueInput = {
    course_code: string
    exam_code: string
    date: string
  }

  export type AlternativeExamCountOrderByAggregateInput = {
    course_code?: SortOrder
    exam_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    passed?: SortOrder
  }

  export type AlternativeExamAvgOrderByAggregateInput = {
    failed?: SortOrder
    passed?: SortOrder
  }

  export type AlternativeExamMaxOrderByAggregateInput = {
    course_code?: SortOrder
    exam_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    passed?: SortOrder
  }

  export type AlternativeExamMinOrderByAggregateInput = {
    course_code?: SortOrder
    exam_code?: SortOrder
    date?: SortOrder
    academic_year?: SortOrder
    failed?: SortOrder
    passed?: SortOrder
  }

  export type AlternativeExamSumOrderByAggregateInput = {
    failed?: SortOrder
    passed?: SortOrder
  }

  export type PeriodTypeAcademic_yearStudy_periodCompoundUniqueInput = {
    type: string
    academic_year: string
    study_period: number
  }

  export type PeriodCountOrderByAggregateInput = {
    type?: SortOrder
    academic_year?: SortOrder
    study_period?: SortOrder
    start?: SortOrder
    end?: SortOrder
  }

  export type PeriodAvgOrderByAggregateInput = {
    study_period?: SortOrder
  }

  export type PeriodMaxOrderByAggregateInput = {
    type?: SortOrder
    academic_year?: SortOrder
    study_period?: SortOrder
    start?: SortOrder
    end?: SortOrder
  }

  export type PeriodMinOrderByAggregateInput = {
    type?: SortOrder
    academic_year?: SortOrder
    study_period?: SortOrder
    start?: SortOrder
    end?: SortOrder
  }

  export type PeriodSumOrderByAggregateInput = {
    study_period?: SortOrder
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type SurveyCourse_codeAcademic_yearStart_periodEnd_periodCompoundUniqueInput = {
    course_code: string
    academic_year: string
    start_period: number
    end_period: number
  }

  export type SurveyCountOrderByAggregateInput = {
    course_code?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
    has_minutes?: SortOrder
  }

  export type SurveyAvgOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
  }

  export type SurveyMaxOrderByAggregateInput = {
    course_code?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
    has_minutes?: SortOrder
  }

  export type SurveyMinOrderByAggregateInput = {
    course_code?: SortOrder
    academic_year?: SortOrder
    start_period?: SortOrder
    end_period?: SortOrder
    language?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
    has_minutes?: SortOrder
  }

  export type SurveySumOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    respondents?: SortOrder
    responses?: SortOrder
    answer_frequency?: SortOrder
    prerequisite_mean?: SortOrder
    prerequisite_median?: SortOrder
    goals_mean?: SortOrder
    goals_median?: SortOrder
    structure_mean?: SortOrder
    structure_median?: SortOrder
    teaching_mean?: SortOrder
    teaching_median?: SortOrder
    litterature_mean?: SortOrder
    litterature_median?: SortOrder
    assessment_mean?: SortOrder
    assessment_median?: SortOrder
    administration_mean?: SortOrder
    administration_median?: SortOrder
    workload_mean?: SortOrder
    workload_median?: SortOrder
    working_environment_mean?: SortOrder
    working_environment_median?: SortOrder
    total_impression_mean?: SortOrder
    total_impression_median?: SortOrder
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProgrammeCountOrderByAggregateInput = {
    code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    active?: SortOrder
  }

  export type ProgrammeMaxOrderByAggregateInput = {
    code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    active?: SortOrder
  }

  export type ProgrammeMinOrderByAggregateInput = {
    code?: SortOrder
    name_sv?: SortOrder
    name_en?: SortOrder
    active?: SortOrder
  }

  export type AlertsCountOrderByAggregateInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    message?: SortOrder
    color?: SortOrder
  }

  export type AlertsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AlertsMaxOrderByAggregateInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    message?: SortOrder
    color?: SortOrder
  }

  export type AlertsMinOrderByAggregateInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    message?: SortOrder
    color?: SortOrder
  }

  export type AlertsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExamCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<ExamCreateWithoutCourseInput>, Enumerable<ExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutCourseInput>
    createMany?: ExamCreateManyCourseInputEnvelope
    connect?: Enumerable<ExamWhereUniqueInput>
  }

  export type ProgrammeCreateNestedOneWithoutCoursesInput = {
    create?: XOR<ProgrammeCreateWithoutCoursesInput, ProgrammeUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: ProgrammeCreateOrConnectWithoutCoursesInput
    connect?: ProgrammeWhereUniqueInput
  }

  export type DepartmentCreateNestedOneWithoutCourseInput = {
    create?: XOR<DepartmentCreateWithoutCourseInput, DepartmentUncheckedCreateWithoutCourseInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCourseInput
    connect?: DepartmentWhereUniqueInput
  }

  export type CourseInstanceCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutCourseInput>, Enumerable<CourseInstanceUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutCourseInput>
    createMany?: CourseInstanceCreateManyCourseInputEnvelope
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
  }

  export type SurveyCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<SurveyCreateWithoutCourseInput>, Enumerable<SurveyUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<SurveyCreateOrConnectWithoutCourseInput>
    createMany?: SurveyCreateManyCourseInputEnvelope
    connect?: Enumerable<SurveyWhereUniqueInput>
  }

  export type ProgrammePlanEntryCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourseInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourseInput>
    createMany?: ProgrammePlanEntryCreateManyCourseInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type AlternativeExamCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<AlternativeExamCreateWithoutCourseInput>, Enumerable<AlternativeExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<AlternativeExamCreateOrConnectWithoutCourseInput>
    createMany?: AlternativeExamCreateManyCourseInputEnvelope
    connect?: Enumerable<AlternativeExamWhereUniqueInput>
  }

  export type ModuleResultCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<ModuleResultCreateWithoutCourseInput>, Enumerable<ModuleResultUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ModuleResultCreateOrConnectWithoutCourseInput>
    createMany?: ModuleResultCreateManyCourseInputEnvelope
    connect?: Enumerable<ModuleResultWhereUniqueInput>
  }

  export type ExamUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<ExamCreateWithoutCourseInput>, Enumerable<ExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutCourseInput>
    createMany?: ExamCreateManyCourseInputEnvelope
    connect?: Enumerable<ExamWhereUniqueInput>
  }

  export type CourseInstanceUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutCourseInput>, Enumerable<CourseInstanceUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutCourseInput>
    createMany?: CourseInstanceCreateManyCourseInputEnvelope
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
  }

  export type SurveyUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<SurveyCreateWithoutCourseInput>, Enumerable<SurveyUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<SurveyCreateOrConnectWithoutCourseInput>
    createMany?: SurveyCreateManyCourseInputEnvelope
    connect?: Enumerable<SurveyWhereUniqueInput>
  }

  export type ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourseInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourseInput>
    createMany?: ProgrammePlanEntryCreateManyCourseInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type AlternativeExamUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<AlternativeExamCreateWithoutCourseInput>, Enumerable<AlternativeExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<AlternativeExamCreateOrConnectWithoutCourseInput>
    createMany?: AlternativeExamCreateManyCourseInputEnvelope
    connect?: Enumerable<AlternativeExamWhereUniqueInput>
  }

  export type ModuleResultUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<ModuleResultCreateWithoutCourseInput>, Enumerable<ModuleResultUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ModuleResultCreateOrConnectWithoutCourseInput>
    createMany?: ModuleResultCreateManyCourseInputEnvelope
    connect?: Enumerable<ModuleResultWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ExamUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<ExamCreateWithoutCourseInput>, Enumerable<ExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<ExamUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: ExamCreateManyCourseInputEnvelope
    set?: Enumerable<ExamWhereUniqueInput>
    disconnect?: Enumerable<ExamWhereUniqueInput>
    delete?: Enumerable<ExamWhereUniqueInput>
    connect?: Enumerable<ExamWhereUniqueInput>
    update?: Enumerable<ExamUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<ExamUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<ExamScalarWhereInput>
  }

  export type ProgrammeUpdateOneRequiredWithoutCoursesInput = {
    create?: XOR<ProgrammeCreateWithoutCoursesInput, ProgrammeUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: ProgrammeCreateOrConnectWithoutCoursesInput
    upsert?: ProgrammeUpsertWithoutCoursesInput
    connect?: ProgrammeWhereUniqueInput
    update?: XOR<ProgrammeUpdateWithoutCoursesInput, ProgrammeUncheckedUpdateWithoutCoursesInput>
  }

  export type DepartmentUpdateOneWithoutCourseInput = {
    create?: XOR<DepartmentCreateWithoutCourseInput, DepartmentUncheckedCreateWithoutCourseInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCourseInput
    upsert?: DepartmentUpsertWithoutCourseInput
    disconnect?: boolean
    delete?: boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<DepartmentUpdateWithoutCourseInput, DepartmentUncheckedUpdateWithoutCourseInput>
  }

  export type CourseInstanceUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutCourseInput>, Enumerable<CourseInstanceUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<CourseInstanceUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: CourseInstanceCreateManyCourseInputEnvelope
    set?: Enumerable<CourseInstanceWhereUniqueInput>
    disconnect?: Enumerable<CourseInstanceWhereUniqueInput>
    delete?: Enumerable<CourseInstanceWhereUniqueInput>
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
    update?: Enumerable<CourseInstanceUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<CourseInstanceUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<CourseInstanceScalarWhereInput>
  }

  export type SurveyUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<SurveyCreateWithoutCourseInput>, Enumerable<SurveyUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<SurveyCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<SurveyUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: SurveyCreateManyCourseInputEnvelope
    set?: Enumerable<SurveyWhereUniqueInput>
    disconnect?: Enumerable<SurveyWhereUniqueInput>
    delete?: Enumerable<SurveyWhereUniqueInput>
    connect?: Enumerable<SurveyWhereUniqueInput>
    update?: Enumerable<SurveyUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<SurveyUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<SurveyScalarWhereInput>
  }

  export type ProgrammePlanEntryUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourseInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: ProgrammePlanEntryCreateManyCourseInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type AlternativeExamUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<AlternativeExamCreateWithoutCourseInput>, Enumerable<AlternativeExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<AlternativeExamCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<AlternativeExamUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: AlternativeExamCreateManyCourseInputEnvelope
    set?: Enumerable<AlternativeExamWhereUniqueInput>
    disconnect?: Enumerable<AlternativeExamWhereUniqueInput>
    delete?: Enumerable<AlternativeExamWhereUniqueInput>
    connect?: Enumerable<AlternativeExamWhereUniqueInput>
    update?: Enumerable<AlternativeExamUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<AlternativeExamUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<AlternativeExamScalarWhereInput>
  }

  export type ModuleResultUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<ModuleResultCreateWithoutCourseInput>, Enumerable<ModuleResultUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ModuleResultCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<ModuleResultUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: ModuleResultCreateManyCourseInputEnvelope
    set?: Enumerable<ModuleResultWhereUniqueInput>
    disconnect?: Enumerable<ModuleResultWhereUniqueInput>
    delete?: Enumerable<ModuleResultWhereUniqueInput>
    connect?: Enumerable<ModuleResultWhereUniqueInput>
    update?: Enumerable<ModuleResultUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<ModuleResultUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<ModuleResultScalarWhereInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExamUncheckedUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<ExamCreateWithoutCourseInput>, Enumerable<ExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<ExamUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: ExamCreateManyCourseInputEnvelope
    set?: Enumerable<ExamWhereUniqueInput>
    disconnect?: Enumerable<ExamWhereUniqueInput>
    delete?: Enumerable<ExamWhereUniqueInput>
    connect?: Enumerable<ExamWhereUniqueInput>
    update?: Enumerable<ExamUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<ExamUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<ExamScalarWhereInput>
  }

  export type CourseInstanceUncheckedUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutCourseInput>, Enumerable<CourseInstanceUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<CourseInstanceUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: CourseInstanceCreateManyCourseInputEnvelope
    set?: Enumerable<CourseInstanceWhereUniqueInput>
    disconnect?: Enumerable<CourseInstanceWhereUniqueInput>
    delete?: Enumerable<CourseInstanceWhereUniqueInput>
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
    update?: Enumerable<CourseInstanceUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<CourseInstanceUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<CourseInstanceScalarWhereInput>
  }

  export type SurveyUncheckedUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<SurveyCreateWithoutCourseInput>, Enumerable<SurveyUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<SurveyCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<SurveyUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: SurveyCreateManyCourseInputEnvelope
    set?: Enumerable<SurveyWhereUniqueInput>
    disconnect?: Enumerable<SurveyWhereUniqueInput>
    delete?: Enumerable<SurveyWhereUniqueInput>
    connect?: Enumerable<SurveyWhereUniqueInput>
    update?: Enumerable<SurveyUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<SurveyUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<SurveyScalarWhereInput>
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourseInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: ProgrammePlanEntryCreateManyCourseInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type AlternativeExamUncheckedUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<AlternativeExamCreateWithoutCourseInput>, Enumerable<AlternativeExamUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<AlternativeExamCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<AlternativeExamUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: AlternativeExamCreateManyCourseInputEnvelope
    set?: Enumerable<AlternativeExamWhereUniqueInput>
    disconnect?: Enumerable<AlternativeExamWhereUniqueInput>
    delete?: Enumerable<AlternativeExamWhereUniqueInput>
    connect?: Enumerable<AlternativeExamWhereUniqueInput>
    update?: Enumerable<AlternativeExamUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<AlternativeExamUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<AlternativeExamScalarWhereInput>
  }

  export type ModuleResultUncheckedUpdateManyWithoutCourseInput = {
    create?: XOR<Enumerable<ModuleResultCreateWithoutCourseInput>, Enumerable<ModuleResultUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<ModuleResultCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<ModuleResultUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: ModuleResultCreateManyCourseInputEnvelope
    set?: Enumerable<ModuleResultWhereUniqueInput>
    disconnect?: Enumerable<ModuleResultWhereUniqueInput>
    delete?: Enumerable<ModuleResultWhereUniqueInput>
    connect?: Enumerable<ModuleResultWhereUniqueInput>
    update?: Enumerable<ModuleResultUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<ModuleResultUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<ModuleResultScalarWhereInput>
  }

  export type CourseCreateNestedOneWithoutInstancesInput = {
    create?: XOR<CourseCreateWithoutInstancesInput, CourseUncheckedCreateWithoutInstancesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutInstancesInput
    connect?: CourseWhereUniqueInput
  }

  export type ExaminerCreateNestedOneWithoutCourseInstanceInput = {
    create?: XOR<ExaminerCreateWithoutCourseInstanceInput, ExaminerUncheckedCreateWithoutCourseInstanceInput>
    connectOrCreate?: ExaminerCreateOrConnectWithoutCourseInstanceInput
    connect?: ExaminerWhereUniqueInput
  }

  export type SurveyCreateNestedOneWithoutInstanceInput = {
    create?: XOR<SurveyCreateWithoutInstanceInput, SurveyUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutInstanceInput
    connect?: SurveyWhereUniqueInput
  }

  export type ProgrammePlanEntryCreateNestedManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourse_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourse_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyCourse_instanceInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type CourseModuleCreateNestedManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<CourseModuleCreateWithoutCourse_instanceInput>, Enumerable<CourseModuleUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<CourseModuleCreateOrConnectWithoutCourse_instanceInput>
    createMany?: CourseModuleCreateManyCourse_instanceInputEnvelope
    connect?: Enumerable<CourseModuleWhereUniqueInput>
  }

  export type SurveyUncheckedCreateNestedOneWithoutInstanceInput = {
    create?: XOR<SurveyCreateWithoutInstanceInput, SurveyUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutInstanceInput
    connect?: SurveyWhereUniqueInput
  }

  export type ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourse_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourse_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyCourse_instanceInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type CourseModuleUncheckedCreateNestedManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<CourseModuleCreateWithoutCourse_instanceInput>, Enumerable<CourseModuleUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<CourseModuleCreateOrConnectWithoutCourse_instanceInput>
    createMany?: CourseModuleCreateManyCourse_instanceInputEnvelope
    connect?: Enumerable<CourseModuleWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateOneRequiredWithoutInstancesInput = {
    create?: XOR<CourseCreateWithoutInstancesInput, CourseUncheckedCreateWithoutInstancesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutInstancesInput
    upsert?: CourseUpsertWithoutInstancesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<CourseUpdateWithoutInstancesInput, CourseUncheckedUpdateWithoutInstancesInput>
  }

  export type ExaminerUpdateOneRequiredWithoutCourseInstanceInput = {
    create?: XOR<ExaminerCreateWithoutCourseInstanceInput, ExaminerUncheckedCreateWithoutCourseInstanceInput>
    connectOrCreate?: ExaminerCreateOrConnectWithoutCourseInstanceInput
    upsert?: ExaminerUpsertWithoutCourseInstanceInput
    connect?: ExaminerWhereUniqueInput
    update?: XOR<ExaminerUpdateWithoutCourseInstanceInput, ExaminerUncheckedUpdateWithoutCourseInstanceInput>
  }

  export type SurveyUpdateOneWithoutInstanceInput = {
    create?: XOR<SurveyCreateWithoutInstanceInput, SurveyUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutInstanceInput
    upsert?: SurveyUpsertWithoutInstanceInput
    disconnect?: boolean
    delete?: boolean
    connect?: SurveyWhereUniqueInput
    update?: XOR<SurveyUpdateWithoutInstanceInput, SurveyUncheckedUpdateWithoutInstanceInput>
  }

  export type ProgrammePlanEntryUpdateManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourse_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourse_instanceInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutCourse_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyCourse_instanceInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutCourse_instanceInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutCourse_instanceInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type CourseModuleUpdateManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<CourseModuleCreateWithoutCourse_instanceInput>, Enumerable<CourseModuleUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<CourseModuleCreateOrConnectWithoutCourse_instanceInput>
    upsert?: Enumerable<CourseModuleUpsertWithWhereUniqueWithoutCourse_instanceInput>
    createMany?: CourseModuleCreateManyCourse_instanceInputEnvelope
    set?: Enumerable<CourseModuleWhereUniqueInput>
    disconnect?: Enumerable<CourseModuleWhereUniqueInput>
    delete?: Enumerable<CourseModuleWhereUniqueInput>
    connect?: Enumerable<CourseModuleWhereUniqueInput>
    update?: Enumerable<CourseModuleUpdateWithWhereUniqueWithoutCourse_instanceInput>
    updateMany?: Enumerable<CourseModuleUpdateManyWithWhereWithoutCourse_instanceInput>
    deleteMany?: Enumerable<CourseModuleScalarWhereInput>
  }

  export type SurveyUncheckedUpdateOneWithoutInstanceInput = {
    create?: XOR<SurveyCreateWithoutInstanceInput, SurveyUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutInstanceInput
    upsert?: SurveyUpsertWithoutInstanceInput
    disconnect?: boolean
    delete?: boolean
    connect?: SurveyWhereUniqueInput
    update?: XOR<SurveyUpdateWithoutInstanceInput, SurveyUncheckedUpdateWithoutInstanceInput>
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutCourse_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutCourse_instanceInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutCourse_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyCourse_instanceInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutCourse_instanceInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutCourse_instanceInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type CourseModuleUncheckedUpdateManyWithoutCourse_instanceInput = {
    create?: XOR<Enumerable<CourseModuleCreateWithoutCourse_instanceInput>, Enumerable<CourseModuleUncheckedCreateWithoutCourse_instanceInput>>
    connectOrCreate?: Enumerable<CourseModuleCreateOrConnectWithoutCourse_instanceInput>
    upsert?: Enumerable<CourseModuleUpsertWithWhereUniqueWithoutCourse_instanceInput>
    createMany?: CourseModuleCreateManyCourse_instanceInputEnvelope
    set?: Enumerable<CourseModuleWhereUniqueInput>
    disconnect?: Enumerable<CourseModuleWhereUniqueInput>
    delete?: Enumerable<CourseModuleWhereUniqueInput>
    connect?: Enumerable<CourseModuleWhereUniqueInput>
    update?: Enumerable<CourseModuleUpdateWithWhereUniqueWithoutCourse_instanceInput>
    updateMany?: Enumerable<CourseModuleUpdateManyWithWhereWithoutCourse_instanceInput>
    deleteMany?: Enumerable<CourseModuleScalarWhereInput>
  }

  export type CourseInstanceCreateNestedOneWithoutModulesInput = {
    create?: XOR<CourseInstanceCreateWithoutModulesInput, CourseInstanceUncheckedCreateWithoutModulesInput>
    connectOrCreate?: CourseInstanceCreateOrConnectWithoutModulesInput
    connect?: CourseInstanceWhereUniqueInput
  }

  export type ModuleDatesCreateNestedOneWithoutModuleInput = {
    create?: XOR<ModuleDatesCreateWithoutModuleInput, ModuleDatesUncheckedCreateWithoutModuleInput>
    connectOrCreate?: ModuleDatesCreateOrConnectWithoutModuleInput
    connect?: ModuleDatesWhereUniqueInput
  }

  export type ModuleDatesUncheckedCreateNestedOneWithoutModuleInput = {
    create?: XOR<ModuleDatesCreateWithoutModuleInput, ModuleDatesUncheckedCreateWithoutModuleInput>
    connectOrCreate?: ModuleDatesCreateOrConnectWithoutModuleInput
    connect?: ModuleDatesWhereUniqueInput
  }

  export type CourseInstanceUpdateOneRequiredWithoutModulesInput = {
    create?: XOR<CourseInstanceCreateWithoutModulesInput, CourseInstanceUncheckedCreateWithoutModulesInput>
    connectOrCreate?: CourseInstanceCreateOrConnectWithoutModulesInput
    upsert?: CourseInstanceUpsertWithoutModulesInput
    connect?: CourseInstanceWhereUniqueInput
    update?: XOR<CourseInstanceUpdateWithoutModulesInput, CourseInstanceUncheckedUpdateWithoutModulesInput>
  }

  export type ModuleDatesUpdateOneWithoutModuleInput = {
    create?: XOR<ModuleDatesCreateWithoutModuleInput, ModuleDatesUncheckedCreateWithoutModuleInput>
    connectOrCreate?: ModuleDatesCreateOrConnectWithoutModuleInput
    upsert?: ModuleDatesUpsertWithoutModuleInput
    disconnect?: boolean
    delete?: boolean
    connect?: ModuleDatesWhereUniqueInput
    update?: XOR<ModuleDatesUpdateWithoutModuleInput, ModuleDatesUncheckedUpdateWithoutModuleInput>
  }

  export type ModuleDatesUncheckedUpdateOneWithoutModuleInput = {
    create?: XOR<ModuleDatesCreateWithoutModuleInput, ModuleDatesUncheckedCreateWithoutModuleInput>
    connectOrCreate?: ModuleDatesCreateOrConnectWithoutModuleInput
    upsert?: ModuleDatesUpsertWithoutModuleInput
    disconnect?: boolean
    delete?: boolean
    connect?: ModuleDatesWhereUniqueInput
    update?: XOR<ModuleDatesUpdateWithoutModuleInput, ModuleDatesUncheckedUpdateWithoutModuleInput>
  }

  export type CourseCreateNestedOneWithoutModuleResultsInput = {
    create?: XOR<CourseCreateWithoutModuleResultsInput, CourseUncheckedCreateWithoutModuleResultsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutModuleResultsInput
    connect?: CourseWhereUniqueInput
  }

  export type EnumGradingSystemFieldUpdateOperationsInput = {
    set?: GradingSystem
  }

  export type CourseUpdateOneRequiredWithoutModuleResultsInput = {
    create?: XOR<CourseCreateWithoutModuleResultsInput, CourseUncheckedCreateWithoutModuleResultsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutModuleResultsInput
    upsert?: CourseUpsertWithoutModuleResultsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<CourseUpdateWithoutModuleResultsInput, CourseUncheckedUpdateWithoutModuleResultsInput>
  }

  export type CourseModuleCreateNestedOneWithoutDatesInput = {
    create?: XOR<CourseModuleCreateWithoutDatesInput, CourseModuleUncheckedCreateWithoutDatesInput>
    connectOrCreate?: CourseModuleCreateOrConnectWithoutDatesInput
    connect?: CourseModuleWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CourseModuleUpdateOneRequiredWithoutDatesInput = {
    create?: XOR<CourseModuleCreateWithoutDatesInput, CourseModuleUncheckedCreateWithoutDatesInput>
    connectOrCreate?: CourseModuleCreateOrConnectWithoutDatesInput
    upsert?: CourseModuleUpsertWithoutDatesInput
    connect?: CourseModuleWhereUniqueInput
    update?: XOR<CourseModuleUpdateWithoutDatesInput, CourseModuleUncheckedUpdateWithoutDatesInput>
  }

  export type ProgrammePlanEntryCreateNestedManyWithoutProgramme_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgramme_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgramme_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyProgramme_instanceInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type ProgrammePlanEntryUncheckedCreateNestedManyWithoutProgramme_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgramme_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgramme_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyProgramme_instanceInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type ProgrammePlanEntryUpdateManyWithoutProgramme_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgramme_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgramme_instanceInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutProgramme_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyProgramme_instanceInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutProgramme_instanceInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutProgramme_instanceInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_instanceInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgramme_instanceInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgramme_instanceInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutProgramme_instanceInput>
    createMany?: ProgrammePlanEntryCreateManyProgramme_instanceInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutProgramme_instanceInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutProgramme_instanceInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type ProgrammeCreateNestedOneWithoutProgramme_plansInput = {
    create?: XOR<ProgrammeCreateWithoutProgramme_plansInput, ProgrammeUncheckedCreateWithoutProgramme_plansInput>
    connectOrCreate?: ProgrammeCreateOrConnectWithoutProgramme_plansInput
    connect?: ProgrammeWhereUniqueInput
  }

  export type ProgrammeInstanceCreateNestedOneWithoutProgrammePlanEntryInput = {
    create?: XOR<ProgrammeInstanceCreateWithoutProgrammePlanEntryInput, ProgrammeInstanceUncheckedCreateWithoutProgrammePlanEntryInput>
    connectOrCreate?: ProgrammeInstanceCreateOrConnectWithoutProgrammePlanEntryInput
    connect?: ProgrammeInstanceWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutProgramme_planInput = {
    create?: XOR<CourseCreateWithoutProgramme_planInput, CourseUncheckedCreateWithoutProgramme_planInput>
    connectOrCreate?: CourseCreateOrConnectWithoutProgramme_planInput
    connect?: CourseWhereUniqueInput
  }

  export type CourseInstanceCreateNestedOneWithoutProgramme_plan_entriesInput = {
    create?: XOR<CourseInstanceCreateWithoutProgramme_plan_entriesInput, CourseInstanceUncheckedCreateWithoutProgramme_plan_entriesInput>
    connectOrCreate?: CourseInstanceCreateOrConnectWithoutProgramme_plan_entriesInput
    connect?: CourseInstanceWhereUniqueInput
  }

  export type EnumElectivityFieldUpdateOperationsInput = {
    set?: Electivity
  }

  export type ProgrammeUpdateOneRequiredWithoutProgramme_plansInput = {
    create?: XOR<ProgrammeCreateWithoutProgramme_plansInput, ProgrammeUncheckedCreateWithoutProgramme_plansInput>
    connectOrCreate?: ProgrammeCreateOrConnectWithoutProgramme_plansInput
    upsert?: ProgrammeUpsertWithoutProgramme_plansInput
    connect?: ProgrammeWhereUniqueInput
    update?: XOR<ProgrammeUpdateWithoutProgramme_plansInput, ProgrammeUncheckedUpdateWithoutProgramme_plansInput>
  }

  export type ProgrammeInstanceUpdateOneRequiredWithoutProgrammePlanEntryInput = {
    create?: XOR<ProgrammeInstanceCreateWithoutProgrammePlanEntryInput, ProgrammeInstanceUncheckedCreateWithoutProgrammePlanEntryInput>
    connectOrCreate?: ProgrammeInstanceCreateOrConnectWithoutProgrammePlanEntryInput
    upsert?: ProgrammeInstanceUpsertWithoutProgrammePlanEntryInput
    connect?: ProgrammeInstanceWhereUniqueInput
    update?: XOR<ProgrammeInstanceUpdateWithoutProgrammePlanEntryInput, ProgrammeInstanceUncheckedUpdateWithoutProgrammePlanEntryInput>
  }

  export type CourseUpdateOneRequiredWithoutProgramme_planInput = {
    create?: XOR<CourseCreateWithoutProgramme_planInput, CourseUncheckedCreateWithoutProgramme_planInput>
    connectOrCreate?: CourseCreateOrConnectWithoutProgramme_planInput
    upsert?: CourseUpsertWithoutProgramme_planInput
    connect?: CourseWhereUniqueInput
    update?: XOR<CourseUpdateWithoutProgramme_planInput, CourseUncheckedUpdateWithoutProgramme_planInput>
  }

  export type CourseInstanceUpdateOneRequiredWithoutProgramme_plan_entriesInput = {
    create?: XOR<CourseInstanceCreateWithoutProgramme_plan_entriesInput, CourseInstanceUncheckedCreateWithoutProgramme_plan_entriesInput>
    connectOrCreate?: CourseInstanceCreateOrConnectWithoutProgramme_plan_entriesInput
    upsert?: CourseInstanceUpsertWithoutProgramme_plan_entriesInput
    connect?: CourseInstanceWhereUniqueInput
    update?: XOR<CourseInstanceUpdateWithoutProgramme_plan_entriesInput, CourseInstanceUncheckedUpdateWithoutProgramme_plan_entriesInput>
  }

  export type CourseInstanceCreateNestedManyWithoutExaminerInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutExaminerInput>, Enumerable<CourseInstanceUncheckedCreateWithoutExaminerInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutExaminerInput>
    createMany?: CourseInstanceCreateManyExaminerInputEnvelope
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
  }

  export type CourseInstanceUncheckedCreateNestedManyWithoutExaminerInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutExaminerInput>, Enumerable<CourseInstanceUncheckedCreateWithoutExaminerInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutExaminerInput>
    createMany?: CourseInstanceCreateManyExaminerInputEnvelope
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
  }

  export type CourseInstanceUpdateManyWithoutExaminerInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutExaminerInput>, Enumerable<CourseInstanceUncheckedCreateWithoutExaminerInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutExaminerInput>
    upsert?: Enumerable<CourseInstanceUpsertWithWhereUniqueWithoutExaminerInput>
    createMany?: CourseInstanceCreateManyExaminerInputEnvelope
    set?: Enumerable<CourseInstanceWhereUniqueInput>
    disconnect?: Enumerable<CourseInstanceWhereUniqueInput>
    delete?: Enumerable<CourseInstanceWhereUniqueInput>
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
    update?: Enumerable<CourseInstanceUpdateWithWhereUniqueWithoutExaminerInput>
    updateMany?: Enumerable<CourseInstanceUpdateManyWithWhereWithoutExaminerInput>
    deleteMany?: Enumerable<CourseInstanceScalarWhereInput>
  }

  export type CourseInstanceUncheckedUpdateManyWithoutExaminerInput = {
    create?: XOR<Enumerable<CourseInstanceCreateWithoutExaminerInput>, Enumerable<CourseInstanceUncheckedCreateWithoutExaminerInput>>
    connectOrCreate?: Enumerable<CourseInstanceCreateOrConnectWithoutExaminerInput>
    upsert?: Enumerable<CourseInstanceUpsertWithWhereUniqueWithoutExaminerInput>
    createMany?: CourseInstanceCreateManyExaminerInputEnvelope
    set?: Enumerable<CourseInstanceWhereUniqueInput>
    disconnect?: Enumerable<CourseInstanceWhereUniqueInput>
    delete?: Enumerable<CourseInstanceWhereUniqueInput>
    connect?: Enumerable<CourseInstanceWhereUniqueInput>
    update?: Enumerable<CourseInstanceUpdateWithWhereUniqueWithoutExaminerInput>
    updateMany?: Enumerable<CourseInstanceUpdateManyWithWhereWithoutExaminerInput>
    deleteMany?: Enumerable<CourseInstanceScalarWhereInput>
  }

  export type ExamThesisCreateNestedOneWithoutExamsInput = {
    create?: XOR<ExamThesisCreateWithoutExamsInput, ExamThesisUncheckedCreateWithoutExamsInput>
    connectOrCreate?: ExamThesisCreateOrConnectWithoutExamsInput
    connect?: ExamThesisWhereUniqueInput
  }

  export type ExamSolutionCreateNestedOneWithoutExamsInput = {
    create?: XOR<ExamSolutionCreateWithoutExamsInput, ExamSolutionUncheckedCreateWithoutExamsInput>
    connectOrCreate?: ExamSolutionCreateOrConnectWithoutExamsInput
    connect?: ExamSolutionWhereUniqueInput
  }

  export type ExamAttachmentCreateNestedManyWithoutExamsInput = {
    create?: XOR<Enumerable<ExamAttachmentCreateWithoutExamsInput>, Enumerable<ExamAttachmentUncheckedCreateWithoutExamsInput>>
    connectOrCreate?: Enumerable<ExamAttachmentCreateOrConnectWithoutExamsInput>
    createMany?: ExamAttachmentCreateManyExamsInputEnvelope
    connect?: Enumerable<ExamAttachmentWhereUniqueInput>
  }

  export type CourseCreateNestedOneWithoutExamsInput = {
    create?: XOR<CourseCreateWithoutExamsInput, CourseUncheckedCreateWithoutExamsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutExamsInput
    connect?: CourseWhereUniqueInput
  }

  export type ExamAttachmentUncheckedCreateNestedManyWithoutExamsInput = {
    create?: XOR<Enumerable<ExamAttachmentCreateWithoutExamsInput>, Enumerable<ExamAttachmentUncheckedCreateWithoutExamsInput>>
    connectOrCreate?: Enumerable<ExamAttachmentCreateOrConnectWithoutExamsInput>
    createMany?: ExamAttachmentCreateManyExamsInputEnvelope
    connect?: Enumerable<ExamAttachmentWhereUniqueInput>
  }

  export type ExamThesisUpdateOneWithoutExamsInput = {
    create?: XOR<ExamThesisCreateWithoutExamsInput, ExamThesisUncheckedCreateWithoutExamsInput>
    connectOrCreate?: ExamThesisCreateOrConnectWithoutExamsInput
    upsert?: ExamThesisUpsertWithoutExamsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ExamThesisWhereUniqueInput
    update?: XOR<ExamThesisUpdateWithoutExamsInput, ExamThesisUncheckedUpdateWithoutExamsInput>
  }

  export type ExamSolutionUpdateOneWithoutExamsInput = {
    create?: XOR<ExamSolutionCreateWithoutExamsInput, ExamSolutionUncheckedCreateWithoutExamsInput>
    connectOrCreate?: ExamSolutionCreateOrConnectWithoutExamsInput
    upsert?: ExamSolutionUpsertWithoutExamsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ExamSolutionWhereUniqueInput
    update?: XOR<ExamSolutionUpdateWithoutExamsInput, ExamSolutionUncheckedUpdateWithoutExamsInput>
  }

  export type ExamAttachmentUpdateManyWithoutExamsInput = {
    create?: XOR<Enumerable<ExamAttachmentCreateWithoutExamsInput>, Enumerable<ExamAttachmentUncheckedCreateWithoutExamsInput>>
    connectOrCreate?: Enumerable<ExamAttachmentCreateOrConnectWithoutExamsInput>
    upsert?: Enumerable<ExamAttachmentUpsertWithWhereUniqueWithoutExamsInput>
    createMany?: ExamAttachmentCreateManyExamsInputEnvelope
    set?: Enumerable<ExamAttachmentWhereUniqueInput>
    disconnect?: Enumerable<ExamAttachmentWhereUniqueInput>
    delete?: Enumerable<ExamAttachmentWhereUniqueInput>
    connect?: Enumerable<ExamAttachmentWhereUniqueInput>
    update?: Enumerable<ExamAttachmentUpdateWithWhereUniqueWithoutExamsInput>
    updateMany?: Enumerable<ExamAttachmentUpdateManyWithWhereWithoutExamsInput>
    deleteMany?: Enumerable<ExamAttachmentScalarWhereInput>
  }

  export type CourseUpdateOneRequiredWithoutExamsInput = {
    create?: XOR<CourseCreateWithoutExamsInput, CourseUncheckedCreateWithoutExamsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutExamsInput
    upsert?: CourseUpsertWithoutExamsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<CourseUpdateWithoutExamsInput, CourseUncheckedUpdateWithoutExamsInput>
  }

  export type ExamAttachmentUncheckedUpdateManyWithoutExamsInput = {
    create?: XOR<Enumerable<ExamAttachmentCreateWithoutExamsInput>, Enumerable<ExamAttachmentUncheckedCreateWithoutExamsInput>>
    connectOrCreate?: Enumerable<ExamAttachmentCreateOrConnectWithoutExamsInput>
    upsert?: Enumerable<ExamAttachmentUpsertWithWhereUniqueWithoutExamsInput>
    createMany?: ExamAttachmentCreateManyExamsInputEnvelope
    set?: Enumerable<ExamAttachmentWhereUniqueInput>
    disconnect?: Enumerable<ExamAttachmentWhereUniqueInput>
    delete?: Enumerable<ExamAttachmentWhereUniqueInput>
    connect?: Enumerable<ExamAttachmentWhereUniqueInput>
    update?: Enumerable<ExamAttachmentUpdateWithWhereUniqueWithoutExamsInput>
    updateMany?: Enumerable<ExamAttachmentUpdateManyWithWhereWithoutExamsInput>
    deleteMany?: Enumerable<ExamAttachmentScalarWhereInput>
  }

  export type ExamCreateNestedManyWithoutThesisInput = {
    create?: XOR<Enumerable<ExamCreateWithoutThesisInput>, Enumerable<ExamUncheckedCreateWithoutThesisInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutThesisInput>
    createMany?: ExamCreateManyThesisInputEnvelope
    connect?: Enumerable<ExamWhereUniqueInput>
  }

  export type ExamUncheckedCreateNestedManyWithoutThesisInput = {
    create?: XOR<Enumerable<ExamCreateWithoutThesisInput>, Enumerable<ExamUncheckedCreateWithoutThesisInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutThesisInput>
    createMany?: ExamCreateManyThesisInputEnvelope
    connect?: Enumerable<ExamWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ExamUpdateManyWithoutThesisInput = {
    create?: XOR<Enumerable<ExamCreateWithoutThesisInput>, Enumerable<ExamUncheckedCreateWithoutThesisInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutThesisInput>
    upsert?: Enumerable<ExamUpsertWithWhereUniqueWithoutThesisInput>
    createMany?: ExamCreateManyThesisInputEnvelope
    set?: Enumerable<ExamWhereUniqueInput>
    disconnect?: Enumerable<ExamWhereUniqueInput>
    delete?: Enumerable<ExamWhereUniqueInput>
    connect?: Enumerable<ExamWhereUniqueInput>
    update?: Enumerable<ExamUpdateWithWhereUniqueWithoutThesisInput>
    updateMany?: Enumerable<ExamUpdateManyWithWhereWithoutThesisInput>
    deleteMany?: Enumerable<ExamScalarWhereInput>
  }

  export type ExamUncheckedUpdateManyWithoutThesisInput = {
    create?: XOR<Enumerable<ExamCreateWithoutThesisInput>, Enumerable<ExamUncheckedCreateWithoutThesisInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutThesisInput>
    upsert?: Enumerable<ExamUpsertWithWhereUniqueWithoutThesisInput>
    createMany?: ExamCreateManyThesisInputEnvelope
    set?: Enumerable<ExamWhereUniqueInput>
    disconnect?: Enumerable<ExamWhereUniqueInput>
    delete?: Enumerable<ExamWhereUniqueInput>
    connect?: Enumerable<ExamWhereUniqueInput>
    update?: Enumerable<ExamUpdateWithWhereUniqueWithoutThesisInput>
    updateMany?: Enumerable<ExamUpdateManyWithWhereWithoutThesisInput>
    deleteMany?: Enumerable<ExamScalarWhereInput>
  }

  export type ExamCreateNestedManyWithoutSolutionInput = {
    create?: XOR<Enumerable<ExamCreateWithoutSolutionInput>, Enumerable<ExamUncheckedCreateWithoutSolutionInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutSolutionInput>
    createMany?: ExamCreateManySolutionInputEnvelope
    connect?: Enumerable<ExamWhereUniqueInput>
  }

  export type ExamUncheckedCreateNestedManyWithoutSolutionInput = {
    create?: XOR<Enumerable<ExamCreateWithoutSolutionInput>, Enumerable<ExamUncheckedCreateWithoutSolutionInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutSolutionInput>
    createMany?: ExamCreateManySolutionInputEnvelope
    connect?: Enumerable<ExamWhereUniqueInput>
  }

  export type ExamUpdateManyWithoutSolutionInput = {
    create?: XOR<Enumerable<ExamCreateWithoutSolutionInput>, Enumerable<ExamUncheckedCreateWithoutSolutionInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutSolutionInput>
    upsert?: Enumerable<ExamUpsertWithWhereUniqueWithoutSolutionInput>
    createMany?: ExamCreateManySolutionInputEnvelope
    set?: Enumerable<ExamWhereUniqueInput>
    disconnect?: Enumerable<ExamWhereUniqueInput>
    delete?: Enumerable<ExamWhereUniqueInput>
    connect?: Enumerable<ExamWhereUniqueInput>
    update?: Enumerable<ExamUpdateWithWhereUniqueWithoutSolutionInput>
    updateMany?: Enumerable<ExamUpdateManyWithWhereWithoutSolutionInput>
    deleteMany?: Enumerable<ExamScalarWhereInput>
  }

  export type ExamUncheckedUpdateManyWithoutSolutionInput = {
    create?: XOR<Enumerable<ExamCreateWithoutSolutionInput>, Enumerable<ExamUncheckedCreateWithoutSolutionInput>>
    connectOrCreate?: Enumerable<ExamCreateOrConnectWithoutSolutionInput>
    upsert?: Enumerable<ExamUpsertWithWhereUniqueWithoutSolutionInput>
    createMany?: ExamCreateManySolutionInputEnvelope
    set?: Enumerable<ExamWhereUniqueInput>
    disconnect?: Enumerable<ExamWhereUniqueInput>
    delete?: Enumerable<ExamWhereUniqueInput>
    connect?: Enumerable<ExamWhereUniqueInput>
    update?: Enumerable<ExamUpdateWithWhereUniqueWithoutSolutionInput>
    updateMany?: Enumerable<ExamUpdateManyWithWhereWithoutSolutionInput>
    deleteMany?: Enumerable<ExamScalarWhereInput>
  }

  export type ExamCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<ExamCreateWithoutAttachmentsInput, ExamUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutAttachmentsInput
    connect?: ExamWhereUniqueInput
  }

  export type ExamUpdateOneRequiredWithoutAttachmentsInput = {
    create?: XOR<ExamCreateWithoutAttachmentsInput, ExamUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutAttachmentsInput
    upsert?: ExamUpsertWithoutAttachmentsInput
    connect?: ExamWhereUniqueInput
    update?: XOR<ExamUpdateWithoutAttachmentsInput, ExamUncheckedUpdateWithoutAttachmentsInput>
  }

  export type CourseCreateNestedOneWithoutAlternative_examinationsInput = {
    create?: XOR<CourseCreateWithoutAlternative_examinationsInput, CourseUncheckedCreateWithoutAlternative_examinationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAlternative_examinationsInput
    connect?: CourseWhereUniqueInput
  }

  export type CourseUpdateOneRequiredWithoutAlternative_examinationsInput = {
    create?: XOR<CourseCreateWithoutAlternative_examinationsInput, CourseUncheckedCreateWithoutAlternative_examinationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAlternative_examinationsInput
    upsert?: CourseUpsertWithoutAlternative_examinationsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<CourseUpdateWithoutAlternative_examinationsInput, CourseUncheckedUpdateWithoutAlternative_examinationsInput>
  }

  export type CourseCreateNestedOneWithoutSurveysInput = {
    create?: XOR<CourseCreateWithoutSurveysInput, CourseUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: CourseCreateOrConnectWithoutSurveysInput
    connect?: CourseWhereUniqueInput
  }

  export type CourseInstanceCreateNestedOneWithoutSurveyInput = {
    create?: XOR<CourseInstanceCreateWithoutSurveyInput, CourseInstanceUncheckedCreateWithoutSurveyInput>
    connectOrCreate?: CourseInstanceCreateOrConnectWithoutSurveyInput
    connect?: CourseInstanceWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateOneRequiredWithoutSurveysInput = {
    create?: XOR<CourseCreateWithoutSurveysInput, CourseUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: CourseCreateOrConnectWithoutSurveysInput
    upsert?: CourseUpsertWithoutSurveysInput
    connect?: CourseWhereUniqueInput
    update?: XOR<CourseUpdateWithoutSurveysInput, CourseUncheckedUpdateWithoutSurveysInput>
  }

  export type CourseInstanceUpdateOneRequiredWithoutSurveyInput = {
    create?: XOR<CourseInstanceCreateWithoutSurveyInput, CourseInstanceUncheckedCreateWithoutSurveyInput>
    connectOrCreate?: CourseInstanceCreateOrConnectWithoutSurveyInput
    upsert?: CourseInstanceUpsertWithoutSurveyInput
    connect?: CourseInstanceWhereUniqueInput
    update?: XOR<CourseInstanceUpdateWithoutSurveyInput, CourseInstanceUncheckedUpdateWithoutSurveyInput>
  }

  export type CourseCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: Enumerable<CourseWhereUniqueInput>
  }

  export type CourseUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: Enumerable<CourseWhereUniqueInput>
  }

  export type CourseUpdateManyWithoutDepartmentInput = {
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    upsert?: Enumerable<CourseUpsertWithWhereUniqueWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: Enumerable<CourseWhereUniqueInput>
    disconnect?: Enumerable<CourseWhereUniqueInput>
    delete?: Enumerable<CourseWhereUniqueInput>
    connect?: Enumerable<CourseWhereUniqueInput>
    update?: Enumerable<CourseUpdateWithWhereUniqueWithoutDepartmentInput>
    updateMany?: Enumerable<CourseUpdateManyWithWhereWithoutDepartmentInput>
    deleteMany?: Enumerable<CourseScalarWhereInput>
  }

  export type CourseUncheckedUpdateManyWithoutDepartmentInput = {
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    upsert?: Enumerable<CourseUpsertWithWhereUniqueWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: Enumerable<CourseWhereUniqueInput>
    disconnect?: Enumerable<CourseWhereUniqueInput>
    delete?: Enumerable<CourseWhereUniqueInput>
    connect?: Enumerable<CourseWhereUniqueInput>
    update?: Enumerable<CourseUpdateWithWhereUniqueWithoutDepartmentInput>
    updateMany?: Enumerable<CourseUpdateManyWithWhereWithoutDepartmentInput>
    deleteMany?: Enumerable<CourseScalarWhereInput>
  }

  export type CourseCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<CourseCreateWithoutOwnerInput>, Enumerable<CourseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutOwnerInput>
    createMany?: CourseCreateManyOwnerInputEnvelope
    connect?: Enumerable<CourseWhereUniqueInput>
  }

  export type ProgrammePlanEntryCreateNestedManyWithoutProgrammeInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgrammeInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgrammeInput>
    createMany?: ProgrammePlanEntryCreateManyProgrammeInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type CourseUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<CourseCreateWithoutOwnerInput>, Enumerable<CourseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutOwnerInput>
    createMany?: CourseCreateManyOwnerInputEnvelope
    connect?: Enumerable<CourseWhereUniqueInput>
  }

  export type ProgrammePlanEntryUncheckedCreateNestedManyWithoutProgrammeInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgrammeInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgrammeInput>
    createMany?: ProgrammePlanEntryCreateManyProgrammeInputEnvelope
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
  }

  export type CourseUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<CourseCreateWithoutOwnerInput>, Enumerable<CourseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<CourseUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: CourseCreateManyOwnerInputEnvelope
    set?: Enumerable<CourseWhereUniqueInput>
    disconnect?: Enumerable<CourseWhereUniqueInput>
    delete?: Enumerable<CourseWhereUniqueInput>
    connect?: Enumerable<CourseWhereUniqueInput>
    update?: Enumerable<CourseUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<CourseUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<CourseScalarWhereInput>
  }

  export type ProgrammePlanEntryUpdateManyWithoutProgrammeInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgrammeInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgrammeInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutProgrammeInput>
    createMany?: ProgrammePlanEntryCreateManyProgrammeInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutProgrammeInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutProgrammeInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type CourseUncheckedUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<CourseCreateWithoutOwnerInput>, Enumerable<CourseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<CourseUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: CourseCreateManyOwnerInputEnvelope
    set?: Enumerable<CourseWhereUniqueInput>
    disconnect?: Enumerable<CourseWhereUniqueInput>
    delete?: Enumerable<CourseWhereUniqueInput>
    connect?: Enumerable<CourseWhereUniqueInput>
    update?: Enumerable<CourseUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<CourseUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<CourseScalarWhereInput>
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutProgrammeInput = {
    create?: XOR<Enumerable<ProgrammePlanEntryCreateWithoutProgrammeInput>, Enumerable<ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput>>
    connectOrCreate?: Enumerable<ProgrammePlanEntryCreateOrConnectWithoutProgrammeInput>
    upsert?: Enumerable<ProgrammePlanEntryUpsertWithWhereUniqueWithoutProgrammeInput>
    createMany?: ProgrammePlanEntryCreateManyProgrammeInputEnvelope
    set?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    disconnect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    delete?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    connect?: Enumerable<ProgrammePlanEntryWhereUniqueInput>
    update?: Enumerable<ProgrammePlanEntryUpdateWithWhereUniqueWithoutProgrammeInput>
    updateMany?: Enumerable<ProgrammePlanEntryUpdateManyWithWhereWithoutProgrammeInput>
    deleteMany?: Enumerable<ProgrammePlanEntryScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedEnumGradingSystemFilter = {
    equals?: GradingSystem
    in?: Enumerable<GradingSystem>
    notIn?: Enumerable<GradingSystem>
    not?: NestedEnumGradingSystemFilter | GradingSystem
  }

  export type NestedEnumGradingSystemWithAggregatesFilter = {
    equals?: GradingSystem
    in?: Enumerable<GradingSystem>
    notIn?: Enumerable<GradingSystem>
    not?: NestedEnumGradingSystemWithAggregatesFilter | GradingSystem
    _count?: NestedIntFilter
    _min?: NestedEnumGradingSystemFilter
    _max?: NestedEnumGradingSystemFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedEnumElectivityFilter = {
    equals?: Electivity
    in?: Enumerable<Electivity>
    notIn?: Enumerable<Electivity>
    not?: NestedEnumElectivityFilter | Electivity
  }

  export type NestedEnumElectivityWithAggregatesFilter = {
    equals?: Electivity
    in?: Enumerable<Electivity>
    notIn?: Enumerable<Electivity>
    not?: NestedEnumElectivityWithAggregatesFilter | Electivity
    _count?: NestedIntFilter
    _min?: NestedEnumElectivityFilter
    _max?: NestedEnumElectivityFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type ExamCreateWithoutCourseInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis?: ExamThesisCreateNestedOneWithoutExamsInput
    solution?: ExamSolutionCreateNestedOneWithoutExamsInput
    attachments?: ExamAttachmentCreateNestedManyWithoutExamsInput
  }

  export type ExamUncheckedCreateWithoutCourseInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
    solution_id?: number | null
    attachments?: ExamAttachmentUncheckedCreateNestedManyWithoutExamsInput
  }

  export type ExamCreateOrConnectWithoutCourseInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutCourseInput, ExamUncheckedCreateWithoutCourseInput>
  }

  export type ExamCreateManyCourseInputEnvelope = {
    data: Enumerable<ExamCreateManyCourseInput>
    skipDuplicates?: boolean
  }

  export type ProgrammeCreateWithoutCoursesInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
    programme_plans?: ProgrammePlanEntryCreateNestedManyWithoutProgrammeInput
  }

  export type ProgrammeUncheckedCreateWithoutCoursesInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
    programme_plans?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutProgrammeInput
  }

  export type ProgrammeCreateOrConnectWithoutCoursesInput = {
    where: ProgrammeWhereUniqueInput
    create: XOR<ProgrammeCreateWithoutCoursesInput, ProgrammeUncheckedCreateWithoutCoursesInput>
  }

  export type DepartmentCreateWithoutCourseInput = {
    id: number
    name_sv: string
    name_en: string
  }

  export type DepartmentUncheckedCreateWithoutCourseInput = {
    id: number
    name_sv: string
    name_en: string
  }

  export type DepartmentCreateOrConnectWithoutCourseInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutCourseInput, DepartmentUncheckedCreateWithoutCourseInput>
  }

  export type CourseInstanceCreateWithoutCourseInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner: ExaminerCreateNestedOneWithoutCourseInstanceInput
    survey?: SurveyCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedCreateWithoutCourseInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
    survey?: SurveyUncheckedCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateOrConnectWithoutCourseInput = {
    where: CourseInstanceWhereUniqueInput
    create: XOR<CourseInstanceCreateWithoutCourseInput, CourseInstanceUncheckedCreateWithoutCourseInput>
  }

  export type CourseInstanceCreateManyCourseInputEnvelope = {
    data: Enumerable<CourseInstanceCreateManyCourseInput>
    skipDuplicates?: boolean
  }

  export type SurveyCreateWithoutCourseInput = {
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
    instance: CourseInstanceCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUncheckedCreateWithoutCourseInput = {
    academic_year: string
    start_period: number
    end_period: number
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
  }

  export type SurveyCreateOrConnectWithoutCourseInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutCourseInput, SurveyUncheckedCreateWithoutCourseInput>
  }

  export type SurveyCreateManyCourseInputEnvelope = {
    data: Enumerable<SurveyCreateManyCourseInput>
    skipDuplicates?: boolean
  }

  export type ProgrammePlanEntryCreateWithoutCourseInput = {
    grade: number
    electivity: Electivity
    programme: ProgrammeCreateNestedOneWithoutProgramme_plansInput
    programme_instance: ProgrammeInstanceCreateNestedOneWithoutProgrammePlanEntryInput
    course_instance: CourseInstanceCreateNestedOneWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedCreateWithoutCourseInput = {
    programme_code: string
    programme_instance_id: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryCreateOrConnectWithoutCourseInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    create: XOR<ProgrammePlanEntryCreateWithoutCourseInput, ProgrammePlanEntryUncheckedCreateWithoutCourseInput>
  }

  export type ProgrammePlanEntryCreateManyCourseInputEnvelope = {
    data: Enumerable<ProgrammePlanEntryCreateManyCourseInput>
    skipDuplicates?: boolean
  }

  export type AlternativeExamCreateWithoutCourseInput = {
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
  }

  export type AlternativeExamUncheckedCreateWithoutCourseInput = {
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
  }

  export type AlternativeExamCreateOrConnectWithoutCourseInput = {
    where: AlternativeExamWhereUniqueInput
    create: XOR<AlternativeExamCreateWithoutCourseInput, AlternativeExamUncheckedCreateWithoutCourseInput>
  }

  export type AlternativeExamCreateManyCourseInputEnvelope = {
    data: Enumerable<AlternativeExamCreateManyCourseInput>
    skipDuplicates?: boolean
  }

  export type ModuleResultCreateWithoutCourseInput = {
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
  }

  export type ModuleResultUncheckedCreateWithoutCourseInput = {
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
  }

  export type ModuleResultCreateOrConnectWithoutCourseInput = {
    where: ModuleResultWhereUniqueInput
    create: XOR<ModuleResultCreateWithoutCourseInput, ModuleResultUncheckedCreateWithoutCourseInput>
  }

  export type ModuleResultCreateManyCourseInputEnvelope = {
    data: Enumerable<ModuleResultCreateManyCourseInput>
    skipDuplicates?: boolean
  }

  export type ExamUpsertWithWhereUniqueWithoutCourseInput = {
    where: ExamWhereUniqueInput
    update: XOR<ExamUpdateWithoutCourseInput, ExamUncheckedUpdateWithoutCourseInput>
    create: XOR<ExamCreateWithoutCourseInput, ExamUncheckedCreateWithoutCourseInput>
  }

  export type ExamUpdateWithWhereUniqueWithoutCourseInput = {
    where: ExamWhereUniqueInput
    data: XOR<ExamUpdateWithoutCourseInput, ExamUncheckedUpdateWithoutCourseInput>
  }

  export type ExamUpdateManyWithWhereWithoutCourseInput = {
    where: ExamScalarWhereInput
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyWithoutExamsInput>
  }

  export type ExamScalarWhereInput = {
    AND?: Enumerable<ExamScalarWhereInput>
    OR?: Enumerable<ExamScalarWhereInput>
    NOT?: Enumerable<ExamScalarWhereInput>
    course_code?: StringFilter | string
    date?: StringFilter | string
    academic_year?: StringFilter | string
    failed?: IntFilter | number
    three?: IntFilter | number
    four?: IntFilter | number
    five?: IntFilter | number
    thesis_id?: IntNullableFilter | number | null
    solution_id?: IntNullableFilter | number | null
  }

  export type ProgrammeUpsertWithoutCoursesInput = {
    update: XOR<ProgrammeUpdateWithoutCoursesInput, ProgrammeUncheckedUpdateWithoutCoursesInput>
    create: XOR<ProgrammeCreateWithoutCoursesInput, ProgrammeUncheckedCreateWithoutCoursesInput>
  }

  export type ProgrammeUpdateWithoutCoursesInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    programme_plans?: ProgrammePlanEntryUpdateManyWithoutProgrammeInput
  }

  export type ProgrammeUncheckedUpdateWithoutCoursesInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    programme_plans?: ProgrammePlanEntryUncheckedUpdateManyWithoutProgrammeInput
  }

  export type DepartmentUpsertWithoutCourseInput = {
    update: XOR<DepartmentUpdateWithoutCourseInput, DepartmentUncheckedUpdateWithoutCourseInput>
    create: XOR<DepartmentCreateWithoutCourseInput, DepartmentUncheckedCreateWithoutCourseInput>
  }

  export type DepartmentUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
  }

  export type CourseInstanceUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseInstanceWhereUniqueInput
    update: XOR<CourseInstanceUpdateWithoutCourseInput, CourseInstanceUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseInstanceCreateWithoutCourseInput, CourseInstanceUncheckedCreateWithoutCourseInput>
  }

  export type CourseInstanceUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseInstanceWhereUniqueInput
    data: XOR<CourseInstanceUpdateWithoutCourseInput, CourseInstanceUncheckedUpdateWithoutCourseInput>
  }

  export type CourseInstanceUpdateManyWithWhereWithoutCourseInput = {
    where: CourseInstanceScalarWhereInput
    data: XOR<CourseInstanceUpdateManyMutationInput, CourseInstanceUncheckedUpdateManyWithoutInstancesInput>
  }

  export type CourseInstanceScalarWhereInput = {
    AND?: Enumerable<CourseInstanceScalarWhereInput>
    OR?: Enumerable<CourseInstanceScalarWhereInput>
    NOT?: Enumerable<CourseInstanceScalarWhereInput>
    course_code?: StringFilter | string
    study_portal_id?: StringFilter | string
    academic_year?: StringFilter | string
    start_period?: IntFilter | number
    end_period?: IntFilter | number
    language?: StringFilter | string
    examiner_cid?: StringFilter | string
  }

  export type SurveyUpsertWithWhereUniqueWithoutCourseInput = {
    where: SurveyWhereUniqueInput
    update: XOR<SurveyUpdateWithoutCourseInput, SurveyUncheckedUpdateWithoutCourseInput>
    create: XOR<SurveyCreateWithoutCourseInput, SurveyUncheckedCreateWithoutCourseInput>
  }

  export type SurveyUpdateWithWhereUniqueWithoutCourseInput = {
    where: SurveyWhereUniqueInput
    data: XOR<SurveyUpdateWithoutCourseInput, SurveyUncheckedUpdateWithoutCourseInput>
  }

  export type SurveyUpdateManyWithWhereWithoutCourseInput = {
    where: SurveyScalarWhereInput
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyWithoutSurveysInput>
  }

  export type SurveyScalarWhereInput = {
    AND?: Enumerable<SurveyScalarWhereInput>
    OR?: Enumerable<SurveyScalarWhereInput>
    NOT?: Enumerable<SurveyScalarWhereInput>
    course_code?: StringFilter | string
    academic_year?: StringFilter | string
    start_period?: IntFilter | number
    end_period?: IntFilter | number
    language?: StringFilter | string
    respondents?: IntFilter | number
    responses?: IntFilter | number
    answer_frequency?: FloatFilter | number
    prerequisite_mean?: FloatFilter | number
    prerequisite_median?: FloatFilter | number
    goals_mean?: FloatFilter | number
    goals_median?: FloatFilter | number
    structure_mean?: FloatFilter | number
    structure_median?: FloatFilter | number
    teaching_mean?: FloatFilter | number
    teaching_median?: FloatFilter | number
    litterature_mean?: FloatFilter | number
    litterature_median?: FloatFilter | number
    assessment_mean?: FloatFilter | number
    assessment_median?: FloatFilter | number
    administration_mean?: FloatFilter | number
    administration_median?: FloatFilter | number
    workload_mean?: FloatFilter | number
    workload_median?: FloatFilter | number
    working_environment_mean?: FloatNullableFilter | number | null
    working_environment_median?: FloatNullableFilter | number | null
    total_impression_mean?: FloatFilter | number
    total_impression_median?: FloatFilter | number
    has_minutes?: BoolFilter | boolean
  }

  export type ProgrammePlanEntryUpsertWithWhereUniqueWithoutCourseInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    update: XOR<ProgrammePlanEntryUpdateWithoutCourseInput, ProgrammePlanEntryUncheckedUpdateWithoutCourseInput>
    create: XOR<ProgrammePlanEntryCreateWithoutCourseInput, ProgrammePlanEntryUncheckedCreateWithoutCourseInput>
  }

  export type ProgrammePlanEntryUpdateWithWhereUniqueWithoutCourseInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    data: XOR<ProgrammePlanEntryUpdateWithoutCourseInput, ProgrammePlanEntryUncheckedUpdateWithoutCourseInput>
  }

  export type ProgrammePlanEntryUpdateManyWithWhereWithoutCourseInput = {
    where: ProgrammePlanEntryScalarWhereInput
    data: XOR<ProgrammePlanEntryUpdateManyMutationInput, ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_planInput>
  }

  export type ProgrammePlanEntryScalarWhereInput = {
    AND?: Enumerable<ProgrammePlanEntryScalarWhereInput>
    OR?: Enumerable<ProgrammePlanEntryScalarWhereInput>
    NOT?: Enumerable<ProgrammePlanEntryScalarWhereInput>
    programme_code?: StringFilter | string
    programme_instance_id?: StringFilter | string
    course_code?: StringFilter | string
    course_instance_id?: StringFilter | string
    grade?: IntFilter | number
    electivity?: EnumElectivityFilter | Electivity
  }

  export type AlternativeExamUpsertWithWhereUniqueWithoutCourseInput = {
    where: AlternativeExamWhereUniqueInput
    update: XOR<AlternativeExamUpdateWithoutCourseInput, AlternativeExamUncheckedUpdateWithoutCourseInput>
    create: XOR<AlternativeExamCreateWithoutCourseInput, AlternativeExamUncheckedCreateWithoutCourseInput>
  }

  export type AlternativeExamUpdateWithWhereUniqueWithoutCourseInput = {
    where: AlternativeExamWhereUniqueInput
    data: XOR<AlternativeExamUpdateWithoutCourseInput, AlternativeExamUncheckedUpdateWithoutCourseInput>
  }

  export type AlternativeExamUpdateManyWithWhereWithoutCourseInput = {
    where: AlternativeExamScalarWhereInput
    data: XOR<AlternativeExamUpdateManyMutationInput, AlternativeExamUncheckedUpdateManyWithoutAlternative_examinationsInput>
  }

  export type AlternativeExamScalarWhereInput = {
    AND?: Enumerable<AlternativeExamScalarWhereInput>
    OR?: Enumerable<AlternativeExamScalarWhereInput>
    NOT?: Enumerable<AlternativeExamScalarWhereInput>
    course_code?: StringFilter | string
    exam_code?: StringFilter | string
    date?: StringFilter | string
    academic_year?: StringFilter | string
    failed?: IntFilter | number
    passed?: IntFilter | number
  }

  export type ModuleResultUpsertWithWhereUniqueWithoutCourseInput = {
    where: ModuleResultWhereUniqueInput
    update: XOR<ModuleResultUpdateWithoutCourseInput, ModuleResultUncheckedUpdateWithoutCourseInput>
    create: XOR<ModuleResultCreateWithoutCourseInput, ModuleResultUncheckedCreateWithoutCourseInput>
  }

  export type ModuleResultUpdateWithWhereUniqueWithoutCourseInput = {
    where: ModuleResultWhereUniqueInput
    data: XOR<ModuleResultUpdateWithoutCourseInput, ModuleResultUncheckedUpdateWithoutCourseInput>
  }

  export type ModuleResultUpdateManyWithWhereWithoutCourseInput = {
    where: ModuleResultScalarWhereInput
    data: XOR<ModuleResultUpdateManyMutationInput, ModuleResultUncheckedUpdateManyWithoutModuleResultsInput>
  }

  export type ModuleResultScalarWhereInput = {
    AND?: Enumerable<ModuleResultScalarWhereInput>
    OR?: Enumerable<ModuleResultScalarWhereInput>
    NOT?: Enumerable<ModuleResultScalarWhereInput>
    course_code?: StringFilter | string
    date?: StringFilter | string
    academic_year?: StringFilter | string
    module_id?: StringFilter | string
    name?: StringFilter | string
    grading_system?: EnumGradingSystemFilter | GradingSystem
    points?: IntFilter | number
    failed?: IntFilter | number
    three?: IntFilter | number
    four?: IntFilter | number
    five?: IntFilter | number
  }

  export type CourseCreateWithoutInstancesInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutInstancesInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutInstancesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutInstancesInput, CourseUncheckedCreateWithoutInstancesInput>
  }

  export type ExaminerCreateWithoutCourseInstanceInput = {
    cid: string
    name: string
  }

  export type ExaminerUncheckedCreateWithoutCourseInstanceInput = {
    cid: string
    name: string
  }

  export type ExaminerCreateOrConnectWithoutCourseInstanceInput = {
    where: ExaminerWhereUniqueInput
    create: XOR<ExaminerCreateWithoutCourseInstanceInput, ExaminerUncheckedCreateWithoutCourseInstanceInput>
  }

  export type SurveyCreateWithoutInstanceInput = {
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
    course: CourseCreateNestedOneWithoutSurveysInput
  }

  export type SurveyUncheckedCreateWithoutInstanceInput = {
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
  }

  export type SurveyCreateOrConnectWithoutInstanceInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutInstanceInput, SurveyUncheckedCreateWithoutInstanceInput>
  }

  export type ProgrammePlanEntryCreateWithoutCourse_instanceInput = {
    grade: number
    electivity: Electivity
    programme: ProgrammeCreateNestedOneWithoutProgramme_plansInput
    programme_instance: ProgrammeInstanceCreateNestedOneWithoutProgrammePlanEntryInput
    course: CourseCreateNestedOneWithoutProgramme_planInput
  }

  export type ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput = {
    programme_code: string
    programme_instance_id: string
    course_code: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryCreateOrConnectWithoutCourse_instanceInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    create: XOR<ProgrammePlanEntryCreateWithoutCourse_instanceInput, ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput>
  }

  export type ProgrammePlanEntryCreateManyCourse_instanceInputEnvelope = {
    data: Enumerable<ProgrammePlanEntryCreateManyCourse_instanceInput>
    skipDuplicates?: boolean
  }

  export type CourseModuleCreateWithoutCourse_instanceInput = {
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
    dates?: ModuleDatesCreateNestedOneWithoutModuleInput
  }

  export type CourseModuleUncheckedCreateWithoutCourse_instanceInput = {
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
    dates?: ModuleDatesUncheckedCreateNestedOneWithoutModuleInput
  }

  export type CourseModuleCreateOrConnectWithoutCourse_instanceInput = {
    where: CourseModuleWhereUniqueInput
    create: XOR<CourseModuleCreateWithoutCourse_instanceInput, CourseModuleUncheckedCreateWithoutCourse_instanceInput>
  }

  export type CourseModuleCreateManyCourse_instanceInputEnvelope = {
    data: Enumerable<CourseModuleCreateManyCourse_instanceInput>
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutInstancesInput = {
    update: XOR<CourseUpdateWithoutInstancesInput, CourseUncheckedUpdateWithoutInstancesInput>
    create: XOR<CourseCreateWithoutInstancesInput, CourseUncheckedCreateWithoutInstancesInput>
  }

  export type CourseUpdateWithoutInstancesInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutInstancesInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type ExaminerUpsertWithoutCourseInstanceInput = {
    update: XOR<ExaminerUpdateWithoutCourseInstanceInput, ExaminerUncheckedUpdateWithoutCourseInstanceInput>
    create: XOR<ExaminerCreateWithoutCourseInstanceInput, ExaminerUncheckedCreateWithoutCourseInstanceInput>
  }

  export type ExaminerUpdateWithoutCourseInstanceInput = {
    cid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminerUncheckedUpdateWithoutCourseInstanceInput = {
    cid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyUpsertWithoutInstanceInput = {
    update: XOR<SurveyUpdateWithoutInstanceInput, SurveyUncheckedUpdateWithoutInstanceInput>
    create: XOR<SurveyCreateWithoutInstanceInput, SurveyUncheckedCreateWithoutInstanceInput>
  }

  export type SurveyUpdateWithoutInstanceInput = {
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
    course?: CourseUpdateOneRequiredWithoutSurveysInput
  }

  export type SurveyUncheckedUpdateWithoutInstanceInput = {
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgrammePlanEntryUpsertWithWhereUniqueWithoutCourse_instanceInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    update: XOR<ProgrammePlanEntryUpdateWithoutCourse_instanceInput, ProgrammePlanEntryUncheckedUpdateWithoutCourse_instanceInput>
    create: XOR<ProgrammePlanEntryCreateWithoutCourse_instanceInput, ProgrammePlanEntryUncheckedCreateWithoutCourse_instanceInput>
  }

  export type ProgrammePlanEntryUpdateWithWhereUniqueWithoutCourse_instanceInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    data: XOR<ProgrammePlanEntryUpdateWithoutCourse_instanceInput, ProgrammePlanEntryUncheckedUpdateWithoutCourse_instanceInput>
  }

  export type ProgrammePlanEntryUpdateManyWithWhereWithoutCourse_instanceInput = {
    where: ProgrammePlanEntryScalarWhereInput
    data: XOR<ProgrammePlanEntryUpdateManyMutationInput, ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_plan_entriesInput>
  }

  export type CourseModuleUpsertWithWhereUniqueWithoutCourse_instanceInput = {
    where: CourseModuleWhereUniqueInput
    update: XOR<CourseModuleUpdateWithoutCourse_instanceInput, CourseModuleUncheckedUpdateWithoutCourse_instanceInput>
    create: XOR<CourseModuleCreateWithoutCourse_instanceInput, CourseModuleUncheckedCreateWithoutCourse_instanceInput>
  }

  export type CourseModuleUpdateWithWhereUniqueWithoutCourse_instanceInput = {
    where: CourseModuleWhereUniqueInput
    data: XOR<CourseModuleUpdateWithoutCourse_instanceInput, CourseModuleUncheckedUpdateWithoutCourse_instanceInput>
  }

  export type CourseModuleUpdateManyWithWhereWithoutCourse_instanceInput = {
    where: CourseModuleScalarWhereInput
    data: XOR<CourseModuleUpdateManyMutationInput, CourseModuleUncheckedUpdateManyWithoutModulesInput>
  }

  export type CourseModuleScalarWhereInput = {
    AND?: Enumerable<CourseModuleScalarWhereInput>
    OR?: Enumerable<CourseModuleScalarWhereInput>
    NOT?: Enumerable<CourseModuleScalarWhereInput>
    course_instance_id?: StringFilter | string
    module_id?: StringFilter | string
    kind?: StringFilter | string
    points?: IntFilter | number
    start_period?: IntFilter | number
    end_period?: IntFilter | number
  }

  export type CourseInstanceCreateWithoutModulesInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    course: CourseCreateNestedOneWithoutInstancesInput
    examiner: ExaminerCreateNestedOneWithoutCourseInstanceInput
    survey?: SurveyCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedCreateWithoutModulesInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
    survey?: SurveyUncheckedCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateOrConnectWithoutModulesInput = {
    where: CourseInstanceWhereUniqueInput
    create: XOR<CourseInstanceCreateWithoutModulesInput, CourseInstanceUncheckedCreateWithoutModulesInput>
  }

  export type ModuleDatesCreateWithoutModuleInput = {
    primary_date: string
    secondary_date?: string | null
    tertiary_date?: string | null
  }

  export type ModuleDatesUncheckedCreateWithoutModuleInput = {
    primary_date: string
    secondary_date?: string | null
    tertiary_date?: string | null
  }

  export type ModuleDatesCreateOrConnectWithoutModuleInput = {
    where: ModuleDatesWhereUniqueInput
    create: XOR<ModuleDatesCreateWithoutModuleInput, ModuleDatesUncheckedCreateWithoutModuleInput>
  }

  export type CourseInstanceUpsertWithoutModulesInput = {
    update: XOR<CourseInstanceUpdateWithoutModulesInput, CourseInstanceUncheckedUpdateWithoutModulesInput>
    create: XOR<CourseInstanceCreateWithoutModulesInput, CourseInstanceUncheckedCreateWithoutModulesInput>
  }

  export type CourseInstanceUpdateWithoutModulesInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneRequiredWithoutInstancesInput
    examiner?: ExaminerUpdateOneRequiredWithoutCourseInstanceInput
    survey?: SurveyUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateWithoutModulesInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
    survey?: SurveyUncheckedUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourse_instanceInput
  }

  export type ModuleDatesUpsertWithoutModuleInput = {
    update: XOR<ModuleDatesUpdateWithoutModuleInput, ModuleDatesUncheckedUpdateWithoutModuleInput>
    create: XOR<ModuleDatesCreateWithoutModuleInput, ModuleDatesUncheckedCreateWithoutModuleInput>
  }

  export type ModuleDatesUpdateWithoutModuleInput = {
    primary_date?: StringFieldUpdateOperationsInput | string
    secondary_date?: NullableStringFieldUpdateOperationsInput | string | null
    tertiary_date?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ModuleDatesUncheckedUpdateWithoutModuleInput = {
    primary_date?: StringFieldUpdateOperationsInput | string
    secondary_date?: NullableStringFieldUpdateOperationsInput | string | null
    tertiary_date?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseCreateWithoutModuleResultsInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutModuleResultsInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutModuleResultsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutModuleResultsInput, CourseUncheckedCreateWithoutModuleResultsInput>
  }

  export type CourseUpsertWithoutModuleResultsInput = {
    update: XOR<CourseUpdateWithoutModuleResultsInput, CourseUncheckedUpdateWithoutModuleResultsInput>
    create: XOR<CourseCreateWithoutModuleResultsInput, CourseUncheckedCreateWithoutModuleResultsInput>
  }

  export type CourseUpdateWithoutModuleResultsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutModuleResultsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseModuleCreateWithoutDatesInput = {
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
    course_instance: CourseInstanceCreateNestedOneWithoutModulesInput
  }

  export type CourseModuleUncheckedCreateWithoutDatesInput = {
    course_instance_id: string
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
  }

  export type CourseModuleCreateOrConnectWithoutDatesInput = {
    where: CourseModuleWhereUniqueInput
    create: XOR<CourseModuleCreateWithoutDatesInput, CourseModuleUncheckedCreateWithoutDatesInput>
  }

  export type CourseModuleUpsertWithoutDatesInput = {
    update: XOR<CourseModuleUpdateWithoutDatesInput, CourseModuleUncheckedUpdateWithoutDatesInput>
    create: XOR<CourseModuleCreateWithoutDatesInput, CourseModuleUncheckedCreateWithoutDatesInput>
  }

  export type CourseModuleUpdateWithoutDatesInput = {
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    course_instance?: CourseInstanceUpdateOneRequiredWithoutModulesInput
  }

  export type CourseModuleUncheckedUpdateWithoutDatesInput = {
    course_instance_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
  }

  export type ProgrammePlanEntryCreateWithoutProgramme_instanceInput = {
    grade: number
    electivity: Electivity
    programme: ProgrammeCreateNestedOneWithoutProgramme_plansInput
    course: CourseCreateNestedOneWithoutProgramme_planInput
    course_instance: CourseInstanceCreateNestedOneWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput = {
    programme_code: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryCreateOrConnectWithoutProgramme_instanceInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    create: XOR<ProgrammePlanEntryCreateWithoutProgramme_instanceInput, ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput>
  }

  export type ProgrammePlanEntryCreateManyProgramme_instanceInputEnvelope = {
    data: Enumerable<ProgrammePlanEntryCreateManyProgramme_instanceInput>
    skipDuplicates?: boolean
  }

  export type ProgrammePlanEntryUpsertWithWhereUniqueWithoutProgramme_instanceInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    update: XOR<ProgrammePlanEntryUpdateWithoutProgramme_instanceInput, ProgrammePlanEntryUncheckedUpdateWithoutProgramme_instanceInput>
    create: XOR<ProgrammePlanEntryCreateWithoutProgramme_instanceInput, ProgrammePlanEntryUncheckedCreateWithoutProgramme_instanceInput>
  }

  export type ProgrammePlanEntryUpdateWithWhereUniqueWithoutProgramme_instanceInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    data: XOR<ProgrammePlanEntryUpdateWithoutProgramme_instanceInput, ProgrammePlanEntryUncheckedUpdateWithoutProgramme_instanceInput>
  }

  export type ProgrammePlanEntryUpdateManyWithWhereWithoutProgramme_instanceInput = {
    where: ProgrammePlanEntryScalarWhereInput
    data: XOR<ProgrammePlanEntryUpdateManyMutationInput, ProgrammePlanEntryUncheckedUpdateManyWithoutProgrammePlanEntryInput>
  }

  export type ProgrammeCreateWithoutProgramme_plansInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
    courses?: CourseCreateNestedManyWithoutOwnerInput
  }

  export type ProgrammeUncheckedCreateWithoutProgramme_plansInput = {
    code: string
    name_sv: string
    name_en: string
    active?: boolean
    courses?: CourseUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type ProgrammeCreateOrConnectWithoutProgramme_plansInput = {
    where: ProgrammeWhereUniqueInput
    create: XOR<ProgrammeCreateWithoutProgramme_plansInput, ProgrammeUncheckedCreateWithoutProgramme_plansInput>
  }

  export type ProgrammeInstanceCreateWithoutProgrammePlanEntryInput = {
    instance_id: string
    programme_code: string
    admission_year: string
  }

  export type ProgrammeInstanceUncheckedCreateWithoutProgrammePlanEntryInput = {
    instance_id: string
    programme_code: string
    admission_year: string
  }

  export type ProgrammeInstanceCreateOrConnectWithoutProgrammePlanEntryInput = {
    where: ProgrammeInstanceWhereUniqueInput
    create: XOR<ProgrammeInstanceCreateWithoutProgrammePlanEntryInput, ProgrammeInstanceUncheckedCreateWithoutProgrammePlanEntryInput>
  }

  export type CourseCreateWithoutProgramme_planInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutProgramme_planInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutProgramme_planInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutProgramme_planInput, CourseUncheckedCreateWithoutProgramme_planInput>
  }

  export type CourseInstanceCreateWithoutProgramme_plan_entriesInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    course: CourseCreateNestedOneWithoutInstancesInput
    examiner: ExaminerCreateNestedOneWithoutCourseInstanceInput
    survey?: SurveyCreateNestedOneWithoutInstanceInput
    modules?: CourseModuleCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedCreateWithoutProgramme_plan_entriesInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
    survey?: SurveyUncheckedCreateNestedOneWithoutInstanceInput
    modules?: CourseModuleUncheckedCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateOrConnectWithoutProgramme_plan_entriesInput = {
    where: CourseInstanceWhereUniqueInput
    create: XOR<CourseInstanceCreateWithoutProgramme_plan_entriesInput, CourseInstanceUncheckedCreateWithoutProgramme_plan_entriesInput>
  }

  export type ProgrammeUpsertWithoutProgramme_plansInput = {
    update: XOR<ProgrammeUpdateWithoutProgramme_plansInput, ProgrammeUncheckedUpdateWithoutProgramme_plansInput>
    create: XOR<ProgrammeCreateWithoutProgramme_plansInput, ProgrammeUncheckedCreateWithoutProgramme_plansInput>
  }

  export type ProgrammeUpdateWithoutProgramme_plansInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courses?: CourseUpdateManyWithoutOwnerInput
  }

  export type ProgrammeUncheckedUpdateWithoutProgramme_plansInput = {
    code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courses?: CourseUncheckedUpdateManyWithoutOwnerInput
  }

  export type ProgrammeInstanceUpsertWithoutProgrammePlanEntryInput = {
    update: XOR<ProgrammeInstanceUpdateWithoutProgrammePlanEntryInput, ProgrammeInstanceUncheckedUpdateWithoutProgrammePlanEntryInput>
    create: XOR<ProgrammeInstanceCreateWithoutProgrammePlanEntryInput, ProgrammeInstanceUncheckedCreateWithoutProgrammePlanEntryInput>
  }

  export type ProgrammeInstanceUpdateWithoutProgrammePlanEntryInput = {
    instance_id?: StringFieldUpdateOperationsInput | string
    programme_code?: StringFieldUpdateOperationsInput | string
    admission_year?: StringFieldUpdateOperationsInput | string
  }

  export type ProgrammeInstanceUncheckedUpdateWithoutProgrammePlanEntryInput = {
    instance_id?: StringFieldUpdateOperationsInput | string
    programme_code?: StringFieldUpdateOperationsInput | string
    admission_year?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUpsertWithoutProgramme_planInput = {
    update: XOR<CourseUpdateWithoutProgramme_planInput, CourseUncheckedUpdateWithoutProgramme_planInput>
    create: XOR<CourseCreateWithoutProgramme_planInput, CourseUncheckedCreateWithoutProgramme_planInput>
  }

  export type CourseUpdateWithoutProgramme_planInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutProgramme_planInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseInstanceUpsertWithoutProgramme_plan_entriesInput = {
    update: XOR<CourseInstanceUpdateWithoutProgramme_plan_entriesInput, CourseInstanceUncheckedUpdateWithoutProgramme_plan_entriesInput>
    create: XOR<CourseInstanceCreateWithoutProgramme_plan_entriesInput, CourseInstanceUncheckedCreateWithoutProgramme_plan_entriesInput>
  }

  export type CourseInstanceUpdateWithoutProgramme_plan_entriesInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneRequiredWithoutInstancesInput
    examiner?: ExaminerUpdateOneRequiredWithoutCourseInstanceInput
    survey?: SurveyUpdateOneWithoutInstanceInput
    modules?: CourseModuleUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateWithoutProgramme_plan_entriesInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
    survey?: SurveyUncheckedUpdateOneWithoutInstanceInput
    modules?: CourseModuleUncheckedUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateWithoutExaminerInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    course: CourseCreateNestedOneWithoutInstancesInput
    survey?: SurveyCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedCreateWithoutExaminerInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    survey?: SurveyUncheckedCreateNestedOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateOrConnectWithoutExaminerInput = {
    where: CourseInstanceWhereUniqueInput
    create: XOR<CourseInstanceCreateWithoutExaminerInput, CourseInstanceUncheckedCreateWithoutExaminerInput>
  }

  export type CourseInstanceCreateManyExaminerInputEnvelope = {
    data: Enumerable<CourseInstanceCreateManyExaminerInput>
    skipDuplicates?: boolean
  }

  export type CourseInstanceUpsertWithWhereUniqueWithoutExaminerInput = {
    where: CourseInstanceWhereUniqueInput
    update: XOR<CourseInstanceUpdateWithoutExaminerInput, CourseInstanceUncheckedUpdateWithoutExaminerInput>
    create: XOR<CourseInstanceCreateWithoutExaminerInput, CourseInstanceUncheckedCreateWithoutExaminerInput>
  }

  export type CourseInstanceUpdateWithWhereUniqueWithoutExaminerInput = {
    where: CourseInstanceWhereUniqueInput
    data: XOR<CourseInstanceUpdateWithoutExaminerInput, CourseInstanceUncheckedUpdateWithoutExaminerInput>
  }

  export type CourseInstanceUpdateManyWithWhereWithoutExaminerInput = {
    where: CourseInstanceScalarWhereInput
    data: XOR<CourseInstanceUpdateManyMutationInput, CourseInstanceUncheckedUpdateManyWithoutCourseInstanceInput>
  }

  export type ExamThesisCreateWithoutExamsInput = {
    filetype: string
    verified?: boolean
    includes_solution?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamThesisUncheckedCreateWithoutExamsInput = {
    id?: number
    filetype: string
    verified?: boolean
    includes_solution?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamThesisCreateOrConnectWithoutExamsInput = {
    where: ExamThesisWhereUniqueInput
    create: XOR<ExamThesisCreateWithoutExamsInput, ExamThesisUncheckedCreateWithoutExamsInput>
  }

  export type ExamSolutionCreateWithoutExamsInput = {
    filetype: string
    verified?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamSolutionUncheckedCreateWithoutExamsInput = {
    id?: number
    filetype: string
    verified?: boolean
    uploader_id?: string | null
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamSolutionCreateOrConnectWithoutExamsInput = {
    where: ExamSolutionWhereUniqueInput
    create: XOR<ExamSolutionCreateWithoutExamsInput, ExamSolutionUncheckedCreateWithoutExamsInput>
  }

  export type ExamAttachmentCreateWithoutExamsInput = {
    name: string
    filetype: string
    verified?: boolean
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamAttachmentUncheckedCreateWithoutExamsInput = {
    id?: number
    name: string
    filetype: string
    verified?: boolean
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamAttachmentCreateOrConnectWithoutExamsInput = {
    where: ExamAttachmentWhereUniqueInput
    create: XOR<ExamAttachmentCreateWithoutExamsInput, ExamAttachmentUncheckedCreateWithoutExamsInput>
  }

  export type ExamAttachmentCreateManyExamsInputEnvelope = {
    data: Enumerable<ExamAttachmentCreateManyExamsInput>
    skipDuplicates?: boolean
  }

  export type CourseCreateWithoutExamsInput = {
    course_code: string
    name_sv: string
    name_en: string
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutExamsInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutExamsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutExamsInput, CourseUncheckedCreateWithoutExamsInput>
  }

  export type ExamThesisUpsertWithoutExamsInput = {
    update: XOR<ExamThesisUpdateWithoutExamsInput, ExamThesisUncheckedUpdateWithoutExamsInput>
    create: XOR<ExamThesisCreateWithoutExamsInput, ExamThesisUncheckedCreateWithoutExamsInput>
  }

  export type ExamThesisUpdateWithoutExamsInput = {
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    includes_solution?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamThesisUncheckedUpdateWithoutExamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    includes_solution?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamSolutionUpsertWithoutExamsInput = {
    update: XOR<ExamSolutionUpdateWithoutExamsInput, ExamSolutionUncheckedUpdateWithoutExamsInput>
    create: XOR<ExamSolutionCreateWithoutExamsInput, ExamSolutionUncheckedCreateWithoutExamsInput>
  }

  export type ExamSolutionUpdateWithoutExamsInput = {
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamSolutionUncheckedUpdateWithoutExamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader_id?: NullableStringFieldUpdateOperationsInput | string | null
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttachmentUpsertWithWhereUniqueWithoutExamsInput = {
    where: ExamAttachmentWhereUniqueInput
    update: XOR<ExamAttachmentUpdateWithoutExamsInput, ExamAttachmentUncheckedUpdateWithoutExamsInput>
    create: XOR<ExamAttachmentCreateWithoutExamsInput, ExamAttachmentUncheckedCreateWithoutExamsInput>
  }

  export type ExamAttachmentUpdateWithWhereUniqueWithoutExamsInput = {
    where: ExamAttachmentWhereUniqueInput
    data: XOR<ExamAttachmentUpdateWithoutExamsInput, ExamAttachmentUncheckedUpdateWithoutExamsInput>
  }

  export type ExamAttachmentUpdateManyWithWhereWithoutExamsInput = {
    where: ExamAttachmentScalarWhereInput
    data: XOR<ExamAttachmentUpdateManyMutationInput, ExamAttachmentUncheckedUpdateManyWithoutAttachmentsInput>
  }

  export type ExamAttachmentScalarWhereInput = {
    AND?: Enumerable<ExamAttachmentScalarWhereInput>
    OR?: Enumerable<ExamAttachmentScalarWhereInput>
    NOT?: Enumerable<ExamAttachmentScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    filetype?: StringFilter | string
    verified?: BoolFilter | boolean
    uploader?: StringNullableFilter | string | null
    uploaded?: DateTimeFilter | Date | string
    exam_course_code?: StringFilter | string
    exam_date?: StringFilter | string
  }

  export type CourseUpsertWithoutExamsInput = {
    update: XOR<CourseUpdateWithoutExamsInput, CourseUncheckedUpdateWithoutExamsInput>
    create: XOR<CourseCreateWithoutExamsInput, CourseUncheckedCreateWithoutExamsInput>
  }

  export type CourseUpdateWithoutExamsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutExamsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type ExamCreateWithoutThesisInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    solution?: ExamSolutionCreateNestedOneWithoutExamsInput
    attachments?: ExamAttachmentCreateNestedManyWithoutExamsInput
    course: CourseCreateNestedOneWithoutExamsInput
  }

  export type ExamUncheckedCreateWithoutThesisInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    solution_id?: number | null
    attachments?: ExamAttachmentUncheckedCreateNestedManyWithoutExamsInput
  }

  export type ExamCreateOrConnectWithoutThesisInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutThesisInput, ExamUncheckedCreateWithoutThesisInput>
  }

  export type ExamCreateManyThesisInputEnvelope = {
    data: Enumerable<ExamCreateManyThesisInput>
    skipDuplicates?: boolean
  }

  export type ExamUpsertWithWhereUniqueWithoutThesisInput = {
    where: ExamWhereUniqueInput
    update: XOR<ExamUpdateWithoutThesisInput, ExamUncheckedUpdateWithoutThesisInput>
    create: XOR<ExamCreateWithoutThesisInput, ExamUncheckedCreateWithoutThesisInput>
  }

  export type ExamUpdateWithWhereUniqueWithoutThesisInput = {
    where: ExamWhereUniqueInput
    data: XOR<ExamUpdateWithoutThesisInput, ExamUncheckedUpdateWithoutThesisInput>
  }

  export type ExamUpdateManyWithWhereWithoutThesisInput = {
    where: ExamScalarWhereInput
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyWithoutExamsInput>
  }

  export type ExamCreateWithoutSolutionInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis?: ExamThesisCreateNestedOneWithoutExamsInput
    attachments?: ExamAttachmentCreateNestedManyWithoutExamsInput
    course: CourseCreateNestedOneWithoutExamsInput
  }

  export type ExamUncheckedCreateWithoutSolutionInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
    attachments?: ExamAttachmentUncheckedCreateNestedManyWithoutExamsInput
  }

  export type ExamCreateOrConnectWithoutSolutionInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutSolutionInput, ExamUncheckedCreateWithoutSolutionInput>
  }

  export type ExamCreateManySolutionInputEnvelope = {
    data: Enumerable<ExamCreateManySolutionInput>
    skipDuplicates?: boolean
  }

  export type ExamUpsertWithWhereUniqueWithoutSolutionInput = {
    where: ExamWhereUniqueInput
    update: XOR<ExamUpdateWithoutSolutionInput, ExamUncheckedUpdateWithoutSolutionInput>
    create: XOR<ExamCreateWithoutSolutionInput, ExamUncheckedCreateWithoutSolutionInput>
  }

  export type ExamUpdateWithWhereUniqueWithoutSolutionInput = {
    where: ExamWhereUniqueInput
    data: XOR<ExamUpdateWithoutSolutionInput, ExamUncheckedUpdateWithoutSolutionInput>
  }

  export type ExamUpdateManyWithWhereWithoutSolutionInput = {
    where: ExamScalarWhereInput
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyWithoutExamsInput>
  }

  export type ExamCreateWithoutAttachmentsInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis?: ExamThesisCreateNestedOneWithoutExamsInput
    solution?: ExamSolutionCreateNestedOneWithoutExamsInput
    course: CourseCreateNestedOneWithoutExamsInput
  }

  export type ExamUncheckedCreateWithoutAttachmentsInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
    solution_id?: number | null
  }

  export type ExamCreateOrConnectWithoutAttachmentsInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutAttachmentsInput, ExamUncheckedCreateWithoutAttachmentsInput>
  }

  export type ExamUpsertWithoutAttachmentsInput = {
    update: XOR<ExamUpdateWithoutAttachmentsInput, ExamUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<ExamCreateWithoutAttachmentsInput, ExamUncheckedCreateWithoutAttachmentsInput>
  }

  export type ExamUpdateWithoutAttachmentsInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis?: ExamThesisUpdateOneWithoutExamsInput
    solution?: ExamSolutionUpdateOneWithoutExamsInput
    course?: CourseUpdateOneRequiredWithoutExamsInput
  }

  export type ExamUncheckedUpdateWithoutAttachmentsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis_id?: NullableIntFieldUpdateOperationsInput | number | null
    solution_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseCreateWithoutAlternative_examinationsInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutAlternative_examinationsInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutAlternative_examinationsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutAlternative_examinationsInput, CourseUncheckedCreateWithoutAlternative_examinationsInput>
  }

  export type CourseUpsertWithoutAlternative_examinationsInput = {
    update: XOR<CourseUpdateWithoutAlternative_examinationsInput, CourseUncheckedUpdateWithoutAlternative_examinationsInput>
    create: XOR<CourseCreateWithoutAlternative_examinationsInput, CourseUncheckedCreateWithoutAlternative_examinationsInput>
  }

  export type CourseUpdateWithoutAlternative_examinationsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutAlternative_examinationsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseCreateWithoutSurveysInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutSurveysInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutSurveysInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSurveysInput, CourseUncheckedCreateWithoutSurveysInput>
  }

  export type CourseInstanceCreateWithoutSurveyInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    course: CourseCreateNestedOneWithoutInstancesInput
    examiner: ExaminerCreateNestedOneWithoutCourseInstanceInput
    programme_plan_entries?: ProgrammePlanEntryCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedCreateWithoutSurveyInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
    programme_plan_entries?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedCreateNestedManyWithoutCourse_instanceInput
  }

  export type CourseInstanceCreateOrConnectWithoutSurveyInput = {
    where: CourseInstanceWhereUniqueInput
    create: XOR<CourseInstanceCreateWithoutSurveyInput, CourseInstanceUncheckedCreateWithoutSurveyInput>
  }

  export type CourseUpsertWithoutSurveysInput = {
    update: XOR<CourseUpdateWithoutSurveysInput, CourseUncheckedUpdateWithoutSurveysInput>
    create: XOR<CourseCreateWithoutSurveysInput, CourseUncheckedCreateWithoutSurveysInput>
  }

  export type CourseUpdateWithoutSurveysInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutSurveysInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseInstanceUpsertWithoutSurveyInput = {
    update: XOR<CourseInstanceUpdateWithoutSurveyInput, CourseInstanceUncheckedUpdateWithoutSurveyInput>
    create: XOR<CourseInstanceCreateWithoutSurveyInput, CourseInstanceUncheckedCreateWithoutSurveyInput>
  }

  export type CourseInstanceUpdateWithoutSurveyInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneRequiredWithoutInstancesInput
    examiner?: ExaminerUpdateOneRequiredWithoutCourseInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateWithoutSurveyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
    programme_plan_entries?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedUpdateManyWithoutCourse_instanceInput
  }

  export type CourseCreateWithoutDepartmentInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    owner: ProgrammeCreateNestedOneWithoutCoursesInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutDepartmentInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput>
  }

  export type CourseCreateManyDepartmentInputEnvelope = {
    data: Enumerable<CourseCreateManyDepartmentInput>
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutDepartmentInput, CourseUncheckedUpdateWithoutDepartmentInput>
    create: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutDepartmentInput, CourseUncheckedUpdateWithoutDepartmentInput>
  }

  export type CourseUpdateManyWithWhereWithoutDepartmentInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseScalarWhereInput = {
    AND?: Enumerable<CourseScalarWhereInput>
    OR?: Enumerable<CourseScalarWhereInput>
    NOT?: Enumerable<CourseScalarWhereInput>
    course_code?: StringFilter | string
    owner_code?: StringFilter | string
    name_sv?: StringFilter | string
    name_en?: StringFilter | string
    department_id?: IntNullableFilter | number | null
  }

  export type CourseCreateWithoutOwnerInput = {
    course_code: string
    name_sv: string
    name_en: string
    exams?: ExamCreateNestedManyWithoutCourseInput
    department?: DepartmentCreateNestedOneWithoutCourseInput
    instances?: CourseInstanceCreateNestedManyWithoutCourseInput
    surveys?: SurveyCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutOwnerInput = {
    course_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
    exams?: ExamUncheckedCreateNestedManyWithoutCourseInput
    instances?: CourseInstanceUncheckedCreateNestedManyWithoutCourseInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedCreateNestedManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedCreateNestedManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutOwnerInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput>
  }

  export type CourseCreateManyOwnerInputEnvelope = {
    data: Enumerable<CourseCreateManyOwnerInput>
    skipDuplicates?: boolean
  }

  export type ProgrammePlanEntryCreateWithoutProgrammeInput = {
    grade: number
    electivity: Electivity
    programme_instance: ProgrammeInstanceCreateNestedOneWithoutProgrammePlanEntryInput
    course: CourseCreateNestedOneWithoutProgramme_planInput
    course_instance: CourseInstanceCreateNestedOneWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput = {
    programme_instance_id: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryCreateOrConnectWithoutProgrammeInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    create: XOR<ProgrammePlanEntryCreateWithoutProgrammeInput, ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput>
  }

  export type ProgrammePlanEntryCreateManyProgrammeInputEnvelope = {
    data: Enumerable<ProgrammePlanEntryCreateManyProgrammeInput>
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutOwnerInput, CourseUncheckedUpdateWithoutOwnerInput>
    create: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutOwnerInput, CourseUncheckedUpdateWithoutOwnerInput>
  }

  export type CourseUpdateManyWithWhereWithoutOwnerInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutCoursesInput>
  }

  export type ProgrammePlanEntryUpsertWithWhereUniqueWithoutProgrammeInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    update: XOR<ProgrammePlanEntryUpdateWithoutProgrammeInput, ProgrammePlanEntryUncheckedUpdateWithoutProgrammeInput>
    create: XOR<ProgrammePlanEntryCreateWithoutProgrammeInput, ProgrammePlanEntryUncheckedCreateWithoutProgrammeInput>
  }

  export type ProgrammePlanEntryUpdateWithWhereUniqueWithoutProgrammeInput = {
    where: ProgrammePlanEntryWhereUniqueInput
    data: XOR<ProgrammePlanEntryUpdateWithoutProgrammeInput, ProgrammePlanEntryUncheckedUpdateWithoutProgrammeInput>
  }

  export type ProgrammePlanEntryUpdateManyWithWhereWithoutProgrammeInput = {
    where: ProgrammePlanEntryScalarWhereInput
    data: XOR<ProgrammePlanEntryUpdateManyMutationInput, ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_plansInput>
  }

  export type ExamCreateManyCourseInput = {
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
    solution_id?: number | null
  }

  export type CourseInstanceCreateManyCourseInput = {
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
    examiner_cid: string
  }

  export type SurveyCreateManyCourseInput = {
    academic_year: string
    start_period: number
    end_period: number
    language: string
    respondents: number
    responses: number
    answer_frequency: number
    prerequisite_mean: number
    prerequisite_median: number
    goals_mean: number
    goals_median: number
    structure_mean: number
    structure_median: number
    teaching_mean: number
    teaching_median: number
    litterature_mean: number
    litterature_median: number
    assessment_mean: number
    assessment_median: number
    administration_mean: number
    administration_median: number
    workload_mean: number
    workload_median: number
    working_environment_mean?: number | null
    working_environment_median?: number | null
    total_impression_mean: number
    total_impression_median: number
    has_minutes?: boolean
  }

  export type ProgrammePlanEntryCreateManyCourseInput = {
    programme_code: string
    programme_instance_id: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type AlternativeExamCreateManyCourseInput = {
    exam_code: string
    date: string
    academic_year: string
    failed: number
    passed: number
  }

  export type ModuleResultCreateManyCourseInput = {
    date: string
    academic_year: string
    module_id: string
    name: string
    grading_system: GradingSystem
    points: number
    failed: number
    three: number
    four: number
    five: number
  }

  export type ExamUpdateWithoutCourseInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis?: ExamThesisUpdateOneWithoutExamsInput
    solution?: ExamSolutionUpdateOneWithoutExamsInput
    attachments?: ExamAttachmentUpdateManyWithoutExamsInput
  }

  export type ExamUncheckedUpdateWithoutCourseInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis_id?: NullableIntFieldUpdateOperationsInput | number | null
    solution_id?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: ExamAttachmentUncheckedUpdateManyWithoutExamsInput
  }

  export type ExamUncheckedUpdateManyWithoutExamsInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis_id?: NullableIntFieldUpdateOperationsInput | number | null
    solution_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseInstanceUpdateWithoutCourseInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner?: ExaminerUpdateOneRequiredWithoutCourseInstanceInput
    survey?: SurveyUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateWithoutCourseInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
    survey?: SurveyUncheckedUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateManyWithoutInstancesInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    examiner_cid?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyUpdateWithoutCourseInput = {
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
    instance?: CourseInstanceUpdateOneRequiredWithoutSurveyInput
  }

  export type SurveyUncheckedUpdateWithoutCourseInput = {
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SurveyUncheckedUpdateManyWithoutSurveysInput = {
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    respondents?: IntFieldUpdateOperationsInput | number
    responses?: IntFieldUpdateOperationsInput | number
    answer_frequency?: FloatFieldUpdateOperationsInput | number
    prerequisite_mean?: FloatFieldUpdateOperationsInput | number
    prerequisite_median?: FloatFieldUpdateOperationsInput | number
    goals_mean?: FloatFieldUpdateOperationsInput | number
    goals_median?: FloatFieldUpdateOperationsInput | number
    structure_mean?: FloatFieldUpdateOperationsInput | number
    structure_median?: FloatFieldUpdateOperationsInput | number
    teaching_mean?: FloatFieldUpdateOperationsInput | number
    teaching_median?: FloatFieldUpdateOperationsInput | number
    litterature_mean?: FloatFieldUpdateOperationsInput | number
    litterature_median?: FloatFieldUpdateOperationsInput | number
    assessment_mean?: FloatFieldUpdateOperationsInput | number
    assessment_median?: FloatFieldUpdateOperationsInput | number
    administration_mean?: FloatFieldUpdateOperationsInput | number
    administration_median?: FloatFieldUpdateOperationsInput | number
    workload_mean?: FloatFieldUpdateOperationsInput | number
    workload_median?: FloatFieldUpdateOperationsInput | number
    working_environment_mean?: NullableFloatFieldUpdateOperationsInput | number | null
    working_environment_median?: NullableFloatFieldUpdateOperationsInput | number | null
    total_impression_mean?: FloatFieldUpdateOperationsInput | number
    total_impression_median?: FloatFieldUpdateOperationsInput | number
    has_minutes?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgrammePlanEntryUpdateWithoutCourseInput = {
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
    programme?: ProgrammeUpdateOneRequiredWithoutProgramme_plansInput
    programme_instance?: ProgrammeInstanceUpdateOneRequiredWithoutProgrammePlanEntryInput
    course_instance?: CourseInstanceUpdateOneRequiredWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedUpdateWithoutCourseInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_planInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type AlternativeExamUpdateWithoutCourseInput = {
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
  }

  export type AlternativeExamUncheckedUpdateWithoutCourseInput = {
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
  }

  export type AlternativeExamUncheckedUpdateManyWithoutAlternative_examinationsInput = {
    exam_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    passed?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleResultUpdateWithoutCourseInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleResultUncheckedUpdateWithoutCourseInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleResultUncheckedUpdateManyWithoutModuleResultsInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grading_system?: EnumGradingSystemFieldUpdateOperationsInput | GradingSystem
    points?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
  }

  export type ProgrammePlanEntryCreateManyCourse_instanceInput = {
    programme_code: string
    programme_instance_id: string
    course_code: string
    grade: number
    electivity: Electivity
  }

  export type CourseModuleCreateManyCourse_instanceInput = {
    module_id: string
    kind: string
    points: number
    start_period: number
    end_period: number
  }

  export type ProgrammePlanEntryUpdateWithoutCourse_instanceInput = {
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
    programme?: ProgrammeUpdateOneRequiredWithoutProgramme_plansInput
    programme_instance?: ProgrammeInstanceUpdateOneRequiredWithoutProgrammePlanEntryInput
    course?: CourseUpdateOneRequiredWithoutProgramme_planInput
  }

  export type ProgrammePlanEntryUncheckedUpdateWithoutCourse_instanceInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_plan_entriesInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type CourseModuleUpdateWithoutCourse_instanceInput = {
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    dates?: ModuleDatesUpdateOneWithoutModuleInput
  }

  export type CourseModuleUncheckedUpdateWithoutCourse_instanceInput = {
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    dates?: ModuleDatesUncheckedUpdateOneWithoutModuleInput
  }

  export type CourseModuleUncheckedUpdateManyWithoutModulesInput = {
    module_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
  }

  export type ProgrammePlanEntryCreateManyProgramme_instanceInput = {
    programme_code: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type ProgrammePlanEntryUpdateWithoutProgramme_instanceInput = {
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
    programme?: ProgrammeUpdateOneRequiredWithoutProgramme_plansInput
    course?: CourseUpdateOneRequiredWithoutProgramme_planInput
    course_instance?: CourseInstanceUpdateOneRequiredWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedUpdateWithoutProgramme_instanceInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutProgrammePlanEntryInput = {
    programme_code?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type CourseInstanceCreateManyExaminerInput = {
    course_code: string
    study_portal_id: string
    academic_year: string
    start_period: number
    end_period: number
    language: string
  }

  export type CourseInstanceUpdateWithoutExaminerInput = {
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneRequiredWithoutInstancesInput
    survey?: SurveyUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateWithoutExaminerInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    survey?: SurveyUncheckedUpdateOneWithoutInstanceInput
    programme_plan_entries?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourse_instanceInput
    modules?: CourseModuleUncheckedUpdateManyWithoutCourse_instanceInput
  }

  export type CourseInstanceUncheckedUpdateManyWithoutCourseInstanceInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    study_portal_id?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    start_period?: IntFieldUpdateOperationsInput | number
    end_period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
  }

  export type ExamAttachmentCreateManyExamsInput = {
    id?: number
    name: string
    filetype: string
    verified?: boolean
    uploader?: string | null
    uploaded?: Date | string
  }

  export type ExamAttachmentUpdateWithoutExamsInput = {
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttachmentUncheckedUpdateWithoutExamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttachmentUncheckedUpdateManyWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    filetype?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    uploader?: NullableStringFieldUpdateOperationsInput | string | null
    uploaded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamCreateManyThesisInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    solution_id?: number | null
  }

  export type ExamUpdateWithoutThesisInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    solution?: ExamSolutionUpdateOneWithoutExamsInput
    attachments?: ExamAttachmentUpdateManyWithoutExamsInput
    course?: CourseUpdateOneRequiredWithoutExamsInput
  }

  export type ExamUncheckedUpdateWithoutThesisInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    solution_id?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: ExamAttachmentUncheckedUpdateManyWithoutExamsInput
  }

  export type ExamCreateManySolutionInput = {
    course_code: string
    date: string
    academic_year: string
    failed: number
    three: number
    four: number
    five: number
    thesis_id?: number | null
  }

  export type ExamUpdateWithoutSolutionInput = {
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis?: ExamThesisUpdateOneWithoutExamsInput
    attachments?: ExamAttachmentUpdateManyWithoutExamsInput
    course?: CourseUpdateOneRequiredWithoutExamsInput
  }

  export type ExamUncheckedUpdateWithoutSolutionInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    academic_year?: StringFieldUpdateOperationsInput | string
    failed?: IntFieldUpdateOperationsInput | number
    three?: IntFieldUpdateOperationsInput | number
    four?: IntFieldUpdateOperationsInput | number
    five?: IntFieldUpdateOperationsInput | number
    thesis_id?: NullableIntFieldUpdateOperationsInput | number | null
    attachments?: ExamAttachmentUncheckedUpdateManyWithoutExamsInput
  }

  export type CourseCreateManyDepartmentInput = {
    course_code: string
    owner_code: string
    name_sv: string
    name_en: string
  }

  export type CourseUpdateWithoutDepartmentInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    owner?: ProgrammeUpdateOneRequiredWithoutCoursesInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutDepartmentInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateManyWithoutCourseInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    owner_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
  }

  export type CourseCreateManyOwnerInput = {
    course_code: string
    name_sv: string
    name_en: string
    department_id?: number | null
  }

  export type ProgrammePlanEntryCreateManyProgrammeInput = {
    programme_instance_id: string
    course_code: string
    course_instance_id: string
    grade: number
    electivity: Electivity
  }

  export type CourseUpdateWithoutOwnerInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    exams?: ExamUpdateManyWithoutCourseInput
    department?: DepartmentUpdateOneWithoutCourseInput
    instances?: CourseInstanceUpdateManyWithoutCourseInput
    surveys?: SurveyUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateWithoutOwnerInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
    exams?: ExamUncheckedUpdateManyWithoutCourseInput
    instances?: CourseInstanceUncheckedUpdateManyWithoutCourseInput
    surveys?: SurveyUncheckedUpdateManyWithoutCourseInput
    programme_plan?: ProgrammePlanEntryUncheckedUpdateManyWithoutCourseInput
    alternative_examinations?: AlternativeExamUncheckedUpdateManyWithoutCourseInput
    ModuleResults?: ModuleResultUncheckedUpdateManyWithoutCourseInput
  }

  export type CourseUncheckedUpdateManyWithoutCoursesInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    name_sv?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    department_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProgrammePlanEntryUpdateWithoutProgrammeInput = {
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
    programme_instance?: ProgrammeInstanceUpdateOneRequiredWithoutProgrammePlanEntryInput
    course?: CourseUpdateOneRequiredWithoutProgramme_planInput
    course_instance?: CourseInstanceUpdateOneRequiredWithoutProgramme_plan_entriesInput
  }

  export type ProgrammePlanEntryUncheckedUpdateWithoutProgrammeInput = {
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }

  export type ProgrammePlanEntryUncheckedUpdateManyWithoutProgramme_plansInput = {
    programme_instance_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_instance_id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    electivity?: EnumElectivityFieldUpdateOperationsInput | Electivity
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}
-- CreateTable
CREATE TABLE "courses" (
    "course_code" TEXT NOT NULL,
    "owner_code" TEXT NOT NULL,
    "name_sv" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,

    PRIMARY KEY ("course_code")
);

-- CreateTable
CREATE TABLE "course_instances" (
    "course_code" TEXT NOT NULL,
    "study_portal_id" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "start_period" INTEGER NOT NULL,
    "end_period" INTEGER NOT NULL,

    PRIMARY KEY ("course_code","academic_year","start_period","end_period")
);

-- CreateTable
CREATE TABLE "examiners" (
    "cid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "exams" (
    "course_code" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "failed" INTEGER NOT NULL,
    "three" INTEGER NOT NULL,
    "four" INTEGER NOT NULL,
    "five" INTEGER NOT NULL,
    "thesis_id" INTEGER,
    "solution_id" INTEGER,

    PRIMARY KEY ("course_code","date")
);

-- CreateTable
CREATE TABLE "exam_theses" (
    "id" SERIAL NOT NULL,
    "filetype" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "includes_solution" BOOLEAN NOT NULL DEFAULT false,
    "uploader" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_solutions" (
    "id" SERIAL NOT NULL,
    "filetype" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "uploader" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_attachments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "uploader" TEXT,
    "exam_course_code" TEXT NOT NULL,
    "exam_date" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "course_code" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "start_period" INTEGER NOT NULL,
    "end_period" INTEGER NOT NULL,
    "respondents" INTEGER NOT NULL,
    "responses" INTEGER NOT NULL,
    "answer_frequency" DOUBLE PRECISION NOT NULL,
    "prerequisite_mean" DOUBLE PRECISION NOT NULL,
    "prerequisite_median" DOUBLE PRECISION NOT NULL,
    "goals_mean" DOUBLE PRECISION NOT NULL,
    "goals_median" DOUBLE PRECISION NOT NULL,
    "course_structure_mean" DOUBLE PRECISION NOT NULL,
    "course_structure_median" DOUBLE PRECISION NOT NULL,
    "course_teaching_mean" DOUBLE PRECISION NOT NULL,
    "course_teaching_median" DOUBLE PRECISION NOT NULL,
    "course_litterature_mean" DOUBLE PRECISION NOT NULL,
    "course_litterature_median" DOUBLE PRECISION NOT NULL,
    "examination_mean" DOUBLE PRECISION NOT NULL,
    "examination_median" DOUBLE PRECISION NOT NULL,
    "administration_mean" DOUBLE PRECISION NOT NULL,
    "administration_median" DOUBLE PRECISION NOT NULL,
    "workload_mean" DOUBLE PRECISION NOT NULL,
    "workload_median" DOUBLE PRECISION NOT NULL,
    "working_environment_mean" DOUBLE PRECISION,
    "working_environment_median" DOUBLE PRECISION,
    "total_impression_mean" DOUBLE PRECISION NOT NULL,
    "total_impression_median" DOUBLE PRECISION NOT NULL,
    "has_minutes" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("course_code","academic_year","start_period","end_period")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" INTEGER NOT NULL,
    "name_sv" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programmes" (
    "code" TEXT NOT NULL,
    "name_sv" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "log" (
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "cookie" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    PRIMARY KEY ("timestamp")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scans" (
    "title" TEXT NOT NULL,
    "completed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("title","completed")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Replacements" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Replacements_AB_unique" ON "_Replacements"("A", "B");

-- CreateIndex
CREATE INDEX "_Replacements_B_index" ON "_Replacements"("B");

-- AddForeignKey
ALTER TABLE "courses" ADD FOREIGN KEY ("owner_code") REFERENCES "programmes"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD FOREIGN KEY ("thesis_id") REFERENCES "exam_theses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD FOREIGN KEY ("solution_id") REFERENCES "exam_solutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_attachments" ADD FOREIGN KEY ("exam_course_code", "exam_date") REFERENCES "exams"("course_code", "date") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD FOREIGN KEY ("course_code", "academic_year", "start_period", "end_period") REFERENCES "course_instances"("course_code", "academic_year", "start_period", "end_period") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Replacements" ADD FOREIGN KEY ("A") REFERENCES "courses"("course_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Replacements" ADD FOREIGN KEY ("B") REFERENCES "courses"("course_code") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `examiner` on the `exams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "examiner";

-- CreateTable
CREATE TABLE "course_instances" (
    "course_code" TEXT NOT NULL,
    "study_portal_id" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "start_period" INTEGER NOT NULL,
    "end_period" INTEGER NOT NULL,

    PRIMARY KEY ("academic_year","start_period","end_period")
);

-- CreateTable
CREATE TABLE "examiners" (
    "cid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "surveys" (
    "academic_year" TEXT NOT NULL,
    "start_period" INTEGER NOT NULL,
    "end_period" INTEGER NOT NULL,
    "respondents" DECIMAL(65,30) NOT NULL,
    "responses" DECIMAL(65,30) NOT NULL,
    "answer_frequency" DECIMAL(65,30) NOT NULL,
    "prerequisite_mean" DECIMAL(65,30) NOT NULL,
    "prerequisite_median" DECIMAL(65,30) NOT NULL,
    "goals_mean" DECIMAL(65,30) NOT NULL,
    "goals_median" DECIMAL(65,30) NOT NULL,
    "course_structure_mean" DECIMAL(65,30) NOT NULL,
    "course_structure_median" DECIMAL(65,30) NOT NULL,
    "course_teaching_mean" DECIMAL(65,30) NOT NULL,
    "course_teaching_median" DECIMAL(65,30) NOT NULL,
    "course_litterature_mean" DECIMAL(65,30) NOT NULL,
    "course_litterature_median" DECIMAL(65,30) NOT NULL,
    "examination_mean" DECIMAL(65,30) NOT NULL,
    "examination_median" DECIMAL(65,30) NOT NULL,
    "administration_mean" DECIMAL(65,30) NOT NULL,
    "administration_median" DECIMAL(65,30) NOT NULL,
    "workload_mean" DECIMAL(65,30) NOT NULL,
    "workload_median" DECIMAL(65,30) NOT NULL,
    "working_environment_mean" DECIMAL(65,30),
    "working_environment_median" DECIMAL(65,30),
    "total_impression_mean" DECIMAL(65,30) NOT NULL,
    "total_impression_median" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("academic_year","start_period","end_period")
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
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name_sv" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Replacements" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "programmes.code_unique" ON "programmes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_Replacements_AB_unique" ON "_Replacements"("A", "B");

-- CreateIndex
CREATE INDEX "_Replacements_B_index" ON "_Replacements"("B");

-- AddForeignKey
ALTER TABLE "course_instances" ADD FOREIGN KEY ("course_code") REFERENCES "courses"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD FOREIGN KEY ("academic_year", "start_period", "end_period") REFERENCES "surveys"("academic_year", "start_period", "end_period") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Replacements" ADD FOREIGN KEY ("A") REFERENCES "courses"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Replacements" ADD FOREIGN KEY ("B") REFERENCES "courses"("code") ON DELETE CASCADE ON UPDATE CASCADE;

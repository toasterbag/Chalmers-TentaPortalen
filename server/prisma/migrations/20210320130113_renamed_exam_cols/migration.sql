/*
  Warnings:

  - You are about to drop the column `threes` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `fours` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `fives` on the `exams` table. All the data in the column will be lost.
  - Added the required column `three` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `four` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `five` to the `exams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "threes",
DROP COLUMN "fours",
DROP COLUMN "fives",
ADD COLUMN     "three" INTEGER NOT NULL,
ADD COLUMN     "four" INTEGER NOT NULL,
ADD COLUMN     "five" INTEGER NOT NULL;

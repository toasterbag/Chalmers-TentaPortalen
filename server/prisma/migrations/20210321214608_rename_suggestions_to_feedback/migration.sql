/*
  Warnings:

  - You are about to drop the `suggestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "suggestions";

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

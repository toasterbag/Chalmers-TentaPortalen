/*
  Warnings:

  - You are about to drop the `access_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "access_log";

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

-- CreateTable
CREATE TABLE "courses" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "exams" (
    "date" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "failed" INTEGER NOT NULL,
    "threes" INTEGER NOT NULL,
    "fours" INTEGER NOT NULL,
    "fives" INTEGER NOT NULL,
    "examiner" TEXT,

    PRIMARY KEY ("code","date")
);

-- CreateTable
CREATE TABLE "access_log" (
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "cookie" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    PRIMARY KEY ("timestamp")
);

-- AddForeignKey
ALTER TABLE "exams" ADD FOREIGN KEY ("code") REFERENCES "courses"("code") ON DELETE CASCADE ON UPDATE CASCADE;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const logger_1 = require("../logger");
const Log = new logger_1.Logger({ label: "Materials" });
exports.default = async ({ prisma, config }) => {
    Log.info("Scanning git repository for new course material..");
    const repo_dir = process.env.GIT_DIR ?? "";
    const courses = await fs_1.promises.readdir(repo_dir);
    for (const course_code of courses) {
        // Skip .git etc.
        if (course_code.startsWith(".")) {
            continue;
        }
        // Only check folders
        const stat = await fs_1.promises.stat(`${repo_dir}/${course_code}`);
        if (!stat.isDirectory()) {
            continue;
        }
        let files;
        try {
            files = await fs_1.promises.readdir(`${repo_dir}/${course_code}/exams`);
        }
        catch (e) {
            continue;
        }
        for (const file of files) {
            const date = file.substring(0, 10);
            const is_exam = file.replace(/\..*/, "").length == 10;
            const is_solutions = file.substring(10).replace(/\..*/, "") == "-solutions";
            const is_both = file.substring(10).replace(/\..*/, "") == "-with-solutions";
            if (!(is_exam || is_solutions || is_both)) {
                continue;
            }
            const filetype = file.replace(/.*\./, "");
            const dir = `${config.paths.data}/courses/${course_code}/${date}`;
            await fs_1.promises.mkdir(dir, { recursive: true });
            if (is_exam) {
                await fs_1.promises.copyFile(`${repo_dir}/${course_code}/exams/${file}`, `${dir}/exam.${filetype}`);
                const thesis = await prisma.examThesis.create({
                    data: {
                        filetype: filetype,
                        includes_solution: is_both,
                    },
                });
                await prisma.exam.updateMany({
                    data: {
                        thesis_id: thesis.id,
                    },
                    where: {
                        course_code,
                        date,
                    },
                });
            }
            if (is_solutions) {
                await fs_1.promises.copyFile(`${repo_dir}/${course_code}/exams/${file}`, `${dir}/solution.${filetype}`);
                const solution = await prisma.examSolution.create({
                    data: {
                        filetype: filetype,
                    },
                });
                await prisma.exam.updateMany({
                    data: {
                        solution_id: solution.id,
                    },
                    where: {
                        course_code,
                        date,
                    },
                });
            }
        }
    }
    Log.success("Finished scanning the course repository");
};
//# sourceMappingURL=repository.js.map
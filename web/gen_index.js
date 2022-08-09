#!/usr/bin/env node
const locales = [
  {
    lang: "en",
    title: "TentaPortalen",
    description:
      "Find old exams and course statistics at Chalmers University of Technology",
    output: "./dist/index.html",
  },
  {
    lang: "sv",
    title: "TentaPortalen",
    description:
      "Hitta kursstatistik och gamla tentor på Chalmers Tekniska Högskola",
    output: "./dist/index_sv.html",
  },
];

const fs = require("fs");
const index = fs.readFileSync("./dist/index.html");
for (const { lang, title, description, output } of locales) {
  const localizedIndex = index
    .toString()
    .replace("{{LANG}}", lang)
    .replace("{{TITLE}}", title)
    .replace("{{DESCRIPTION}}", description);
  fs.writeFileSync(output, localizedIndex);
}

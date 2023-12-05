import http from "https";
import fs from "fs";

const AOC_SESSION = process.env.AOC_SESSION;
if (!AOC_SESSION) {
    console.error("AOC_SESSION not set");
    process.exit(1);
}

const [, , year, day] = process.argv;
if (!year || !day) {
    console.error("Usage: node download.js <year> <day>");
    process.exit(1);
}

console.log(`Downloading ${year} day ${day}...`);
http.get(
    `https://adventofcode.com/${year}/day/${day}/input`,
    { headers: { cookie: `session=${AOC_SESSION}` } },
    (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            fs.writeFileSync("./src/input.txt", data);
        });
    }
);

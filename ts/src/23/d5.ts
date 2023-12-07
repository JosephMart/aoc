import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
const lines = fs.readFileSync(filePath, "utf-8").split("\n\n");

const [seedsStr, ...mappings] = lines;
const seeds = seedsStr!.split("seeds: ")[1]!.split(" ");
let numberRun = [...seeds];

console.log(`Seeds: ${seeds.join(" ")}`);
const result = mappings.reduce((acc, mapping, iMap) => {
    const newRun: string[] = [];
    const [, ...rows] = mapping.split("\n");
    const parsedMapping = new Mapping();
    for (const row of rows) {
        const [destRangeStart, srcRangeStart, rngLen] = row.split(" ");
        // console.log(
        //     `Mapping ${destRangeStart} -> ${srcRangeStart} (${rngLen})`
        // );
        parsedMapping.addRange(destRangeStart!, srcRangeStart!, rngLen!);
    }
    for (const number of numberRun) {
        newRun.push(parsedMapping.getMappedNumber(number).toString());
    }
    numberRun = newRun;

    if (iMap === mappings.length - 1) {
        return Math.min(...numberRun.map((n) => parseInt(n)));
        // const max = Math.max(...numberRun.map((n) => parseInt(n)));
        // const maxIndex = numberRun.findIndex((n) => parseInt(n) === max);
        // return parseInt(seeds[maxIndex]!);
    }

    return 0;
}, 0);
console.log(result);

class Mapping {
    ranges: Map<`${string}:${string}`, number> = new Map();
    addRange(
        destRangeStartStr: string,
        srcRangeStartStr: string,
        rngLen: string
    ) {
        const srcRangeStart = parseInt(srcRangeStartStr);
        this.ranges.set(
            `${srcRangeStart}:${srcRangeStart + parseInt(rngLen)}`,
            parseInt(destRangeStartStr)
        );
    }

    getMappedNumber(n: string): number {
        const number = parseInt(n);
        const key = [...this.ranges.keys()].find((key) => {
            const [start, end] = key.split(":").map((n) => parseInt(n));

            return number >= start! && number < end!;
        })!;
        const srcRangeStart = this.ranges.get(key);
        if (srcRangeStart === undefined) {
            return number;
        }
        const destRangeStart = parseInt(key.split(":")[0]!);
        return srcRangeStart + (number - destRangeStart);
    }
}

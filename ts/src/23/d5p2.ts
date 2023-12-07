import fs from "fs";

type Range = { start: number; end: number }; // not including end.

// const filePath = "./src/input.txt";
const filePath = "./src/ex.txt";
const lines = fs.readFileSync(filePath, "utf-8").split("\n\n");

const [seedsStr, ...mappings] = lines;
const seedsStrToParse = seedsStr!.split("seeds: ")[1]!.split(" ");
const seeds: Range[] = [];
for (let i = 1; i < seedsStrToParse.length; i += 2) {
    const start = seedsStrToParse[i - 1]!;
    const length = seedsStrToParse[i]!;
    seeds.push({
        start: parseInt(start),
        end: parseInt(start) + parseInt(length),
    });
}

let prevRanges = [seeds[0]!];

console.log(`Seeds: ${seeds.map((s) => `${s.start}:${s.end}`).join(" ")}`);
const result = [mappings[0]!].reduce((acc, mapping, iMap) => {
    const newRun: Range[] = [];
    const [, ...rows] = mapping.split("\n");
    const parsedMapping = new Mapping();
    for (const row of rows) {
        const [destRangeStart, srcRangeStart, rngLen] = row.split(" ");
        parsedMapping.addRange(destRangeStart!, srcRangeStart!, rngLen!);
    }

    for (const range of prevRanges) {
        newRun.push(...parsedMapping.getMappedRanges(range));
    }
    prevRanges = newRun;

    if (iMap === mappings.length - 1) {
        return Math.min(...prevRanges.map((n) => n.start));
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

    parseRange(rangeStr: `${string}:${string}`): Range {
        const [start, end] = rangeStr.split(":").map((n) => parseInt(n)) as [
            number,
            number
        ];
        return { start, end };
    }

    getMappedRanges(baseRange: Range): Range[] {
        const ranges: Range[] = [];
        const srcRanges: Range[] = [];
        const r = { ...baseRange };

        for (const [srcRangeStr, destRangeStart] of this.ranges.entries()) {
            const srcRange = this.parseRange(srcRangeStr);
            // Not overlapping.
            if (srcRange.start >= r.end || srcRange.end <= r.start) {
                continue;
            }

            const start = Math.max(srcRange.start, r.start);
            const end = Math.min(srcRange.end, r.end);
            const newRange = {
                start: destRangeStart + (start - srcRange.start),
                end: destRangeStart + (end - srcRange.start),
            };
            ranges.push(newRange);
        }

        // Find ranges that were not mapped.

        return ranges;
        // const key = [...this.ranges.keys()].find((key) => {
        //     const [start, end] = key.split(":").map((n) => parseInt(n));

        //     return number >= start! && number < end!;
        // })!;
        // const srcRangeStart = this.ranges.get(key);
        // if (srcRangeStart === undefined) {
        //     return number;
        // }
        // const destRangeStart = parseInt(key.split(":")[0]!);
        // return srcRangeStart + (number - destRangeStart);
    }
}

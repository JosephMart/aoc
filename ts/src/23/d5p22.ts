import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
const lines = fs.readFileSync(filePath, "utf-8").split("\n\n");

const [seedsStr, ...mappings] = lines;
const seeds = seedsStr!.split("seeds: ")[1]!.split(" ");

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

    hasMapping(n: string): boolean {
        const number = parseInt(n);
        const key = [...this.ranges.keys()].find((key) => {
            const [start, end] = key.split(":").map((n) => parseInt(n));

            return number >= start! && number < end!;
        })!;
        return key !== undefined;
    }
}

const maps = mappings.reverse().map((mapping) => {
    const [, ...rows] = mapping.split("\n");
    const parsedMapping = new Mapping();
    for (const row of rows) {
        const [srcRangeStart, destRangeStart, rngLen] = row.split(" ");
        parsedMapping.addRange(destRangeStart!, srcRangeStart!, rngLen!);
    }
    return parsedMapping;
});

const seedMapping = new Mapping();
for (let i = 1; i < seeds.length; i += 2) {
    seedMapping.addRange("-1", seeds[i - 1]!, seeds[i]!);
}

function run(i: number): boolean {
    let numberRun = [i.toString()];

    maps.forEach((parsedMapping) => {
        const newRun: string[] = [];
        for (const number of numberRun) {
            newRun.push(parsedMapping.getMappedNumber(number).toString());
        }
        numberRun = newRun;
    });

    return numberRun.some((n) => seedMapping.hasMapping(n));
}

for (let i = 0; i < 111627841; i++) {
    if (run(i)) {
        console.log("Found it!", i); // 69_323_688
        break;
    }
}

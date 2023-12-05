import fs from "fs";

const filePath = "./src/d1.txt";
const lines = fs.readFileSync(filePath, "utf-8").split("\n");

const numMap = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
} as const;

type Extrema = [number, number];
type WordNumber = keyof typeof numMap;
type StringNumber = `${(typeof numMap)[WordNumber]}`;

function parseNum(str: WordNumber | StringNumber): number {
    return numMap[str as WordNumber] ?? parseInt(str, 10);
}

function updateExtrema(
    line: string,
    target: WordNumber | StringNumber,
    min: Extrema,
    max: Extrema
): void {
    const leftIndex = line.indexOf(target);
    if (leftIndex !== -1 && leftIndex < min[1]) {
        min[0] = parseNum(target);
        min[1] = leftIndex;
    }
    const rightIndex = line.lastIndexOf(target);
    if (rightIndex !== -1 && rightIndex > max[1]) {
        max[0] = parseNum(target);
        max[1] = rightIndex;
    }
}

const strings = [
    ...(Object.keys(numMap) as WordNumber[]),
    ...(Object.values(numMap).map((num) => num.toString()) as StringNumber[]),
] as const;

const result = lines.reduce((acc, line) => {
    const min: Extrema = [-1, Number.MAX_SAFE_INTEGER];
    const max: Extrema = [-1, Number.MIN_SAFE_INTEGER];
    strings.forEach((str) => updateExtrema(line, str, min, max));
    return acc + parseInt(`${min[0]}${max[0]}`, 10);
}, 0);
console.log(result);

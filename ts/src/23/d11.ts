import fs from "fs";

const filePath = "./src/input.txt";
const FACTOR = 1_000_000; // Factor of 2 for part 1.
const expandedRows = new Set<number>();
const colsWithGalaxies = new Set<number>();

const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line, y) => {
        const galaxyCount = acc.length;
        line.split("").forEach((char, x) => {
            if (char === "#") {
                acc.push({ x, y });
                colsWithGalaxies.add(x);
            }
        });
        if (acc.length === galaxyCount) expandedRows.add(y);
        return acc;
    }, [] as { x: number; y: number }[])
    .reduce((totalSteps, p0, i, galaxies) => {
        return galaxies.slice(i + 1).reduce((acc, p1) => {
            let steps = 0;
            for (let r = Math.min(p0.y, p1.y); r < Math.max(p0.y, p1.y); r++)
                steps += expandedRows.has(r) ? FACTOR : 1;
            for (let c = Math.min(p0.x, p1.x); c < Math.max(p0.x, p1.x); c++)
                steps += !colsWithGalaxies.has(c) ? FACTOR : 1;
            return acc + steps;
        }, totalSteps);
    }, 0);
console.log(result);

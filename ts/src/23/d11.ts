import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
type Pos = { x: number; y: number };

const expandedRows: number[] = [];
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
        if (acc.length === galaxyCount) {
            expandedRows.push(y);
        }
        return acc;
    }, [] as Pos[])
    .reduce((acc, from, i, galaxies) => {
        return galaxies.slice(i + 1).reduce((acc, to) => {
            return acc + distance(from, to, 1_000_000); // Factor of 2 for part 1.
        }, acc);
    }, 0);

console.log(result);

function distance(p1: Pos, p2: Pos, factor = 2) {
    const r1 = Math.min(p1.y, p2.y);
    const r2 = Math.max(p1.y, p2.y);
    const c1 = Math.min(p1.x, p2.x);
    const c2 = Math.max(p1.x, p2.x);
    let result = 0;
    for (let r = r1; r < r2; r++) {
        result += expandedRows.includes(r) ? factor : 1;
    }
    for (let c = c1; c < c2; c++) {
        result += !colsWithGalaxies.has(c) ? factor : 1;
    }
    return result;
}

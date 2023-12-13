import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
const matrix = (rows: number, cols: number, fill: any = 0) =>
    new Array(cols).fill(fill).map((o, i) => new Array(rows).fill(fill));
const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n\n")
    .reduce((acc, patterStr) => {
        const rowPatterns = patterStr.split("\n");
        return (
            acc +
            findColSymmetry(rowPatterns) +
            findRowSymmetry(rowPatterns) * 100
        );
    }, 0);
console.log(result);

function findRowSymmetry(pattern: string[]): number {
    for (let row = 0; row < pattern.length - 1; row++) {
        let symmetry = true;
        for (let a = row, b = row + 1; a >= 0 && b < pattern.length; a--, b++) {
            if (pattern[a] !== pattern[b]) {
                symmetry = false;
                break;
            }
        }
        if (symmetry) {
            return row + 1;
        }
    }

    return 0;
}

function findColSymmetry(pattern: string[]): number {
    const transposedPattern: string[][] = matrix(
        pattern.length,
        pattern[0]!.length,
        ""
    );
    for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row]!.length; col++) {
            transposedPattern[col]![row] = pattern[row]![col]!;
        }
    }
    return findRowSymmetry(transposedPattern.map((row) => row.join("")));
}

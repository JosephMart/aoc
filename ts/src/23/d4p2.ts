import fs from "fs";

// const filePath = "./src/ex.txt";
const filePath = "./src/input.txt";
const lines = fs.readFileSync(filePath, "utf-8").split("\n");
const copies = Array.from({ length: lines.length }, () => 1);
const result = lines.reduce((acc, line, i) => {
    const [winning, guesses] = line.split(": ")[1]!.split(" | ");

    const winningNums = winning!.split(" ").map((n) => parseInt(n));
    const matches = guesses!.split(" ").reduce((acc, n) => {
        const num = parseInt(n);
        if (!isNaN(num) && winningNums.includes(num)) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const curCopies = copies[i]!;
    for (let iCpy = i + 1; iCpy <= i + matches; iCpy++) {
        copies[iCpy] += curCopies;
    }

    return acc + curCopies;
}, 0);
console.log(result);

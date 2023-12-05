import fs from "fs";

// const filePath = "./src/ex.txt";
const filePath = "./src/input.txt";
const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const [winning, guesses] = line.split(": ")[1]!.split(" | ");
        const winningNums = winning!.split(" ").map((n) => parseInt(n));
        const matches = guesses!.split(" ").reduce((acc, n) => {
            const num = parseInt(n);
            if (!isNaN(num) && winningNums.includes(num)) {
                return acc + 1;
            }
            return acc;
        }, 0);
        if (matches >= 2) {
            return acc + Math.max(2 ** (matches - 1), 0);
        }
        return acc;
    }, 0);
console.log(lines);

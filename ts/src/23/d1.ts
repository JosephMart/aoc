import fs from "fs";

// const filePath = "./src/input.txt";
const filePath = "./src/ex.txt";
const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const n = [...line].filter((char) => !Number.isNaN(parseInt(char)));
        return acc + parseInt(`${n[0]}${n[n.length - 1]}`, 10);
    }, 0);
console.log(lines);

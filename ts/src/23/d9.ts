import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const lastSeq: number[] = [];
        let vals = line.split(" ").map((val) => parseInt(val, 10));

        while (true) {
            lastSeq.push(vals[vals.length - 1]!);
            const currVals = vals;
            vals = [];
            let allZero = true;
            for (let i = 1; i < currVals.length; i++) {
                const computedVal = currVals[i]! - currVals[i - 1]!;
                vals.push(computedVal);
                allZero &&= computedVal === 0;
            }
            if (allZero) {
                break;
            }
        }

        let lastVal = lastSeq[lastSeq.length - 1]!;
        let interpolatedVal = 0;
        for (let i = lastSeq.length - 2; i >= 0; i--) {
            const val = lastSeq[i]!;
            interpolatedVal = lastVal + val;
            lastVal = interpolatedVal;
        }

        return acc + interpolatedVal;
    }, 0);
console.log(lines);

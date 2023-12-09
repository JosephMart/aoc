import fs from "fs";

const filePath = "./src/input.txt";
const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        let vals = line.split(" ").map((val) => +val);
        const lastSeq: number[] = [];

        while (true) {
            lastSeq.push(vals[0]!);
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
            interpolatedVal = val - lastVal;
            lastVal = interpolatedVal;
        }
        return acc + interpolatedVal;
    }, 0);
console.log(result);

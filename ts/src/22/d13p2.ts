import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
type Packet = number | Packet[];
const dividers = { a: [[2]], b: [[6]] };
const result = fs.readFileSync(filePath, "utf-8");

function check(a: any, b: any): number {
    for (let i = 0; i < a.length && i < b.length; i++) {
        if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
            if (a[i] !== b[i]) return a[i] - b[i];
        } else {
            const result = check(
                Number.isInteger(a[i]) ? [a[i]] : a[i],
                Number.isInteger(b[i]) ? [b[i]] : b[i]
            );
            if (result !== 0) return result;
        }
    }
    return a.length - b.length;
}

export function part2(input: string) {
    const divider = [[[2]], [[6]]];
    const list = input
        .replaceAll("\n\n", "\n")
        .split("\n")
        .map((x) => JSON.parse(x))
        .concat(divider)
        .sort((a, b) => check(a, b));
    return divider.map((x) => list.indexOf(x) + 1).reduce((a, b) => a * b);
}

console.log(part2(result));

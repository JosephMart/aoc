import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
type Packet = number | Packet[];
const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n\n")
    .map((unit): { a: Packet[]; b: Packet[] } => {
        const [a, b] = unit.split("\n");
        return { a: eval(a!), b: eval(b!) };
    })
    .reduce((acc, { a, b }, i) => {
        if (areValidPacket(a, b) < 0) {
            console.log("valid", i + 1);
            acc += i + 1;
        }
        return acc;
    }, 0);
console.log(result);

function areValidPacket(a: Packet[], b: Packet[]): number {
    for (let i = 0; i < a.length && i < b.length; i++) {
        const aVal = a[i]!;
        const bVal = b[i]!;

        if (typeof aVal === "number" && typeof bVal === "number") {
            if (aVal !== bVal) {
                return aVal - bVal;
            }
        } else {
            const result = areValidPacket(
                typeof aVal === "number" ? [aVal] : aVal,
                typeof bVal === "number" ? [bVal] : bVal
            );
            if (result !== 0) {
                return result;
            }
        }
    }
    return a.length - b.length;
}

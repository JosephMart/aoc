import fs from "fs";

const filePath = "./src/input.txt";
const path =
    "LRRRLRRLLRRLRRLRRLRRLRLLRLRLLRRLRLRRRLRRLRRLLRLRLRLRRRLRRRLLRLRRRLLRRRLRLLRRRLLRRLRLRLRRRLLRRLRRRLLRRLRLRRRLLRRRLRRLRLRRRLLRRLRRRLRRLLRRLRRLRRRLRRRLRRRLRRLRRRLLRLRLRLRRRLRRLRRRLRRLRLRRLRLRRRLRRRLRRLRRRLLRRRLLRRLRLRRRLRLRLRRRLRLRLRLRRLRLRRLRRLLRRRLRLLRRLRRRLRRRLLRRLRLLLLRRLRRRR".split(
        ""
    ) as ("L" | "R")[];
// const filePath = "./src/ex.txt";
// const path = "RL".split("");
type Node = {
    n: string;
    L: string;
    R: string;
};
const nodes = new Map<string, Node>();
const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;

const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const [n, dirs] = line.split(" = ");
        const [l, r] = dirs!.replace("(", "").replace(")", "").split(", ");
        const node: Node = { n: n!, L: l!, R: r! };
        nodes.set(n!, node);
        if (n![2] === "A") {
            acc.push(node);
        }
        return acc;
    }, [] as Node[])
    .reduce((acc, node) => {
        let steps = 0;
        while (true) {
            if (node?.n[2] === "Z") {
                return lcm(acc, steps);
            }
            node = nodes.get(node[path[steps++ % path.length]!])!;
        }
    }, 1);

console.log(result);

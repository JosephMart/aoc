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

const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const [n, dirs] = line.split(" = ");
        const [l, r] = dirs!.replace("(", "").replace(")", "").split(", ");
        const node: Node = { n: n!, L: l!, R: r! };
        nodes.set(n!, node);
        if (n === "AAA") {
            acc.push(node);
        }
        return acc;
    }, [] as Node[])
    .reduce((_, node) => {
        let steps = 0;
        while (true) {
            if (node?.n === "ZZZ") {
                return steps;
            }
            node = nodes.get(node[path[steps++ % path.length]!])!;
        }
    }, 0);

console.log(result);

import fs from "fs";

// const filePath = "./src/ex.txt";
const filePath = "./src/input.txt";
type Op = { value: number; newMonkey: number };

class Monkey {
    inspections = 0;
    constructor(
        public id: number,
        public items: number[],
        public operation: (old: number) => number,
        public test: (n: number) => number
    ) {}

    worry(old: number) {
        return old % LCM;
    }

    runTurn(): Op[] {
        const ops: Op[] = [];
        while (this.items.length > 0) {
            this.inspections++;
            let item = this.items.shift()!;
            item = this.worry(item);
            item = this.operation(item);
            ops.push({ value: item, newMonkey: this.test(item) });
        }

        return ops;
    }

    print() {
        console.log(`Monkey ${this.id}: ${this.items}`);
    }
}

const divsNums: number[] = [];

const monkies: Monkey[] = fs
    .readFileSync(filePath, "utf-8")
    .split("\n\n")
    .map((line, i) => {
        const [, itemsStr, operationStr, testStr, trueStr, falseStr] =
            line.split("\n");

        const op = operationStr?.split("= ")![1]!;
        const operation = (old: number) => {
            return eval(op.replaceAll("old", `${old}`));
        };

        const divsNum = parseInt(testStr!.split("  Test: divisible by ")[1]!);
        divsNums.push(divsNum);
        const trueResult = parseInt(
            trueStr!.split("    If true: throw to monkey ")![1]!
        );
        const falseResult = parseInt(
            falseStr!.split("    If false: throw to monkey ")![1]!
        );
        const test = (n: number) => {
            return n % divsNum === 0 ? trueResult : falseResult;
        };
        return new Monkey(
            i,
            itemsStr?.split(": ")[1]!.split(", ").map(Number)!,
            operation,
            test
        );
    });

const LCM = getLCM(divsNums);

for (let round = 0; round < 10000; round++) {
    for (const monkey of monkies) {
        const ops = monkey.runTurn();
        for (const op of ops) {
            monkies[op.newMonkey]!.items.push(op.value);
        }
    }
}
console.log(monkies.forEach((m) => m.print()));

const [a, b, ...rest] = monkies.map((m) => m.inspections).sort((a, b) => b - a);
console.log(a! * b!);

export function getLCM(divisors: number[]) {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let lcm = 1;

    for (const divisor of divisors) {
        lcm = (lcm * divisor) / gcd(lcm, divisor);
    }

    return lcm;
}

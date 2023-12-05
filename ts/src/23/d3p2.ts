import fs from "fs";

const filePath = "./src/input.txt";
const lines = fs.readFileSync(filePath, "utf-8").split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    for (let j = 0; j < line.length; j++) {
        const char = line[j]!;
        if (char !== "*") {
            continue;
        }

        const nums = new Set<number>();
        for (let iFind = -1; iFind <= 1; iFind++) {
            const iTarget = i + iFind;
            if (iTarget < 0 || iTarget >= lines.length) {
                continue;
            }
            for (let jFind = -1; jFind <= 1; jFind++) {
                const jTarget = j + jFind;
                if (jTarget < 0 || jTarget >= line.length) {
                    continue;
                }

                if (iFind === 0 && jFind === 0) {
                    continue;
                }

                const numInRange = parseInt(lines[iTarget]![jTarget]!);
                if (Number.isNaN(numInRange)) {
                    continue;
                }

                // Find the number at the target.
                const num = [lines[iTarget]![jTarget]!];

                // Group left
                let jScan = jTarget - 1;
                while (jScan >= 0) {
                    const char = lines[iTarget]![jScan]!;
                    if (Number.isNaN(parseInt(char))) {
                        break;
                    }
                    num.unshift(char);
                    jScan--;
                }

                // Group right
                jScan = jTarget + 1;
                while (jScan < lines.length) {
                    const char = lines[iTarget]![jScan]!;
                    if (Number.isNaN(parseInt(char))) {
                        break;
                    }
                    num.push(char);
                    jScan++;
                }

                nums.add(parseInt(num.join("")));
            }
        }
        if (nums.size === 1) {
            continue;
        }

        sum += [...nums].reduce((acc, num) => {
            return acc * num;
        }, 1);
    }
}

console.log(sum);

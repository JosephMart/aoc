import fs from "fs";

const AIR = ".";
const ROCK = "#";
const SAND = "o";
const matrix = (rows: number, cols: number, fill: any = 0) =>
    new Array(cols).fill(fill).map((o, i) => new Array(rows).fill(fill));

const filePath = "./src/input.txt";
const floor = 170;
// const filePath = "./src/ex.txt";
// const floor = 11;
let yMaxMax = 0;
let xMaxMax = 0;

const cave = matrix(3000, 600, AIR);
fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .forEach((line) => {
        const vals = line
            .split(" -> ")
            .map((coord) => coord.split(",").map((c) => parseInt(c, 10))) as [
            number[],
            number[]
        ];

        for (let i = 1; i < vals.length; i++) {
            const [x0, y0] = vals[i - 1] as [number, number];
            const [x1, y1] = vals[i] as [number, number];

            xMaxMax = Math.max(xMaxMax, Math.max(x0, x1));
            yMaxMax = Math.max(yMaxMax, Math.max(y0, y1));

            if (x0 === x1) {
                const yMin = Math.min(y0, y1);
                const yMax = Math.max(y0, y1);
                for (let y = yMin; y <= yMax; y++) {
                    cave[y]![x0] = ROCK;
                }
            } else {
                const xMin = Math.min(x0, x1);
                const xMax = Math.max(x0, x1);

                for (let x = xMin; x <= xMax; x++) {
                    cave[y0]![x] = ROCK;
                }
            }
        }
    });

// Fill the floor with rock.
for (let x = 0; x < cave[0]!.length; x++) {
    cave[floor]![x] = ROCK;
}

let sandUnits = 0;
let sandFalling = true;

while (sandFalling) {
    let sandResting = false;
    let curr = { x: 500, y: 0 };
    while (!sandResting) {
        // Fall down.
        if (cave[curr.y + 1]![curr.x] === AIR) {
            curr.y++;
            continue;
        }

        // Fall down and left.
        if (cave[curr.y + 1]![curr.x - 1] === AIR) {
            curr.x--;
            curr.y++;
            continue;
        }

        // Fall down and right.
        if (cave[curr.y + 1]![curr.x + 1] === AIR) {
            curr.x++;
            curr.y++;
            continue;
        }

        // Can't fall down, so rest.
        sandResting = true;
        sandUnits++;
        cave[curr.y]![curr.x] = SAND;
    }

    // Check if we can fill.
    sandFalling =
        sandFalling &&
        [cave[1]![500], cave[1]![499], cave[1]![501], cave[0]![500]].some(
            (c) => c === AIR
        );
}

console.log(sandUnits, yMaxMax, xMaxMax);
console.log(cave.map((row) => row.join("")).join("\n"));

import fs from "fs";

const filePath = "./src/22/ex.txt";
// const filePath = "./src/22/input.txt";
const [mapStr, pathStr] = fs.readFileSync(filePath, "utf-8").split("\n\n");
if (!mapStr || !pathStr) {
    throw new Error("Invalid input");
}

type PathCmd = [number, string];
class Path {
    cmds: PathCmd[];
    constructor(public pathStr: string) {
        this.cmds = [];
        let currNum = "";
        for (const char of pathStr) {
            if (Number.isNaN(parseInt(char))) {
                this.cmds.push([parseInt(currNum, 10), char]);
                currNum = "";
            } else {
                currNum += char;
            }
        }
    }
}

enum Direction {
    N,
    E,
    S,
    W,
}

class MonkeyMap {
    currDirection = Direction.E; // 0 = N, 1 = E, 2 = S, 3 = W
    readonly currPos: [number, number];
    map: string[][];

    moveMap = {
        [Direction.N]: this.moveNorth.bind(this),
        [Direction.E]: this.moveEast.bind(this),
        [Direction.S]: this.moveSouth.bind(this),
        [Direction.W]: this.moveWest.bind(this),
    } as const;

    constructor(public mapStr: string) {
        this.map = mapStr.split("\n").map((line) => line.split(""));
        this.currPos = [
            0,
            this.map[0]?.findIndex((char) => char !== "#" && char !== " ") ??
                -1,
        ];
        if (this.currPos[1] === -1) {
            throw new Error("Invalid starting position");
        }
    }

    move([steps, rotate]: PathCmd) {
        console.log(
            "MOVE",
            steps,
            rotate,
            Direction[this.currDirection],
            this.currPos
        );
        this.markCurPos();
        // Handle steps.
        this.moveMap[this.currDirection](steps);

        // Handle rotation to update this.currDirection.
        const numRotations = rotate === "L" ? -1 : 1;
        this.currDirection = (this.currDirection + numRotations + 4) % 4;

        console.log("RESULT", this.currPos, this.currDirection);
    }

    markCurPos() {
        this.map[this.currPos[0]]![this.currPos[1]] = {
            [Direction.N]: "^",
            [Direction.E]: ">",
            [Direction.S]: "v",
            [Direction.W]: "<",
        }[this.currDirection];
    }

    moveEast(steps: number) {
        let stepsMoved = 0;
        const currRow = this.map[this.currPos[0]];
        if (!currRow) {
            throw new Error("Invalid row");
        }
        while (stepsMoved < steps) {
            const nextPos = currRow[(this.currPos[1] + 1) % currRow.length]!;

            // We have hit a road block.
            if (nextPos === "#") {
                return;
            }
            this.currPos[1] = (this.currPos[1] + 1) % currRow.length;
            // Only increment stepsMoved if we moved to a new position. Wrap if at end of row. Ignore if a space.
            if (nextPos === ".") {
                this.markCurPos();
                stepsMoved++;
            }
        }
    }

    moveWest(steps: number) {
        let stepsMoved = 0;
        const currRow = this.map[this.currPos[0]];
        if (!currRow) {
            throw new Error("Invalid row");
        }
        while (stepsMoved < steps) {
            const nextPos =
                currRow[
                    (this.currPos[1] - 1 + currRow.length) % currRow.length
                ]!;

            // We have hit a road block.
            if (nextPos === "#") {
                return;
            }
            this.currPos[1] =
                (this.currPos[1] - 1 + currRow.length) % currRow.length;
            // Only increment stepsMoved if we moved to a new position. Wrap if at end of row. Ignore if a space.
            if (nextPos === ".") {
                this.markCurPos();
                stepsMoved++;
            }
        }
    }

    moveNorth(steps: number) {
        let stepsMoved = 0;
        while (stepsMoved < steps) {
            const nextPos = this.map[this.currPos[0] - 1]?.[this.currPos[1]]!;
            // We have hit a road block.
            if (nextPos === "#") {
                return;
            }
            this.currPos[0]--;
            // Only increment stepsMoved if we moved to a new position. Ignore if a space.
            if (nextPos === ".") {
                this.markCurPos();
                stepsMoved++;
            }
        }
    }

    moveSouth(steps: number) {
        let stepsMoved = 0;
        let lastPos = -1;
        while (stepsMoved < steps) {
            // (this.currPos[1] - 1 + currRow.length) % currRow.length
            const nextPos =
                this.map[(this.currPos[0] + 1) % this.map.length]?.[
                    this.currPos[1]
                ]!;
            // We have hit a road block.
            if (nextPos === "#") {
                return;
            }
            this.currPos[0] = (this.currPos[0] + 1) % this.map.length;
            // Only increment stepsMoved if we moved to a new position. Ignore if a space.
            if (nextPos === ".") {
                stepsMoved++;
            }
            this.markCurPos();
            this.print();
        }
    }

    currentChar() {
        const char = this.map[this.currPos[0]]![this.currPos[1]]!;
        if (char === " ") {
            return "<SPACE>";
        }
        return char;
    }

    print() {
        console.log(`-------------------
${this.map.map((row) => row.join("")).join("\n")}`);
    }
}

const path = new Path(pathStr);
const map = new MonkeyMap(mapStr);

for (const cmd of path.cmds) {
    map.move(cmd);
}

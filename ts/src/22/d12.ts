import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
type Coord = { x: number; y: number; z: number };
type SearchCoord = Coord & { steps: number };

const start = { x: 0, y: 0, z: 0 };
const end = { x: 0, y: 0, z: 0 };

const maze = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line, x) => {
        return [...line].map((char, y) => {
            switch (char) {
                case "S":
                    start.x = x;
                    start.y = y;
                    start.z = "a".charCodeAt(0);
                    return start;
                case "E":
                    end.x = x;
                    end.y = y;
                    end.z = "z".charCodeAt(0);
                    return end;
                default:
                    return { x, y, z: char.charCodeAt(0) };
            }
        });
    });

function find() {
    const queue: SearchCoord[] = [{ ...start, steps: 0 }];
    const visited = new Set<`${string},${string}`>([`${start.x},${start.y}`]);

    while (queue.length > 0) {
        console.log(...queue);
        const curr = queue.shift()!;
        if (curr.x === end.x && curr.y === end.y) {
            return curr.steps;
        }

        const neighbors = [
            maze[curr.x - 1]?.[curr.y],
            maze[curr.x + 1]?.[curr.y],
            maze[curr.x]?.[curr.y - 1],
            maze[curr.x]?.[curr.y + 1],
        ]
            .filter((coord): coord is SearchCoord =>
                Boolean(coord && !visited.has(`${coord.x},${coord.y}`))
            )
            .filter((coord) => coord.z - curr.z <= 1)
            .map((coord) => ({ ...coord, steps: curr.steps + 1 }));
        neighbors.forEach((coord) => visited.add(`${coord.x},${coord.y}`));
        queue.push(...neighbors);
    }
}

console.log("result", find());

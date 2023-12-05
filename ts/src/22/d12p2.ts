import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
type Coord = { x: number; y: number; z: number };
type SearchCoord = { item: Coord; steps: number };

const starts: Coord[] = [];
const end = { x: 0, y: 0, z: 0 };

const maze = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line, x) => {
        return [...line].map((char, y) => {
            switch (char) {
                case "E":
                    end.x = x;
                    end.y = y;
                    end.z = "z".charCodeAt(0);
                    return end;
                default:
                    const coord = { x, y, z: char.charCodeAt(0) };
                    if (char === "S" || char === "a") {
                        coord.z = "a".charCodeAt(0);
                        starts.push(coord);
                    }
                    return coord;
            }
        });
    });

function find() {
    const queue: SearchCoord[] = starts.map((start) => ({
        item: start,
        steps: 0,
    }));
    const visited = new Set<`${string},${string}`>(
        starts.map((start): `${string},${string}` => `${start.x},${start.y}`)
    );

    while (queue.length > 0) {
        const { item: curr, steps } = queue.shift()!;
        if (curr.x === end.x && curr.y === end.y) {
            return steps;
        }

        const neighbors = [
            maze[curr.x - 1]?.[curr.y],
            maze[curr.x + 1]?.[curr.y],
            maze[curr.x]?.[curr.y - 1],
            maze[curr.x]?.[curr.y + 1],
        ]
            .filter((coord): coord is Coord =>
                Boolean(coord && !visited.has(`${coord.x},${coord.y}`))
            )
            .filter((coord) => coord.z - curr.z <= 1)
            .map((coord) => ({ item: coord, steps: steps + 1 }));
        neighbors.forEach(({ item }) => visited.add(`${item.x},${item.y}`));
        queue.push(...neighbors);
    }
}

console.log("result", find());

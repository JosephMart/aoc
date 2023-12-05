import fs from "fs";

type ColorMap = {
    red: number;
    green: number;
    blue: number;
};
type Color = keyof ColorMap;
const sum = fs
    .readFileSync("./src/input.txt", "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const colorCounts: ColorMap = {
            red: 0,
            green: 0,
            blue: 0,
        };
        line.split(":")[1]!
            .split(";")
            .forEach((set) => {
                set.split(",").forEach((colorUnit) => {
                    const [count, color] = colorUnit.trim().split(" ");
                    const num = parseInt(count!);
                    if (colorCounts[color as Color] < num) {
                        colorCounts[color as Color] = num;
                    }
                });
            });
        return (
            acc +
            colorCounts["red"] * colorCounts["green"] * colorCounts["blue"]
        );
    }, 0);

console.log(sum);

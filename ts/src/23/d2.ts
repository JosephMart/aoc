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
    .reduce((sum, line, gameID) => {
        const result = line
            .split(":")[1]!
            .split(";")
            .every((set) => {
                const colorCounts: ColorMap = {
                    red: 0,
                    green: 0,
                    blue: 0,
                };
                set.split(",").forEach((colorUnit) => {
                    const [count, color] = colorUnit.trim().split(" ");
                    colorCounts[color as Color] += parseInt(count!);
                });
                return (
                    colorCounts["red"] <= 12 &&
                    colorCounts["green"] <= 13 &&
                    colorCounts["blue"] <= 14
                );
            })
            ? gameID + 1
            : 0;

        return sum + result;
    }, 0);

console.log(sum);

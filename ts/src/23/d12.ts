import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";
const PART_2 = true;
const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        let [conditionsStr, groupsStr] = line.split(" ") as [string, string];

        if (PART_2) {
            groupsStr = Array(5).fill(groupsStr).join(",");
            conditionsStr = Array(5).fill(conditionsStr).join("?");
        }

        const groups = groupsStr!.split(",").map((group) => +group);
        return (
            // Add an undamaged at the end to terminate the consecutiveCounts.
            acc + getCounts(new Map(), `${conditionsStr}.`, groups, 0, 0, 0, "")
        );
    }, 0);

function getCounts(
    cache: Map<string, number>,
    line: string,
    groups: number[],
    position: number,
    consecutiveCount: number,
    groupIndex: number,
    currentString: string
): number {
    let count = 0;
    const key = `${position}:${consecutiveCount}:${groupIndex}`;
    if (cache.has(key)) {
        return cache.get(key)!;
    }

    // Reached the end.
    if (position === line.length) {
        return groupIndex === groups.length ? 1 : 0;
    }

    if (line[position] === ".") {
        if (consecutiveCount === groups[groupIndex]) {
            // A valid end of a sequence of undamaged.
            count = getCounts(
                cache,
                line,
                groups,
                position + 1,
                0,
                groupIndex + 1,
                currentString + "."
            );
        } else if (consecutiveCount === 0) {
            // Start or continue a sequence of damaged.
            count = getCounts(
                cache,
                line,
                groups,
                position + 1,
                consecutiveCount,
                groupIndex,
                currentString + "."
            );
        } else {
            // Invalid end of a sequence of damaged.
            count = 0;
        }
    } else if (line[position] === "#") {
        // Add an undamaged to continue/start the consecutive count.
        count = getCounts(
            cache,
            line,
            groups,
            position + 1,
            consecutiveCount + 1,
            groupIndex,
            currentString + "#"
        );
        // Handle wildcard.
    } else {
        // Simulate #.
        count += getCounts(
            cache,
            line,
            groups,
            position + 1,
            consecutiveCount + 1,
            groupIndex,
            currentString + "#"
        );
        // Simulate .
        if (consecutiveCount === groups[groupIndex]) {
            // Ending a sequence of undamaged.
            count += getCounts(
                cache,
                line,
                groups,
                position + 1,
                0,
                groupIndex + 1,
                currentString + "."
            );
        } else if (consecutiveCount === 0) {
            // Start or continue a sequence of damaged.
            count += getCounts(
                cache,
                line,
                groups,
                position + 1,
                consecutiveCount,
                groupIndex,
                currentString + "."
            );
        }
    }
    cache.set(key, count);
    return count;
}
console.log(result);

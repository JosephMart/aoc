import * as esbuild from "esbuild";
import path from "path";
import buildSettings from "./settings.js";

import esbuildPluginTsc from "esbuild-plugin-tsc";

const dirName = path.dirname(new URL(import.meta.url).pathname);
export function createBuildSettings(options) {
    return {
        // files: ["src/**/*.test.ts", "src/**/*.spec.ts"],
        entryPoints: [path.resolve(dirName, "src/**/*.ts")],

        outdir: "dist",
        plugins: [
            esbuildPluginTsc({
                force: true,
            }),
        ],
        ...options,
    };
}
// await esbuild.build(createBuildSettings());
await esbuild.build(createBuildSettings());

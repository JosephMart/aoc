// import esbuildPluginTsc from "esbuild-plugin-tsc";

// export function createBuildSettings(options) {
//     return {
//         entryPoints: ["src/main.ts"],
//         outfile: "www/bundle.js",
//         bundle: true,
//         plugins: [
//             esbuildPluginTsc({
//                 force: true,
//             }),
//         ],
//         ...options,
//     };
// }

import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
    files: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    plugins: [esbuildPlugin({ ts: true })],
};

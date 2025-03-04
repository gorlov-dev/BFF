import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs"; // yarn add @rollup/plugin-commonjs --dev --ignore-workspace-root-check
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import terser from "@rollup/plugin-terser"; // https://www.npmjs.com/package/@rollup/plugin-terser
import json from "@rollup/plugin-json";
import { visualizer } from "rollup-plugin-visualizer";
import del from "rollup-plugin-delete"; // https://www.npmjs.com/package/rollup-plugin-delete
// import babel from "@rollup/plugin-babel"; // https://www.npmjs.com/package/@rollup/plugin-swc

export default function ({ serviceName }) {
    const arr = [
        // Для обработки Node.js модулей // подключение модулей node
        // locates a module in the project's node_modules directory
        nodeResolve({
            preferBuiltins: true,
        }),

        // подключение модулей commonjs // по умолчанию работает с esm
        // Для корректной обработки CommonJS модулей // преобразования CommonJS-модулей в ES-модули
        commonJs(),

        // babel({
        //     babelHelpers: "bundled",
        //     presets: ["@babel/preset-env"],
        // }),

        dynamicImportVars({
            warnOnError: true, // Показывает предупреждения, если переменные не могут быть обработаны
        }),

        terser({
            ecma: 2024, // 2020
            // ECMAScript 2024 (ES15)
            // Начиная с ES6, версии обозначаются по году выпуска (ES2020, ES2021)

            format: {
                comments: false, // Удаление комментариев
            },
        }),

        json(),

        visualizer({
            filename: "dist-report/main.html", // Имя выходного файла
            open: true, // Автоматически открывает отчет в браузере
            template: "treemap", // default
            // template: "sunburst", // Граф в формате "солнечной диаграммы"
            // template: "network",
            // template: "raw-data", // json
            // template: "list",
        }),
    ];

    if (serviceName === "main") {
        arr.push(
            del({
                targets: "dist/*",
                runOnce: true,
                // verbose: false, // default
            })
        );
    }

    return arr;
}

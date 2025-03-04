import rollup_external from "./rollup/rollup_external.js";
import rollup_plugins from "./rollup/rollup_plugins.js";

// ------------------- build (run)
// rollup -c
// -------------------

const output = {
    dir: "dist", // Выходная папка // multi files
    format: "esm", // "cjs",

    // compact: true, // Генерация компактного кода
    // Не выполняется сокращение имён переменных.
    // Не удаляются неиспользуемые функции или код.
    // Уровень сжатия гораздо ниже, чем у полноценной минификации (например, с Terser, SWC или esbuild).
};

export default [
    // ------------------------------------------------ 1 Main

    {
        input: "src/main.js", // Входной файл
        output,
        external: rollup_external,

        plugins: [...rollup_plugins({ serviceName: "main" })],

        // logLevel: "info", // Показывает информацию и предупреждения
        // logLevel: 'warn', // Показывает предупреждения
    },

    // ------------------------------------------------ 2 ...

    // ...
];

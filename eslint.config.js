import globals from "globals"; // https://www.npmjs.com/package/globals
import Prettier from "eslint-plugin-prettier"; // https://www.npmjs.com/package/eslint-plugin-prettier
import Jsdoc from "eslint-plugin-jsdoc"; // https://www.npmjs.com/package/eslint-plugin-jsdoc
import Import from "eslint-plugin-import"; // https://www.npmjs.com/package/eslint-plugin-import
import N from "eslint-plugin-n"; // https://www.npmjs.com/package/eslint-plugin-n
import JS from "@eslint/js"; // https://eslint.org/docs/latest/use/getting-started
import Promise from "eslint-plugin-promise"; // https://www.npmjs.com/package/eslint-plugin-promise

const config = [
    {
        ignores: [
            // ----------------- root

            ".idea/**",
            "dist/**",
            "dist-report/**",
            "docs/**",
            "node_modules/**",
            "public/**",

            // -----------------

            "**/old/**",
            "**/test/**",
            "**/info/**",
        ],
    },

    // ----------------------------------- eslint plugins

    JS.configs.recommended, // flat
    // Prettier.configs.recommended,
    // N.configs["flat/recommended-module"],
    // Jsdoc.configs["flat/recommended"],
    // Import.flatConfigs.recommended, // flat
    // Promise.configs["flat/recommended"],

    // -----------------------------------

    {
        // files: ["**/*.js"], // Применяется ко всем JavaScript файлам
        files: ["**/*.{js,mjs,cjs}"],

        languageOptions: {
            // parser: "@typescript-eslint/parser", // Подключаем парсер для TS

            ecmaVersion: "latest", // Поддержка современных возможностей JavaScript
            sourceType: "module", // Для использования ECMAScript модулей (ESM)

            globals: {
                ...globals.node, // NodeJS
                // console: "readonly", // Указывает, что `console` доступен глобально
            },
        },

        // plugins: {
        //     prettier: Prettier,
        //     n: N,
        //     jsdoc: Jsdoc,
        //     import: Import,
        // },

        rules: {
            // ----------------------------------------
            // "no-console": "off" // Запретить console (Отключено)
            // "no-undef": "error",  // Проверяет, что все переменные определены
            // "no-unused-vars": "off",
            // ---------------------------------------- import
            // "import/no-dynamic-require": "warn",
            // "import/no-nodejs-modules": "warn",
            // "import/no-unresolved": "error",
            // "import/order": [
            //     "error",
            //     {
            //         groups: [
            //             ["builtin", "external"],
            //             ["internal", "parent", "sibling", "index"],
            //         ],
            //         "newlines-between": "always",
            //     },
            // ],
            // ----------------------------------------
        },
    },
];

// -------------------------------------------------------

// console.log(config);

// -------------------------------------------------------
// const arr = [
//     Prettier,
//     N,
//     JS,
//     Jsdoc,
//     Import,
//     Promise,
// ];
// arr.forEach((module, i) => {
//     console.log(i, module);
//     // console.log(i, module.configs);
//     // console.log(module.configs.recommended);
//     console.log("------");
// });
// -------------------------------------------------------

export default config;

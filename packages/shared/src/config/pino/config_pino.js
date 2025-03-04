import setServer_path from "../setServer_path.js";
// import { transformLogs } from "1-set-bot/src/server/setServer_pino_fn.js";

export default {
    // pino: (thread = "0-main") => {
    pino: (thread = "0-main") => {
        let filePath = setServer_path.log;

        return {
            base: undefined, // экономит место
            // base: { pid: true, hostname: true },

            timestamp: () => `,"t":"  ${new Date(Date.now()).toISOString().replace("T", "  ")}  "`, // UTC
            // timestamp: pino.stdTimeFunctions.isoTime, // требует import pino from "pino";

            transport: {
                targets: [
                    // ---------------------------

                    {
                        target: "pino/file",
                        options: {
                            destination: filePath + thread + "-all.json",
                            mkdir: true,

                            // append: true, // Дописывать в Файл
                            append: false, // НЕ дописывать в файл = создавать новый

                            sync: true, // замедляет выполнение, но уменьшает риск потерять логи при сбое.
                            // sync: false, // логирование быстрее, но записи могут быть утеряны при сбое.
                        },
                        // level: "---", // all
                        // filter: (log) => log.level === 30, // Фильтруем только level: info (30)
                    },

                    {
                        target: "pino/file",
                        options: {
                            destination: filePath + thread + "-err.json",
                            mkdir: true,
                            append: false,

                            sync: true, // замедляет выполнение, но уменьшает риск потерять логи при сбое.
                            // sync: false, // логирование быстрее, но записи могут быть утеряны при сбое.
                        },
                        level: "error",
                    },

                    // --------------------------- Вывод в консоль

                    {
                        target: "pino-pretty",
                        options: {
                            colorize: true,
                            translateTime: "yyyy-mm-dd HH:MM:ss",
                            ignore: "pid,hostname",
                        },
                        level: "error",
                    },

                    // ---------------------------
                ],
            },
            // hooks: {
            //     logMethod(inputArgs, method) {
            //         // Преобразуем лог перед записью
            //         const [message] = inputArgs;
            //         if (typeof message === "object") {
            //             inputArgs[0] = transformLogs(message);
            //         }
            //         method.apply(this, inputArgs);
            //     },
            // },
        };
    },

    // pinoDestination: {
    //     dest: log + "err.log", // omit for stdout
    //
    //     minLength: 4096, // Buffer before writing
    //
    //     sync: false, // Asynchronous logging
    // },
};

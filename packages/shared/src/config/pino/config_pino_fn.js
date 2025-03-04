// Функция для форматирования stack
function formatStackTrace(stackTrace) {
    const lines = stackTrace.split("\n");
    const basePath = "file:///Users/gorlov/bot/packages";

    const formattedLines = lines.map((line) => {
        const match = line.match(/(at .+?)(\s+\(file:\/\/.+?)(:\d+:\d+\))/);
        if (match) {
            const [_, left, filePath, position] = match;
            // Убираем базовый путь и экранирование символов
            const decodedFilePath = decodeURIComponent(filePath).replace(basePath, "");
            const formattedFilePath = decodedFilePath.padEnd(60, " "); // Выравниваем имя файла
            // Форматируем строку с отступами
            return `${left.padEnd(30, " ")}${formattedFilePath}${position}`;
        }
        return line.trim(); // Для первой строки с описанием ошибки
    });

    return {
        stack: formattedLines,
    };
}

// Модификатор для обработки логов
function transformLogs(log) {
    if (log.err && log.err.stack) {
        const formattedStack = formatStackTrace(log.err.stack);
        log.err.stack = formattedStack.stack; // Преобразуем stack
    }
    return log;
}

export { transformLogs };

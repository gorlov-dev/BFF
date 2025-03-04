import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "./userTypeDefs";

// Создаём исполняемую схему
const schema = makeExecutableSchema({ typeDefs });

// -------------------------------------- Кастомные моки (статические данные)

import { mockRandomData as mocks } from "../userMock.js";

// Добавляем моки
const mockedSchema = addMocksToSchema({ schema, mocks });

// -------------------------------------- автоматическая генерация Mock

// Добавляем моки
// const mockedSchema = addMocksToSchema({ schema });

// --------------------------------------

export { mockedSchema };

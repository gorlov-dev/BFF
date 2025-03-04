import { ApolloServer } from "apollo-server-fastify";
import { mockedSchema as schema } from "abe-bff/src/entitys/user/graphql/userSchemaMocked.js";

class Apollo {
    constructor() {
        this.apolloServer = new ApolloServer({ schema });
    }
    start() {
        return this.apolloServer
            .start()
            .then(() => {
                return this.apolloServer;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

const apollo = new Apollo();

export default apollo;

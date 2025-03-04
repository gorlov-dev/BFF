import { createFastifyServer } from "./http/fastify/fastify.js";

const fastify = await createFastifyServer();

const port = 3000;

fastify.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`🚀 Server ready at ${address}/graphql`);
});

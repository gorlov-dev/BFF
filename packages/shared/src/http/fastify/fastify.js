import Fastify from "fastify";
import { createApolloServer } from "../../graphql/apollo.js";

export async function createFastifyServer() {
    const fastify = Fastify();
    const apolloServer = await createApolloServer();

    fastify.register(apolloServer.createHandler(), { prefix: "/graphql" });

    return fastify;
}

// --------------------------------------------------

import Fastify from "fastify";

// --------------------------------------------------

import g_log from "1-global-bot/src/g_log.js";

import setServer_path from "1-setServer-bot/src/setServer_path.js";
import setServer_fastify from "1-setServer-bot/src/setServer_fastify.js";

// -------------------------------------------------- plugins

import cors from "@fastify/cors";
// import compress from "@fastify/compress";
// import helmet from "@fastify/helmet";
import staticFolder from "@fastify/static";

// --------------------------------------------------

import addRoutes from "http-bot/src/fastify/routes.js";

// --------------------------------------------------

class FastifyServer {
    constructor() {
        this.path = setServer_path;
        let fastify = Fastify(setServer_fastify.conf);

        this.port = setServer_fastify.port;
        this.fastify = fastify;

        this.plugins();
        if (setServer_path.os === "mac") this.staticFolder();
        this.addRoutes();
        // this.systemRoute();
    }

    plugins(fastify = this.fastify) {
        // ------------------------------------ cors

        fastify.register(cors, { origin: "*" });

        // ------------------------------------ compress

        // fastify.register(compress);

        // ------------------------------------ helmet

        //  fastify.register(helmet, { crossOriginResourcePolicy: false }); // contentSecurityPolicy: false,
    }

    staticFolder(fastify = this.fastify) {
        // ------------------------------------ staticFolder (Dev Only!) | Prod === nginx
        const opt = {
            /** Папка с файлами | внимательно проверь путь, либо 404 */
            // root: this.path.commonAssets,
            root: this.path.public,
            // root: join(__dirname, "data"),
            // root: "/Users/gorlov/root/node/bot/packages/1-tools-bot/src/assets",

            /** false = Не показывать index.html по умолчанию */
            // index: false,
            // index: true,

            /** Включить листинг папок */
            list: true,
            // list: false,

            /** prefix не задан значит считаем путь от корня "/"
             * prefix: "/", === default "/" */
            // prefix: "/assets/", // prefix: "/src/",

            /** ??? */
            // constraints: { host: "example.com" }, // optional: default {}
        };

        fastify.register(staticFolder, opt);

        g_log.info({ FastifyServer: "staticFolder Work!", opt });
    }

    // systemRoute(fastify = this.fastify) {
    //
    // -------------------------------------------- robots | Prod === nginx
    // fastify.get("/robots.txt", (req, res) => {
    //     let path = "../robots.txt";
    //     const file = createReadStream(path); // stream
    //     //const file = fs.readFileSync(path);
    //     res.type("text/html").send(file);
    //     //res.sendFile(path); // not work!!!
    // });
    // }

    listen(port = this.port) {
        this.fastify.listen({ port }, (err, address) => {
            // fastify.listen(port, "127.0.0.1", (err, address) => { // old

            if (err) {
                g_log.error({ FastifyServer: "⭕ [ERR] listen", err });
                throw err;
                // process.exit(1); /////////////////////////////////////////////// !!! .exit(1) !!!
            }

            g_log.info({ FastifyServer: `[OK] listen: ${address} ------------------` });
        });
    }
}

// --------------------------------------------------

FastifyServer.prototype.addRoutes = addRoutes;

export default FastifyServer;

// --------------------------------------------------

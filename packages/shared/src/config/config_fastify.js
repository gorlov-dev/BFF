export default {
    port: 3000, // process.env.PORT

    conf: {
        // // --- LOG
        // logger: true,    // pino         // fastify.log.info('Incoming request at /'); // вместо console.log()
        //
        // // --- HTTP2     // * работает без HTTPS, но not supported by browsers // only microservices
        // http2: true,
        //
        // // --- HTTPS
        // https: {
        //     // --- HTTP1
        //     allowHTTP1: false, // fallback support for HTTP1
        //     // -----
        //     //cert: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.cert")),
        //     //     cert: fs.readFileSync(certPath + "fullchain.pem"),
        //     // -----
        //     //key: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.key")),
        //     //     key: fs.readFileSync(certPath + "privkey.pem"),
        // },
    },
};

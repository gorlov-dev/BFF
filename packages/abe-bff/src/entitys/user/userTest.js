import request from "supertest";
import { createFastifyServer } from "../src/server/fastify.js";

let fastify;
let serverUrl;

beforeAll(async () => {
    fastify = await createFastifyServer();
    await fastify.listen({ port: 0 });
    serverUrl = `http://localhost:${fastify.server.address().port}`;
});

afterAll(async () => {
    await fastify.close();
});

describe("GraphQL Mock API", () => {
    it("should return a mocked user", async () => {
        const query = `
      query {
        user(id: "1") {
          id
          name
          email
          age
        }
      }
    `;

        const res = await request(serverUrl).post("/graphql").send({ query });

        expect(res.status).toBe(200);
        expect(res.body.data.user).toHaveProperty("id");
        expect(res.body.data.user).toHaveProperty("name");
        expect(res.body.data.user).toHaveProperty("email");
        expect(res.body.data.user).toHaveProperty("age");
    });

    it("should return a list of mocked users", async () => {
        const query = `
      query {
        users {
          id
          name
          email
          age
        }
      }
    `;

        const res = await request(serverUrl).post("/graphql").send({ query });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data.users)).toBe(true);
        expect(res.body.data.users.length).toBeGreaterThan(0);
        expect(res.body.data.users[0]).toHaveProperty("id");
        expect(res.body.data.users[0]).toHaveProperty("name");
        expect(res.body.data.users[0]).toHaveProperty("email");
        expect(res.body.data.users[0]).toHaveProperty("age");
    });
});

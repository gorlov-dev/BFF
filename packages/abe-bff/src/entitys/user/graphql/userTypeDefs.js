import { gql } from "apollo-server-fastify";

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Query {
        user(id: ID!): User
        users: [User]
    }
`;

export default typeDefs;

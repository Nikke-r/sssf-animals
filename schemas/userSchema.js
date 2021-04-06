import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: ID!
    username: String!
    token: String
  }

  extend type Query {
    login(username: String!, password: String!): User
  }

  extend type Mutation {
    register(username: String!, password: String!): User
  }
`;
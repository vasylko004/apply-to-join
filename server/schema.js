var { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  input ApplyToJoinInput {
    name: String,
    email: String,
    phone: String,
    address: String,
    zipCode: String,
    attachments: [Upload]
  }

  type CreateRequest {
      message: String
  }

  type Query {
    hello: String
  }

  type Mutation {
      applyToJoin(data: ApplyToJoinInput!): CreateRequest
  }
`;

module.exports = typeDefs
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    userName: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: String
  }

   input bookInput{
    bookId: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Query {
    users: [User]
    me: User
    user(username: String!):User
    userById(_id: ID!): User
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!):Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
  }

`;

module.exports = typeDefs;
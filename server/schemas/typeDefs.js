const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    userName: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!)
  }

  type Query {
    addUser: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!)
  }

  type Book {
    bookId: ID
    title: String
    author: String
    description: String
    image: String
    link: String
  }

  type Query {
    saveBook: [Book]
    }

  type Mutation {
    saveBook(input: bookInput): User
  }

  type Query {
    removeBook
  }

  type Mutation {
    removeBook(bookId: String!): User
  }

  type Auth {
    token: String
    user: String
  }

   input bookInput{
    bookId: ID
    title: String
    author: String
    description: String
    image: String
    link: String
  }
  }
`;

module.exports = typeDefs;
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
    author: String
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
    author: String
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
    addUser(username: String!, email: String!, password: String!)
    login(email: String!, password: String!):Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
  }
}
`;

module.exports = typeDefs;
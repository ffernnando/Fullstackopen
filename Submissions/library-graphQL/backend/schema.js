const typeDefs = `
  
  type Book {
    title: String!
    published: String
    author: Author!
    genres: [String]
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
    
  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    booksByGenre(genre: String!): [Book!]!
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: String!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`
module.exports = typeDefs
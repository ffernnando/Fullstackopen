import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query{
    allBooks{
      title
      published
      genres
      author {
        name
        born
        bookCount
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name,
        born
        bookCount
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: String!){
    editAuthor(
      name: $name
      setBornTo: $born    
    ) {
      name
      born
      bookCount  
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(
      username: $username
      password: $password
    ) {
      value  
    }
  }
`
export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!){
    booksByGenre(
      genre: $genre
    ) {
      title
      published
      genres
      author {
        name
        born
        bookCount
      }  
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
        born
        bookCount
      }  
    }
  }
`
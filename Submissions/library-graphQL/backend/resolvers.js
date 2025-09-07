require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError, subscribe } = require('graphql')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => {
      return await Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      let bookList = await Book.find({})
      if (args.author) {
        bookList = bookList.filter(b => b.author === args.author)
      }
      if (args.genre) {
        bookList = bookList.filter(b => b.genres.includes(args.genre))
      }
      return Promise.all(bookList.map(async b => b.populate('author')))
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    booksByGenre: async (root, args) => {
      console.log('agrs.genre: ', args.genre)
      const bookList = args.genre ? await Book.find({ genres: args.genre }) : await Book.find({})
      console.log('bookList: ', bookList)
      return Promise.all(bookList.map(async b => b.populate('author'))) 
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Missing authorization!', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      console.log('args.author: ', args.author)

      let newBook = new Book()

      let newAuthor = await Author.findOne({ name: args.author })
      if (!newAuthor) {
        newAuthor = new Author({
          name: args.author,
          born: null
        })
      }
      newAuthor.authorOf = newAuthor.authorOf.concat(newBook._id)

      console.log('newAuthor: ', newAuthor)
      //need to return the type of "Book", whose "author" field should be of the type "Author" => populate it?
      newBook.set({
        title: args.title,
        author: newAuthor._id,
        published: args.published,
        genres: args.genres
      })

      console.log('newBook: ', newBook)

      try {
        const resAuth = await newAuthor.save() 
      } catch (error) {
        throw new GraphQLError('Saving new author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      
      try {
        const savedBook = await newBook.save()
        const populatedBook = await savedBook.populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
        return await populatedBook
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Missing authorization!', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const { name, setBornTo } = args
      let newAuthor = await Author.findOne({ name: name })
      console.log('newAuthor: ', newAuthor)
      if (!newAuthor) {
        return null
      }

      newAuthor.born = setBornTo

      try {
        const resAuth = await newAuthor.save()
        console.log('resAuth: ', resAuth)
        return resAuth
      } catch (error) {
        throw new GraphQLError('Saving changes failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try {
        return await newUser.save()
      } catch (error) {
        throw new GraphQLError('User creation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },

    login: async (root, args) => {
      //username, password
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password123') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = { username: user.username, id: user._id }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log('📡 Client subscribed to BOOK_ADDED')
        return pubsub.asyncIterableIterator('BOOK_ADDED')
      }
    },
  },
  Author: {
    bookCount: async (root) => root.authorOf.length
  }
}
module.exports = resolvers
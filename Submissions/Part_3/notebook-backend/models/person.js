const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB: ', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: [
      {
        validator: function(value) {
          if(value.length >= 8){return true}else{return false}
        },
        message: 'Phone number must have a length of 8 or more'
      },
      {
        validator: function(value) {
          const separated = value.split('-')
          const twoParts = separated.length === 2
          const firstPart = !isNaN(separated[0]) && (separated[0].length === 2 || separated[0].length === 3)
          const secondPart = !isNaN(separated[1])

          return twoParts && firstPart && secondPart
        },
        message: 'Phone number must be formed of two parts separated by "-", the first part has two or three numbers and the second part also consists of numbers'
      }
    ]
  }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

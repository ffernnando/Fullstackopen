const mongoose = require('mongoose')
require('dotenv').config()

if(process.argv.length < 3 ){
  console.log('give password as argument')
  process.exit(1)
}


const name = process.argv[2]
const number = process.argv[3]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  number: String,
  name: String,
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
  number: number,
  name: name
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('this is happening')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()  // also good to clean up
  })
}else{
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    console.log('length of args: ', process.argv.length)
  })
}
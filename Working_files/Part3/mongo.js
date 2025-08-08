const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ffernnando192:${password}@cluster0.wpeiig4.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
//Moj string: mongodb+srv://ffernnando192:<db_password>@cluster0.wpeiig4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Trvth nvke',
  important: true,
})

Note.find({important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */
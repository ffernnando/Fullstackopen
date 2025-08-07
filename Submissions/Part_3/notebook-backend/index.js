const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())

morgan.token("body", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : ""
})

//app.use(morgan("tiny"))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.send(persons)
})

app.get("/info", (request, response) => {
    const personCount = persons.length
    const currDate = new Date()
    const data = `<div><p>Phonebook has info for ${personCount} people</p><p>${currDate}</p></div>`
    
    response.send(data)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const requestedPerson = persons.find(person => person.id === id)
    if(!requestedPerson){
        response.status(404).end()
        console.log(`Person with the id ${id} does not exist`)
    }else{
        response.send(requestedPerson)
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({ error : "missing name or number" })
    }
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({ error: "name must be unique" })
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: String(Math.floor(Math.random() * 10000 + 1)),
    }
    persons = persons.concat(newPerson)
    console.log(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
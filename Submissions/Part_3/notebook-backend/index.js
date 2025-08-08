require("dotenv").config()
const express = require("express")
const morgan = require("morgan")


const app = express()
app.use(express.json())
app.use(express.static("dist"))


const Person = require("./models/person")

//------------------------------------------------ MORGAN CONFIG ---------------------------------------------------------
//app.use(morgan("tiny"))
morgan.token("body", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : ""
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// ----------------------------------------------------- Get ALL PERSONS -----------------------------------------------------
app.get("/api/persons", (request, response, next) => {
    console.log("This is getting called")
    Person.find({})
        .then(result => {
            console.log("this is working: ", result)
            response.json(result)
        })
        .catch(error =>{
            next(error)
        })
})

// -------------------------------------------------------- INFO PAGE --------------------------------------------------------
app.get("/info", (request, response) => {
    Person.countDocuments({}).then(result => {
        const personCount = result
        const currDate = new Date()
        const data = `<div><p>Phonebook has info for ${personCount} people</p><p>${currDate}</p></div>`
    
        response.send(data)
    })
    
})

// -------------------------------------------------------- SEARCH person by ID --------------------------------------------------------
app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if(!person){
                return response.status(404).end()
            }
            response.json(person)
        })
        .catch(error =>{
            next(error)
        })
})

// ------------------------------------------------------ DELETE person ------------------------------------------------------
app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log("ID: ", request.params.id)
            response.status(204).end()
        })
        .catch(error =>{
            next(error)
        })
    
})

// ------------------------------------------------------ ADD person ------------------------------------------------------
app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: "missing name or number" })
    }

    Person.exists({ name: body.name }).then(exists => {
        if (exists) {
            return response.status(400).json({ error: "name must be unique" })
        }
        const person = new Person({
            name: body.name,
            number: body.number
        })

        person.save().then(savedPerson => response.json(savedPerson))
    })
})

// ------------------------------------------ CHANGE existing person's phonenubmer ------------------------------------------
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    Person.findById(request.params.id)
        .then(person => {
            person.number = body.number
            person.save()
                .then(savedChange => {
                    response.json(savedChange)
                })

        })
        .catch(error => {
            next(error)
        })
})


// ---------------------------------------------------- ERROR HANDLING ----------------------------------------------------
const errorHandler = (error, request, response, next ) => {
    console.error(error.message)
    if(error.name === "CastError"){
        return response.status(400).send({error: "malformatted id"})
    }
}

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
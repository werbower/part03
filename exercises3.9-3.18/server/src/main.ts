
import express, { ErrorRequestHandler } from 'express'
import { Person, state } from './state.js'
import morgan from 'morgan'
import { join } from 'path'
import { mongoService } from './mongo.js'

const app = express()

const clientPath = join(import.meta.dirname, '../client')
console.log('client path', clientPath)
app.use(express.static(clientPath))

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    const allTokens = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if (req.method === 'POST') allTokens.push(JSON.stringify(req.body))
    return allTokens.join(' ')
}, { stream: process.stdout }))



app.get('/api/persons', (req, res, next) => {
    mongoService.getAllPersons().then(persons => {
        res.json(persons)
    }).catch(e => next(e))
})

app.get('/api/persons/:id', async (req, res) => {
    const id = req.params.id
    const person = await mongoService.getPerson(id)
    if (!person)
        return res.status(404).end()
    res.send({id : person._id, name: person.name, number: person.number})
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    mongoService.deletePerson(id).then((result) => {
        if (!result) return res.status(404).end()

        res.status(204).end()
    }).catch(e => next(e))


})

app.post('/api/persons', (req, res, next) => {
    const body: Partial<Person> = req.body

    if (!body.name)
        return res.status(422).json({ message: 'name is required' })
    if (!body.number)
        return res.status(422).json({ message: 'number is required' })

    mongoService.postNewPerson(body as Person).then(result => {
        res.status(201).json(result as Person)
    }).catch(e => {
        if (e.code == 11000) {
            return res.status(422).json({ message: `can't process payload` })
        }
        next(e)
    })

})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body: Partial<Person> = req.body

    mongoService.putPerson(id, body as Person).then(result => {
        if (!result) return res.status(404).end()
        res.status(200).json(result as Person)
    }).catch(e => {
        if (e.code == 11000) {
            return res.status(422).json({ message: `can't process payload` })
        }
        next(e)
    })

})

app.get('/info', async (req, res) => {
    res.send(`<div>Phone book has info for ${await mongoService.countPerson()} people</div><br>
        <div>${(new Date()).toString()}</div>`)
})


const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({message: err.message})
    }
    res.status(500).end()
}
app.use(errHandler)





const port = process.env.PORT || 3001
app.listen(port, () => console.log(`app listening on port ${port}`))

import express from 'express'
import { state } from './state.js'

const app = express()

app.get('/api/persons', (req, res) => {
    res.json(state.persons)
})

app.get('/api/persons/:id', (req, res)=> {
    const id = req.params.id
    const person = state.persons.find(item=> item.id === id)
    if (!person) 
        return res.status(404).end()
    res.send(person)
})

app.delete('/api/persons/:id', (req, res)=> {
    state.persons = state.persons.filter(item=> item.id !== req.params.id)

    res.status(204).end()
})

app.get('/info', (req, res)=> {
    res.send(`<div>Phone book has info for ${state.persons.length} people</div><br>
        <div>${(new Date()).toString()}</div>`)
})





const port = 3001
app.listen(port, ()=> console.log(`app listening on port ${port}`))
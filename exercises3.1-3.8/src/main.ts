
import express from 'express'
import { state } from './state.js'

const app = express()

app.get('/api/persons', (req, res) => {
    res.json(state.persons)
})

app.get('/info', (req, res)=> {
    res.send(`<div>Phone book has info for ${state.persons.length} people</div><br>
        <div>${(new Date()).toString()}</div>`)
})

const port = 3001
app.listen(port, ()=> console.log(`app listening on port ${port}`))
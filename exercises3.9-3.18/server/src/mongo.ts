
import 'dotenv/config'
import mongoose from 'mongoose'



const connString = process.env.MONGODBSTRING as string

mongoose.set('strictQuery', false)
mongoose.connect(connString, { family: 4 })

const person = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', person)

export const mongoService = {
    getAllPersons: ()=> {
        return Person.find({}).then(result => {
            console.log('found result ', result)
            return result
        })
    }
}



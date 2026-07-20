
import 'dotenv/config'
import mongoose from 'mongoose'



const connString = process.env.MONGODBSTRING as string

mongoose.set('strictQuery', false)
mongoose.connect(connString, { family: 4 })
type TPerson = { _id?: string, name: string, number: string }

const person = new mongoose.Schema<TPerson>({
    name: String,
    number: String
})
const Person = mongoose.model<TPerson>('Person', person)

export const mongoService = {
    getAllPersons: () => {
        return Person.find({})
    },
    postNewPerson: (item: TPerson) => {
        const newPerson = new Person(item)
        return newPerson.save()
            .then(result => {
                console.log('created ', result)
                return result
            })
    }


}



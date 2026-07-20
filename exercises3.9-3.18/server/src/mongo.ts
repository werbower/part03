
import 'dotenv/config'
import mongoose from 'mongoose'



const connString = process.env.MONGODBSTRING as string

mongoose.set('strictQuery', false)
mongoose.connect(connString, { family: 4 })
type TPerson = { _id?: string, name: string, number: string }

const person = new mongoose.Schema<TPerson>({
    name: {type: String, required: true, unique: true},
    number: {type: String, required: true, unique: true}
})
const Person = mongoose.model<TPerson>('Person', person)

export const mongoService = {
    getAllPersons: () => {
        return Person.find({})
    },
    postNewPerson: (item: TPerson) => {
        const newPerson = new Person(item)
        return newPerson.save()
            
    },
    putPerson: async (id: string, item: TPerson) => {
        const putPerson = await Person.findById(id)
        if (!putPerson) return putPerson
        if (Object.hasOwn(item, 'name')) putPerson.name = item.name
        if (Object.hasOwn(item, 'number')) putPerson.number = item.number
        return putPerson.save()
            
    },
    deletePerson: (id: string)=> {
        return Person.findByIdAndDelete(id)
        .then(result => {
            console.log('deleted ', result)
            return result
        })
    },
    getPerson: (id: string)=> Person.findById(id),
    countPerson: ()=> Person.countDocuments({})


}



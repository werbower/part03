
import 'dotenv/config'
import mongoose from 'mongoose'




const [db_pass_val, name_val, number_val] = process.argv.slice(2)
const connString = `mongodb+srv://werMongoAdmin:${db_pass_val}@cluster0.8ke5b6u.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(connString, { family: 4 })

const person = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', person)

if (!!name_val) {
    const person = new Person({
        name: name_val,
        number: number_val
    })
    person.save().then(()=> {
        console.log(`added ${name_val} number ${number_val} to phonebook`)
        mongoose.connection.close()
    })
}

if (!name_val) {

    Person.find({}).then(result => {
        if (result?.length){
            console.log('phonebook:')
            result.forEach(person => console.log(`${person.name} ${person.number}`))
        }
        mongoose.connection.close()
    })
}

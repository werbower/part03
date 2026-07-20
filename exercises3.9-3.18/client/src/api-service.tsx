import axios from "axios"
import type { Person } from "./App"


const baseUrl = '/api/persons'

export const apiService = {
    get: ()=> axios.get(baseUrl).then(response => 
        response.data.map((item: ApiPerson )=> mapApiPerson(item)) as Person[]),

    put: (person: Person)=> axios.put(`${baseUrl}/${person.id}`, person).then(response => mapApiPerson(response.data) as Person),

    post: (person: Omit<Person, 'id'>)=> axios.post(baseUrl, person).then(response => mapApiPerson(response.data as ApiPerson) as Person),

    delete: (id: string)=> axios.delete(`${baseUrl}/${id}`).then(response=> mapApiPerson(response.data as ApiPerson) as Person)


}

type ApiPerson = {_id: string, name: string, number: string}
const mapApiPerson = (item: ApiPerson): Person  => ({id: item._id as string, name: item.name as string, number: item.number as string} as Person)

import axios from "axios"
import type { Person } from "./App"


const baseUrl = '/api/persons'

export const apiService = {
    get: ()=> axios.get(baseUrl).then(response => response.data as Person[]),

    put: (person: Person)=> axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data as Person),

    post: (person: Omit<Person, 'id'>)=> axios.post(baseUrl, person).then(response => response.data as Person),

    delete: (id: string|number)=> axios.delete(`${baseUrl}/${id}`).then(response=> response.data)


}
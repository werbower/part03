
export type Person = { id: string, name: string, number: string }

const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  const newId = '' + Math.round(Math.random() * 999999)
  while (persons.find(item => item.id === newId)) return generateId()
  return newId
}

export const state = {
  persons, generateId
}
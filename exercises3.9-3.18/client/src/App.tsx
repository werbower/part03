import { useEffect, useState, type SubmitEvent } from "react"
import Filter from "./components/filter"
import AddForm from "./components/add-form"
import Persons from "./components/persons"
import { apiService } from "./api-service"
import type { NotificationBody } from "./components/notification/notification"
import Notification from "./components/notification/notification"

export type Person = { name: string, number: string, id: number | string }

function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [showNotification, setShowNotification] = useState<(NotificationBody & { id: number }) | null>(null)

  const showNotif = (notifBody: NotificationBody) => {
    if (showNotification?.id) clearTimeout(showNotification.id)
    const id = setTimeout(() => setShowNotification(null), 3000)
    setShowNotification({ ...notifBody, id })
  }

  useEffect(() => {
    apiService.get().then(response => {
      setPersons(response)
    })
  }, [])

  const exists = (name: string) => persons.find(person => person.name === name)



  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = (newName || '').trim()
    if (!name) return

    const found = exists(newName)
    if (!found) {
      apiService.post({ name, number: newPhoneNumber }).then(newPerson => {
        setNewPhoneNumber('')
        setNewName('')
        setPersons([...persons, newPerson])
        showNotif({ type: 'success', message: `Added ${name}` })
      })
      return
    }

    if (found && confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      apiService.put({ ...found, number: newPhoneNumber }).then((result) => {
        setNewPhoneNumber('')
        setNewName('')
        setPersons(persons.map(p => p.id !== found.id ? p : result))
        showNotif({ type: 'success', message: `Updated ${name}` })
      }).catch(e => {
        if (e.response.status == 404)
          showNotif({ type: 'failure', message: `Information of ${name} has already been removed from server` })

      })
      return
    }
  }

  const handlePersonDelete = (id: number | string) => {
    const found = persons.find(p => p.id === id)
    if (!confirm(`delete ${found?.name}?`))
      return

    apiService.delete(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const filteredPersons = persons.filter(person => !searchTerm ||
    person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      {!!showNotification && <Notification type={showNotification.type} message={showNotification.message} />}
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber} />

      <Persons filteredPersons={filteredPersons} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App

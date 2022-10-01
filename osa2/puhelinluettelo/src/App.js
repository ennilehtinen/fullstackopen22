import { useEffect, useState } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      <form>
        <div>
          Filter shown with <input value={search} onChange={handleSearch} />
        </div>
      </form>
    </div>
  )
}

const AddContact = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />{' '}
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />{' '}
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

const ContactList = ({ filtered, removePerson }) => {
  return (
    <div>
      <ul>
        {filtered.map(person => (
          <Person
            key={person.id}
            person={person}
            removePerson={() =>
              window.confirm(`Remove ${person.name}?`)
                ? removePerson(person.id)
                : null
            }
          />
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [message, setMessage] = useState()

  const addPerson = async event => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    const oldPerson = persons.find(
      person => person.name.toLowerCase() === contactObject.name.toLowerCase()
    )

    if (oldPerson) {
      if (
        window.confirm(
          `${oldPerson.name} is already added to phonebook, update contact?`
        )
      ) {
        try {
          await personService.update(oldPerson.id, contactObject)
          setPersons(() =>
            persons.map(person =>
              person.id === oldPerson.id
                ? { ...contactObject, id: person.id }
                : person
            )
          )
          showMessage('Contact updated')
        } catch (e) {
          showMessage('Contact not found, it might have been deleted', 'Fail')
        }
      }
    } else {
      personService
        .create({ ...contactObject, id: persons.length + 1 })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      showMessage('New contact added')
    }
  }

  const showMessage = (message, type) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const removePerson = async id => {
    await personService.delContact(id)
    setPersons(() => persons.filter(person => person.id !== id))
    showMessage('Contact removed')
  }

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    setNewSearch(event.target.value)
  }

  const filtered = !search
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {!!message?.message && (
        <Notification message={message.message} type={message.type} />
      )}
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add new contact</h2>
      <AddContact
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ContactList filtered={filtered} removePerson={removePerson} />
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import Person from './components/Person'
import Alert from './components/Alert'
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

const ContactList = ({ filtered }) => {
  return (
    <div>
      <ul>
        {filtered.map(person => (
          <Person key={person.id} person={person} />
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

  const addPerson = event => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (
      persons.find(
        person => person.name.toLowerCase() === contactObject.name.toLowerCase()
      )
    ) {
      Alert(contactObject)
    } else {
      personService.create(contactObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = event => {
    event.preventDefault()
    personService.delContact().then(removedPerson => {
      setPersons(persons.concat(removedPerson))
    })
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
      <ContactList filtered={filtered} />
    </div>
  )
}

export default App

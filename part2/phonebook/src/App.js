import React, { useState, useEffect  } from 'react'
import axios from 'axios'


const Filter = ({filter, setFilter}) => {

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
}

  return (
  <div>
          <form>
          filter shown with: <input value={filter} onChange={handleFilterChange} />
          </form>
  </div>
  )
}

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length > 0 ||
    persons.filter(person => person.number === newNumber).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {  
    console.log('add name:', newName)
    setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    setNewName('')
    }
  }

  return (
  <form onSubmit={addName}>
  <div>
    name: <input value={newName} onChange={handleNameChange}/>
  </div>
  <div>
    number: <input value={newNumber} onChange={handleNumberChange} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}

const Persons = ({persons, filter}) => {
  return (
    <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(filter))
      .map(person => <ul key={person.name}>{person.name} {person.number}</ul>)}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState('a new number...')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {   
        setPersons(response.data)
        })
        }, [])


  return (
    <div>
      <div>debug: {filter}</div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
        <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
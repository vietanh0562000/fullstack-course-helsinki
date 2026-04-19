import { useState, useEffect } from 'react'
import PhoneForm from './components/PhoneForm'
import Filter from './components/Filter'
import Person from './components/Person'
import phonesAPI from './services/phonesAPI'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    phonesAPI.getAll().then(data => {
      console.log("Data from server", data);
      setPersons(data);
    })
  }, [])

  function onDelete(id){
    phonesAPI.deleteById(id).then(data => {
      setPersons(persons.filter(person => person.id !== id));
    })
    .catch(e => {
      alert('Got error when deleting person with id ' + id);
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onChange={setFilterName}/>
      <PhoneForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => {
          if (filterName == null || filterName === ''){
            return true;
          }
          return person.name.includes(filterName);
        }).map(person => <Person key={person.number} person={person} onDelete={() => onDelete(person.id)}/>)}
      </ul>
    </div>
  )
}

export default App
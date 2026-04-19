import { useState } from 'react'
import phonesAPI from '../services/phonesAPI';

export default function PhoneForm({persons, setPersons}){
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        let samePhonePersons = await phonesAPI.getByPhone(newPhone);
        if (samePhonePersons.length > 0){
          alert('Already have a person with same phone')
          return;
        }
        let newPerson = {
          name : newName,
          number : newPhone
        }

        let sameNamePersons = await phonesAPI.getByName(newName);
        console.log(sameNamePersons)
        if (sameNamePersons.length > 0){
            console.log('update person')
            const person = sameNamePersons[0];
            const data = await phonesAPI.update(person.id, newPerson);
            const updatedPersons = persons.map(p => p.id === data.id ? data : p);
            setPersons(updatedPersons);
            return;
        }
        
        let createdPerson = await phonesAPI.add(newPerson);
        setPersons(persons.concat(createdPerson))
    }

    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
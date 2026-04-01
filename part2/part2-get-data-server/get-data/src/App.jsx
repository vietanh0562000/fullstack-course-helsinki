import { useState, useEffect } from 'react'
import './App.css'
import Note from './Note'
import axios from 'axios'
import notesAPI from './service/notesAPI'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() =>{
    notesAPI.getAll()
      .then(data => {
        console.log(data);
        setNotes(data);
      });
  }, [])

  function onSubmitNewNote(e){
    e.preventDefault();
    const newNoteObject = {
      id: notes.length + 1,
      important: false,
      content: newNote
    }

    notesAPI.add(newNoteObject)
      .then(data => {
        console.log(data);
        const addedNotes = data;
        const newNotes = notes.concat(addedNotes);
        setNotes(newNotes);
      });
  }

  function onChangeImportant(id){
    const note = notes.find(n => n.id === id);
    const updatedNote = {...note, important: !note.important}
    notesAPI.update(id, updatedNote)
      .then(data => {
        console.log(data);
        const updatedNotes = notes.map(note => note.id === data.id ? data : note);
        setNotes(updatedNotes);
      })
      .catch(e => {
        alert(`the note with id = ${id} is removed from database`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} onChangeImportant={() => onChangeImportant(note.id)}/>)}
      </ul>
      <form onSubmit={onSubmitNewNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
        <button type = "submit">add</button>
      </form>
    </>
  )
}

export default App

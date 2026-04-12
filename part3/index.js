import express, { json } from 'express'
import morgan from 'morgan';

const app = express();
const PORT = 3001;

app.use(json())
app.use(morgan('dev'))

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(n => n.id === id);
    if (note){
        res.json(note);
    }else{
        res.status(404).end();
    }
})

const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => n.id))
        : 0;
    return maxId + 1;
}

app.post('/api/notes', (req, res) => {
    const body = req.body;
    if (!body.content){
        res.status(500).json({
            error: 'The content should not be null'
        })
        return
    }else{
        const newNote = {
            id: generateId(),
            content: body.content
        }

        notes = notes.concat(newNote);
        res.status(201).json(newNote);
    }
})

app.put('/api/notes/:id', (req, res) => {
    const body = req.body;
    if (!body.content){
        res.status(500).json({
            errror: 'Content should not be null'
        })
        return;
    }
    const id = req.params.id;
    const updatingNote = notes.find(n => n.id === id);

    if (!updatingNote){
        res.status(404).end();
        return;
    }
    updatingNote.content = body.content;
    notes = notes.map(n => n.id === id ? updatingNote : n);
    res.status(200).json(updatingNote);
})


app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(n => n.id !== id);
    res.status(200).json('Delete successfully');
})


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
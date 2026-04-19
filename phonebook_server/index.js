import express from 'express'
import dotenv from 'dotenv'
import Person from './models/person.js'
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
dotenv.config();

const app = express();

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const PORT = 3001;

app.get('/api/persons', (req, res) => {
    console.log("Get all persons")

    const name = req.query.name;
    const phone = req.query.phone;

    const filter = {}
    if (name){
        filter.name = name;
    }
    if (phone){
        filter.phone = phone;
    }
    
    const persons = Person.find(filter).then(data => {
        console.log(data);
        res.json(data);
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then(result => {
        if (result){
            res.json(result);
        }else{
            res.status(404).end();
        }
    })
    .catch(err => next(err));
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const newPerson = new Person({
        name: body.name,
        number: body.number
    });

    if (isValidPerson(newPerson)){
        newPerson.save().then(result => {
            console.log('person saved');
            res.json(result)
        })
    }else{
        res.status(500).json('Not valid input').end();
    }
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(res.body);
    const { name, number} = req.body;

    Person.findById(id).then(person => {
        if (person){
            person.name = name;
            person.number = number;
            person.save().then(result => {
                res.json(result);
            })
        }else{
            res.status(404).end();
        }
    })
    .catch(err => next(err));
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id).then(result => {
        res.status(204).end();
    })
    .catch(err => next(err));
})

app.use(errorHandler);

function isValidPerson(person){
    if (person.name != null && person.number != null){
        return true;
    }

    return false;
}

app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`)
})
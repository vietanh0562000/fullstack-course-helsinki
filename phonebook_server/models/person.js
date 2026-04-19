import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose.set('strictQuery', false)

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { family : 4})
    .then(() => {
        console.log('Connect to database sucessful')
    })
    .catch((err) => {
        console.log(err);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, DTO) => {
        DTO.id = document._id;
        delete DTO._id
        delete DTO.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person
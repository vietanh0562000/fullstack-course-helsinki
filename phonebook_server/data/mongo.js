import mongoose from "mongoose";

if (process.argv.length < 5){
    console.log("missing arguments");
    process.exit(0);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://simon:${password}@presence.tvav7fn.mongodb.net/?appName=Presence`

mongoose.set('strictQuery', true);

mongoose.connect(url, {family : 4});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

const newPerson = new Person({
    name: name,
    number: number
});

newPerson.save().then(result => {
    console.log(result);
    mongoose.connection.close();
})


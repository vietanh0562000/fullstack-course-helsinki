import axios from "axios";

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data.concat(nonExistingNote));
}

const add = (note) => {
    const request = axios.post(baseUrl, note);
    return request.then(res => res.data);
}

const update = (id, newNote) => {
    const request = axios.put(`${baseUrl}/${id}`, newNote);
    return request.then(res => res.data);
}

export default {
    getAll,
    add,
    update
}
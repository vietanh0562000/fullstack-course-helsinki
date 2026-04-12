import axios from "axios";

const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
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
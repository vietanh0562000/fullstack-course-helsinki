import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/persons`

const getAll = () => {
    const request = axios.get(baseUrl);
    console.log(baseUrl);
    return request.then(res => {
        console.log(res);
        return res.data
    });
}

const getByName = (name) => {
    const request = axios.get(baseUrl + `?name=${name}`)
    return request.then(res => {
        return res.data;
    })
}

const getByPhone = (phone) => {
    const request = axios.get(baseUrl + `?phone=${phone}`)
    return request.then(res => {
        return res.data;
    })
}

const add = (person) => {
    const request = axios.post(baseUrl, person);
    return request.then(res => res.data);
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person);
    return request.then(res => res.data);
}

const deleteById = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(res => res.data);
}

export default {
    getAll,
    getByName,
    getByPhone,
    add,
    update,
    deleteById
}
import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const addNew = (personObject) => {
    const request = axios.post(baseURL, personObject);
    return request.then(response => response.data);
};

const removePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data);
};

const changePerson = (id, personObject) => {
    const request = axios.put(`${baseURL}/${id}`, personObject);
    console.log(personObject);
    return request.then(response => response.data);
}

export default {getAll, addNew, removePerson, changePerson};
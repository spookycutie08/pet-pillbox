import axios from 'axios';
import { baseUrl } from '../constants.json';

const getPetsByUser = (uid) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/pets/${uid}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const addNewPet = (newPet, resolve) => {
    axios.post(`${baseUrl}/pets`, newPet).then(resolve);
};

const getSinglePetById = (petId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/pets/id/${petId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { addNewPet, getPetsByUser, getSinglePetById };
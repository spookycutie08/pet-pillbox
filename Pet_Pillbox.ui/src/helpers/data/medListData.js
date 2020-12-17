import axios from 'axios';
import { baseUrl } from '../constants.json';

const addNewMed = (newMed) => {
    console.log('posting: ', newMed);
    axios.post(`${baseUrl}/medications`, newMed)
};

const getMedsByPetId = (petId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/medications/${petId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { addNewMed, getMedsByPetId };
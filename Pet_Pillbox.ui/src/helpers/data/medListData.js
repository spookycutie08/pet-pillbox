import axios from 'axios';
import { baseUrl } from '../constants.json';

const getMedsByPetId = (petId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/medications/${petId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getMedsByPetId };
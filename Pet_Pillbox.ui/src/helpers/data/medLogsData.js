import axios from 'axios';
import { baseUrl } from '../constants.json';

// const addNewLog = (newLog) => axios.post(`${baseUrl}/medlogs`, newLog);

const getLastDosesForPet = (petId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/medlogs/lastDoses/${petId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const getMedLogsByMedId = (medId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/medlogs/${medId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getLastDosesForPet, getMedLogsByMedId };
import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllDoseTypes = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/dosetypes`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const getSingleDoseType = (doseTypeId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/dosetypes/${doseTypeId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAllDoseTypes, getSingleDoseType };
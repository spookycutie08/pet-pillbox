import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from '../constants.json';

const getPetsByUser = (uid) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/pets/${uid}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

export default { getPetsByUser };
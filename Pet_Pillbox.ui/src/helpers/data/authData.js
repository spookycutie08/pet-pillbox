import firebase from 'firebase';
import axios from 'axios';
import {baseUrl} from '../constants.json';

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

const checkIfNewUser = (uid) => {
  var existingUser = {};
  axios.get(`${baseUrl}/users/${uid}`)
  .then((response) => {
    existingUser.firebaseUid = response.data.firebaseUid;
    console.log('response.data:', response.data);
    console.log('return?:', existingUser)
    return existingUser;
  });
  // console.log('exists:', existingUser.firebaseUid);
  
};

const loginUser = () => {
  //sub out whatever auth method firebase provides that you want to use.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {
    //get token from firebase
    let userInfo = {firebaseUid: cred.user.uid};
  
    cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token))
      .then(() => {
        // var userExists = checkIfNewUser(userInfo.firebaseUid);
        // var existingUser = {};
        // axios.get(`${baseUrl}/users/${userInfo.firebaseUid}`)
        //   .then((response) => {
        //     existingUser.firebaseUid = response.data.firebaseUid;
        //     console.log('response:', response);
        //     if(existingUser.firebaseUid) {
        //       console.log('already got this user:', existingUser.firebaseUid); 
        //     } else {
        //       //axios.post(`${baseUrl}/users`, userInfo);
        //       console.log('posting:', userInfo.firebaseUid);
        //     }
        //   })

        var existingUser = axios.get(`${baseUrl}/users/${userInfo.firebaseUid}`)
          
            console.log('response:', existingUser);
            if(existingUser.firebaseUid) {
              console.log('already got this user:', existingUser.firebaseUid); 
            } else {
              //axios.post(`${baseUrl}/users`, userInfo);
              console.log('posting:', userInfo.firebaseUid);
            }
          
        
      }
      )
      // .then(() => axios.post(`${baseUrl}/users`,userInfo))
      
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {
    getUid, 
    loginUser, 
    logoutUser, 
};
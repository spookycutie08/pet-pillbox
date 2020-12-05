import React from 'react';
// import { Link } from 'react-router-dom';

import authData from '../../../helpers/data/authData';

class Auth extends React.Component {
    // state = {
    //     user: {
    //       firebaseUid: '',
    //     },
    //   };
    
      loginClickEvent = (e) => {
        e.preventDefault();
        authData
          .loginUser()
          .catch(error => {
            console.error('there was a problem logging in:', error);
          });
      };
    
    render() {
        return (
            <button onClick={this.loginClickEvent} type="button" className="btn btn-primary">Google Login</button>
        );
    }
}

export default Auth;
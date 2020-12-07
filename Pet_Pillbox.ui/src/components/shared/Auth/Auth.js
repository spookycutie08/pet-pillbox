import './Auth.scss';

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

      logoutClickEvent = (e) => {
        e.preventDefault();
        authData
          .logoutUser()
          .catch(error => {
            console.error('there was a problem logging out:', error);
          });
      };
    
    render() {
        return (
            <div>
                <button onClick={this.loginClickEvent} type="button" className="btn btn-primary">Google Login</button>
                <button onClick={this.logoutClickEvent} type="button" className="btn btn-dark">Logout</button>
            </div>
        );
    }
}

export default Auth;
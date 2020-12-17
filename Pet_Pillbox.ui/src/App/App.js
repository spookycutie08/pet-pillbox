import './App.scss';

import fbConnection from '../helpers/data/connection';

import firebase from 'firebase';
import 'firebase/auth';
import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import NavNavbar from '../components/shared/NavNavbar/NavNavbar'

import AddMedForm from '../components/pages/AddMedForm/AddMedForm';
import Auth from '../components/shared/Auth/Auth'
import Home from '../components/pages/Home/Home'
import MedHistory from '../components/pages/MedHistory/MedHistory'
import MedList from '../components/pages/MedList/MedList'
import PetsDashboard from '../components/pages/PetsDashboard/PetsDashboard'


fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <NavNavbar authed={authed} />
            <div className="container col-12">
              <div className="col-12">
              <Switch>
                <PublicRoute path="/auth" component={Auth} authed={authed} />

                <PrivateRoute path="/home" component={Home} authed={authed} />
                <PrivateRoute path="/addMed/:petId" component={AddMedForm} authed={authed} />
                <PrivateRoute path="/medlist/:petId" component={MedList} authed={authed} />
                <PrivateRoute path="/medhistory" component={MedHistory} authed={authed} />
                <PrivateRoute path="/pets" component={PetsDashboard} authed={authed} />

                <Redirect from="*" to="/auth" />
              </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
    </div>
    );
  }
}

export default App;

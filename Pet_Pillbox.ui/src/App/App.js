import './App.scss';

import fbConnection from '../helpers/data/connection';

import firebase from 'firebase';
import 'firebase/auth';
import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import NavNavbar from '../components/shared/NavNavbar/NavNavbar'

import Auth from '../components/shared/Auth/Auth';
import EditMed from '../components/pages/EditMed/EditMed';
import Home from '../components/pages/Home/Home';
import MedForm from '../components/shared/MedForm/MedForm';
import MedHistory from '../components/pages/MedHistory/MedHistory';
import MedList from '../components/pages/MedList/MedList';
import PetsDashboard from '../components/pages/PetsDashboard/PetsDashboard';


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
                <PrivateRoute path="/addMed/:petId" component={MedForm} authed={authed} />
                <PrivateRoute path="/medlist/pet/:petId" component={MedList} authed={authed} />
                {/* <PrivateRoute path="/editMed/:medId" component={EditMed} authed={authed} /> */}
                <PrivateRoute path="/history/:medId" component={MedHistory} authed={authed} />
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

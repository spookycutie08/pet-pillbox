import './App.scss';

import Auth from '../components/shared/Auth/Auth'
import NavNavbar from '../components/shared/NavNavbar/NavNavbar'

import fbConnection from "../helpers/data/connection";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

fbConnection();


function App() {
  return (
    <div className="App">
            <NavNavbar/>
      <h1>Pet Pillbox</h1>
      <Auth/>
      <BrowserRouter>
        <Switch>
          <Route path="/Auth" component={Auth}></Route>
          {/* <Route path="/Pets" component={Pets}></Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

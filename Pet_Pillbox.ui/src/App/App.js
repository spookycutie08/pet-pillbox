import './App.scss';

import Auth from '../components/shared/Auth/Auth'

import fbConnection from "../helpers/data/connection";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

fbConnection();


function App() {
  return (
    <div className="App">
      <h1>Pet Pillbox</h1>
      <Auth></Auth>
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

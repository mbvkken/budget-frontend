import React from 'react';
import './App.css';

import { HashRouter, Switch, Route, Link } from 'react-router-dom';

import LoggInn from './components/LoggInn';
import RegistrerDeg from './components/RegistrerDeg';


function App() {
  return (
    <div>
      <h1>Top of page!</h1>
    <HashRouter>
      <Switch>
        <Route path="/logginn" component={LoggInn}/>
        <Route path="/registrer" component={RegistrerDeg} />
      </Switch>
      <button>
            <Link to="/registrer">Sign up</Link>
          </button>
          <button>
            <Link to="/logginn">Sign in</Link>
          </button>
    </HashRouter>
    <h1>bottom of page</h1>
    
    </div>
  )
}


export default App;

import React from 'react';
import './App.css';

import { HashRouter, Switch, Route } from 'react-router-dom';

import LoggInn from './components/LoggInn';
import RegistrerDeg from './components/RegistrerDeg';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/logginn" component={LoggInn}/>
        <Route path="/registrer" component={RegistrerDeg} />
      </Switch>
    </HashRouter>
  )
}


export default App;

import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
// import { Page, Tabbar, Tab, TabPage, Toolbar, Button } from 'react-onsenui';
import withAuthentication from './hoc/with-authentication';

import Hjem from './components/Hjem';
import LoggInn from './components/LoggInn';
import RegistrerDeg from './components/RegistrerDeg';
import BudsjettOversikt from './components/BudsjettOversikt';
import BudsjettOpprett from './components/BudsjettOpprett';

import { Header, PageContain } from './App-Styles';

function App() {
  return (
    <div>
      <Header> <h1>Mynt</h1></Header>
      <HashRouter>

        <PageContain>

          <Switch>
            <Route path="/" exact component={Hjem}/>
            <Route path="/logginn" component={LoggInn} />
            <Route path="/registrer" component={RegistrerDeg} />
            <Route path="/budsjett-oversikt" component={BudsjettOversikt}/>
            <Route path="/budsjett-opprett" component={BudsjettOpprett} />
          </Switch>

        </PageContain>

      </HashRouter>
    </div>
  )
}

export default App;
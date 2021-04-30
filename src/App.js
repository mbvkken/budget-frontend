import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
// import withAuthentication from './hoc/with-authentication';

import Hjem from './components/Hjem';
import LoggInn from './components/LoggInn';
import LoggUt from './components/LoggUt';
import RegistrerDeg from './components/RegistrerDeg';
import BudsjettOversikt from './components/BudsjettOversikt';
import BudsjettOpprett from './components/BudsjettOpprett';
import Profil from './components/Profil';
import NavBar from './components/NavBar';


import { Header, PageContain } from './App-Styles';
import styled from 'styled-components'; 

const GridContain = styled.div`
display: grid;
grid-template-rows: 100px 1fr 100px;
height: 100vh; 
`

function App() {
// const pathsWithNavbar =["/budsjett-oversikt","/budsjett-opprett","/profil", "/" ]

  return (

    <HashRouter>
      <GridContain>
        <Header> <h1>Mynt</h1></Header>

        <PageContain>

          <Switch >
            <Route path="/" exact component={Hjem} />
            <Route path="/logginn" component={LoggInn} />
            <Route path="/loggut" component={LoggUt} />
            <Route path="/registrer" component={RegistrerDeg} />
            <Route path="/budsjett-oversikt" component={BudsjettOversikt} />
            <Route path="/budsjett-opprett" component={BudsjettOpprett} />
            <Route path="/profil" component={Profil} />

          </Switch>
        </PageContain>
        <Switch>
        <Route path="/logginn" component={null} />
        <Route path="/loggut"  component={null} />
        <Route path="/registrer"  component={null} />
<Route component={NavBar} />
        </Switch>

      </GridContain>
    </HashRouter>
  )
}

export default App;
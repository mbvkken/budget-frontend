import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
// import withAuthentication from './hoc/with-authentication';

import Hjem from './components/Hjem';
import BudsjettLink from './components/BudsjettDetaljer';

import LoggInn from './components/LoggInn';
import LoggUt from './components/LoggUt';
import RegistrerDeg from './components/RegistrerDeg';
import BudsjettOversikt from './components/BudsjettOversikt';
import BudsjettOpprett from './components/BudsjettOpprett';
import Profil from './components/Profil';
import SignIn from './components/Altlogin';
import {NavBar, TempNoNavBar} from './components/NavBar';


import { Header, PageContain } from './App-Styles';
import styled from 'styled-components';

const GridContain = styled.div`
display: grid;
grid-template-rows: 100px 1fr 100px;
height: 100vh; 
`

function App() {

  return (

    <HashRouter>
      <GridContain>
        <Header> <h1>MYNT</h1></Header>

        <PageContain>

          <Switch >
            <Route path="/" exact component={Hjem} />
            <Route path="/logginn" component={LoggInn} />
            <Route path="/loggut" component={LoggUt} />
            <Route path="/registrer" component={RegistrerDeg} />
            <Route path="/budsjett-oversikt" component={BudsjettOversikt} />
            <Route path="/budsjett-detaljer/:id" render={(props)=>(<BudsjettLink {...props}/>)}/>
            <Route path="/budsjett/:budsjettid" component={null} />
            <Route path="/budsjett-opprett/:budsjettid" component={BudsjettOpprett} />
            <Route path="/budsjett-endre/:budsjettid" component={null}/>
            <Route path="/profil/:epost" component={Profil} />
          </Switch>
 

        </PageContain>
        <Switch>
        <Route path="/logginn" component={TempNoNavBar} />
        <Route path="/loggut"  component={TempNoNavBar} />
        <Route path="/registrer"  component={TempNoNavBar} />
        <Route component={NavBar} />
        </Switch>

      </GridContain>
    </HashRouter>
  )
}

export default App;
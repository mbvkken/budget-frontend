import React from "react";

import { HashRouter, Switch, Route } from "react-router-dom";
// import withAuthentication from './hoc/with-authentication';

import Hjem from "./components/Hjem";
import BudsjettLink from "./components/BudsjettDetaljer";

import LoggInn from "./components/LoggInn";
import LoggUt from "./components/LoggUt";
import RegistrerDeg from "./components/RegistrerDeg";
import BudsjettOversikt from "./components/BudsjettOversikt";
import BudsjettOpprett from "./components/BudsjettOpprett";
import Profil from "./components/Profil";
import SignIn from "./components/Altlogin";
import SignUp from "./components/RegisterAlt";
import Sparemal from "./components/Sparemal";

import { NavBar, TempNoNavBar } from "./components/NavBar";

import { Header, PageContain } from "./App-Styles";
import styled from "styled-components";

const GridContain = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 70px;
  height: 100vh;
`;

function App() {
  return (
    <HashRouter>
      <GridContain>
        <Header>
          {" "}
          <h1
            style={{ letterSpacing: "0.1em", fontFamily: "Ubuntu, sans-serif" }}
          >
            Mynt.
          </h1>
        </Header>

        <PageContain>
          <Switch>
            <Route path="/" exact component={Hjem} />
            <Route path="/logginn" component={SignIn} />
            <Route path="/loggut" component={LoggUt} />
            <Route path="/registrer" component={SignUp} />

            {/* Budsjett */}
            <Route path="/budsjett-oversikt" component={BudsjettOversikt} />
            <Route path="/budsjett-detaljer" component={BudsjettLink} />
            <Route path="/budsjett/:budsjettid" component={null} />
            <Route path="/budsjett-opprett/" component={BudsjettOpprett} />
            <Route path="/budsjett-endre/:budsjettid" component={null} />

            {/** sparemaal */}
            <Route path="/sparemaal" component={Sparemal} />

            {/** Profil */}
            <Route path="/profil/:epost" component={Profil} />
          </Switch>
          {/* :id" render={(props)=>(<BudsjettLink {...props}/>)} */}
        </PageContain>

        <Switch>
          <Route path="/logginn" component={TempNoNavBar} />
          <Route path="/loggut" component={TempNoNavBar} />
          <Route path="/registrer" component={TempNoNavBar} />
          <Route component={NavBar} />
        </Switch>
      </GridContain>
    </HashRouter>
  );
}

export default App;

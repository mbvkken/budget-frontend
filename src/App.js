import React from 'react';
import './App.css';
import styled from 'styled-components';

import { HashRouter, Switch, Route, Link } from 'react-router-dom';
// import { Page, Tabbar, Tab, TabPage, Toolbar, Button } from 'react-onsenui';

import Hjem from './components/Hjem';
import LoggInn from './components/LoggInn';
import RegistrerDeg from './components/RegistrerDeg';
import BudsjettOversikt from './components/BudsjettOversikt';
import BudsjettOpprett from './components/BudsjettOpprett';

const greenshade = '#5e8c71'
const Header = styled.div`
background: ${greenshade};
height: 120px;
margin: 0px;
display: grid;
place-items: center;
`;

const Nav = styled.div`
background: ${greenshade};
height: 90px;
margin: 0px;
display: grid;
place-items: center;
width: 100%;
  position: fixed;
  bottom: 0;
`;

const PageContain = styled.div`
display: flex;
flex-flow: column wrap;
/* height: 800px; */
align-items: center;
/* justify-content: center; */
`;


// const Logo

function App() {
  return (
    <div>
      <Header> <h1>Mynt</h1></Header>
      <HashRouter>

        <PageContain>

          <Switch>
            <Route path="/" exact component={withAuthentication(Hjem)}/>
            <Route path="/logginn" component={LoggInn} />
            <Route path="/registrer" component={RegistrerDeg} />
            <Route path="/budsjett-oversikt" component={BudsjettOversikt}/>
            <Route path="/budsjett-opprett" component={BudsjettOpprett} />
          </Switch>

          <button>
            <Link to="/registrer">Registrer Deg</Link>
          </button>

          <button>
            <Link to="/logginn">Logg inn</Link>
          </button>

        </PageContain>

        <Nav> <h1>push things</h1></Nav>

      </HashRouter>
    </div>
  )
}

// function App() {
//   return (
//     <Page>
//     <Tabbar
//       onPreChange={({index}) => this.setState(index)}
//       onPostChange={() => console.log('postChange')}
//       onReactive={() => console.log('postChange')}
//       position='bottom'
//       index={this.state.index}
//       renderTabs={(activeIndex, tabbar) => [
//         {
//           content: <TabPage title="Home" active={activeIndex === 0} tabbar={tabbar} />,
//           tab: <Tab label="Home" icon="md-home" />
//         },
//         {
//           content: <TabPage title="Settings" active={activeIndex === 1} tabbar={tabbar} />,
//           tab: <Tab label="Settings" icon="md-settings" />
//         }]
//       }
//     />
//   </Page>
//   )
// }


export default App;

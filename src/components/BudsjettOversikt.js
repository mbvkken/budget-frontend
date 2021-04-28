import React from 'react';
import { Nav, Body } from '../App-Styles';
import { Link } from 'react-router-dom';

// bildeimport
import { ReactComponent as Budsjett } from '../logos/dollar.svg';
import { ReactComponent as Hus } from '../logos/hjem.svg';
import { ReactComponent as Piggy } from '../logos/piggy.svg';
import { ReactComponent as Pluss } from '../logos/pluss.svg';
import { ReactComponent as ProfilIcon } from '../logos/profil.svg';

class BudsjettOversikt extends React.Component {

    render() {
        return (
            <div>
                <Body>
                    Nice og kul oversikt over dine budsjetter...
                </Body>
                <Nav>
                  <Link to="/">
                    <Hus />
                  </Link>
                    
                    <Budsjett />
                    
                    <Link to="/"> 
                        <Pluss />
                    </Link>

                    <Link to="/">
                        <Piggy />
                    </Link>

                    <Link to="/profil">
                        <ProfilIcon />
                    </Link>
                </Nav>
            </div>
        )
    }
}

export default BudsjettOversikt;
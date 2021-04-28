import React from 'react';
import { Nav, Body } from '../App-Styles';
import { Link } from 'react-router-dom';

// bildeimport

import { ReactComponent as Budsjett } from '../logos/dollar.svg';
import { ReactComponent as Hus } from '../logos/hjem.svg';
import { ReactComponent as Piggy } from '../logos/piggy.svg';
import { ReactComponent as Pluss } from '../logos/pluss.svg';
import { ReactComponent as ProfilIcon } from '../logos/profil.svg';


class Profil extends React.Component {
    render(){
        return (
            <div>
                <Body>
                    Her kommer en kul profil side :) 
                </Body>
        
                <Nav>
                    
                    <Link to="/">
                      <Hus />
                    </Link>
                      
                    <Link to="/budsjett-oversikt">
                        <Budsjett />
                    </Link>
                      
                    <Link to="/"> 
                        <Pluss />
                    </Link>

                    <Link to="/">
                        <Piggy />
                    </Link>
  
                        <ProfilIcon />
                      
                  </Nav>

            </div>
        )
    }
}

export default Profil;
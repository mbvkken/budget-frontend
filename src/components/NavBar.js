import React from 'react';
import { Nav, Body } from '../App-Styles';
import { Link,  } from 'react-router-dom';



import { ReactComponent as Budsjett } from '../logos/dollar.svg';
import { ReactComponent as Hus } from '../logos/hjem.svg';
import { ReactComponent as Piggy } from '../logos/piggy.svg';
import { ReactComponent as Pluss } from '../logos/pluss.svg';
import { ReactComponent as ProfilIcon } from '../logos/profil.svg';

const NavBar = (props) => {
        return (
            <div>
                
                <Nav>
                  <Link to="/">
                    <Hus />
                  </Link>
                    
                    <Link to='budsjett-oversikt'>
                    <Budsjett />
                    </Link>
                    
                    <Link to="/budsjett-opprett"> 
                        <Pluss />
                    </Link>

                    <Link to="/sparemaal">
                        <Piggy />
                    </Link>

                    <Link to="/profil/:epost">
                        <ProfilIcon />
                    </Link>
                </Nav>
            </div>
        )
    
}

const TempNoNavBar =() =>{
    return (<Body> 

    </Body>)
}
export  {NavBar,TempNoNavBar};
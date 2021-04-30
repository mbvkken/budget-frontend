import React from 'react';
import { Nav } from '../App-Styles';
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

export default NavBar;
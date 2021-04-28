import React from 'react';
import jwtDecode from 'jwt-decode';
import { Nav, Body } from '../App-Styles';
import { Link } from 'react-router-dom';

// bildeimport

import { ReactComponent as Budsjett } from '../logos/dollar.svg';
import { ReactComponent as Hus } from '../logos/hjem.svg';
import { ReactComponent as Piggy } from '../logos/piggy.svg';
import { ReactComponent as Pluss } from '../logos/pluss.svg';
import { ReactComponent as ProfilIcon } from '../logos/profil.svg';

class Hjem extends React.Component {
    constructor(props){
        super(props);

        const token = localStorage.getItem('bruker_budsjett_token');

        let payload;

        try {
            payload = jwtDecode(token);
        } catch (err) {

        }

        this.state = {
            budsjett: [],
            isLoading: false,
            error: null,
            message: '',
            session: payload,
        }
    }

    render(){
        const {
            session: {
                navn,
                epost
            } = {}
        } = this.state;

        return (
            <div>
                <Body>
                    <p>{navn} er innlogget med {epost}.</p>
                
                    <Link to="/loggut">Log out</Link>
                </Body>
                <Nav>
                    
                    <Hus />
                    
                    <Link to="/budsjett-oversikt">
                        <Budsjett />
                    </Link>

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

export default Hjem;
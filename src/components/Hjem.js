import React from 'react';
import jwtDecode from 'jwt-decode';
import { Nav } from '../App-Styles';

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
                <p>{navn} er innlogget med {epost}.</p>
                <Nav>
                    <ul>
                        <li>Hjem</li>
                        <li>Budsjett</li>
                        <li>Sparemål</li>
                        <li>Profil</li>
                    </ul>
                    
                </Nav>
            </div>
        )
    }

}

export default Hjem;
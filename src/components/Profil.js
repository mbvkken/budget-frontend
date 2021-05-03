import React from 'react';
import jwtDecode from 'jwt-decode';
import { Body, PrimaryButton } from '../App-Styles';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { formHelperTextClasses } from '@material-ui/core';
import { Link } from 'react-router-dom';



class Profil extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('bruker_budsjett_token');

        let payload;
        try {
            payload = jwtDecode(token);
            console.log(payload)
        } catch (err) {
            // throw new Error('noe gikk galt')
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

        const profilStyleOver = {
            backgroundColor: '#FAF9F6',
            width: '100vw',
            display: 'grid',
            placeItems: 'center'
        }
        const profilStyleUnder = {
            width: 'auto',
            margin: '0em 1em',

        }

        const profilKort = {
            backgroundColor: '#4D735D',
            color: '#FAF9F6',
            width: 'auto',
            borderRadius: '2px',
            padding: '2em',
        }

        const profilAvatar = {
            height: '200px',
            width: '200px',
            margin: '2rem',
            backgroundColor: deepOrange[500],
        }

        const profilSide = {
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center'
        }

        const loggUtKnapp = {
            width: '92%'
        }

        return (
            <div style={profilSide}>
                <div style = {profilStyleOver}>
                    <Avatar style={profilAvatar}>{navn}</Avatar>
                </div>
                <div style = {profilStyleUnder}>
                    <div style={profilKort}>
                        <p>Navn: {navn}</p>
                        <p>Epost: {epost}</p>
                    </div>
                    <Link to="/loggut">
                        <PrimaryButton style = {loggUtKnapp}>Logg ut</PrimaryButton>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Profil;
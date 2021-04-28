import React from 'react';

import { sjekkBruker } from '../services/session';
import { PrimaryButton } from '../App-Styles';


class LoggInn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginDetails: {
                epost: '',
                passord: ''
            },
            error: null,
            loginStatus: false
        }
    }

    handleInputChange(field, event) {
        this.setState({
            loginDetails: {
                ...this.state.loginDetails,
                [field]: event.target.value
            }
        });
    }

    async handleLoginClick(event) {
        event.preventDefault();

        const { history } = this.props;
        const { epost, passord } = this.state.loginDetails;

        try {
            this.setState({
                loginStatus: true, 
                error: null
            })

            const result = await sjekkBruker({
                epost,
                passord
            });

            if(result.error) {
                throw new Error(result.error);
            }

            if(!result.token) {
                throw new Error('Kunne ikke verifisere - prøv igjen.');
            }
            
            localStorage.setItem('bruker_budsjett_token', result.token);
            history.push('/');
        } catch (error) {
            this.setState( { error, loginStatus: false } )
        }
    }

    handleRegistrering(event) {
        event.preventDefault();
        const { history } = this.props;
        history.push('/registrer')
    }

    render() {
        const { error, loginStatus } = this.state;

        return (
            <div style = {{textAlign: 'center'}}>
                <h1>Logg Inn</h1>
                <form>
                    <div>
                    <label>
                        Epost: 
                        <input type = "text" value={this.state.loginStatus.epost} onChange={this.handleInputChange.bind(this, 'epost')}
                        />
                    </label>
                    </div>
                    <div>
                    <label>
                        Passord: 
                        <input type="password" value={this.state.loginStatus.passord} onChange={this.handleInputChange.bind(this, 'passord')}
                        /> 
                    </label>
                    </div>
                    <div>
                        <PrimaryButton onClick={this.handleLoginClick.bind(this)}>Logg inn</PrimaryButton>
                        <PrimaryButton onClick={this.handleRegistrering.bind(this)}>Registrer deg</PrimaryButton>
                    </div>
                    <div>
                        {loginStatus && <p>Logger inn...</p>}
                        {error && <p>Kunne ikke logge inn: {error.message}</p>}
                    </div>
                </form>
            </div>
        );
    }
}

export default LoggInn;
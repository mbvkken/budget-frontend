import React from 'react';
import jwtDecode from 'jwt-decode';
import { Body, BudsjettIcon } from '../App-Styles';
import { Link } from 'react-router-dom';
import { deleteBudget, getBudgetByEpost, newBudget } from '../services/budget';
import BudsjettOpprett from './BudsjettOpprett';

// bildeimport

// import { ReactComponent as Budsjett } from '../logos/dollar.svg';
// import { ReactComponent as Hus } from '../logos/hjem.svg';
// import { ReactComponent as Piggy } from '../logos/piggy.svg';
// import { ReactComponent as Pluss } from '../logos/pluss.svg';
// import { ReactComponent as ProfilIcon } from '../logos/profil.svg';

class Hjem extends React.Component {
    constructor(props){
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

    async componentDidMount() {
        await this.populateBudgets();
        console.trace('hei');
    }
    
    async populateBudgets() {
        const {
            session: {
                epost
            } = {}
        } = this.state;

        try {
            this.setState({ isLoading: true });
            const budsjett = await getBudgetByEpost(epost);
            this.setState({ budsjett: budsjett, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
    }

    async handleDeleteClick() {
        const { id } = this.props;

        if (!window.confirm('u sure?')) {
            return;
        }
        
        try {
            await deleteBudget(id);
        } catch (error) {
            console.log('sletting av budsjett feilet...', error);
        }
    }

    render(){
        const { id } = this.props;
        const {
            session: {
                navn,
                epost
            } = {},
            budsjett,
            isLoading,
            error,
        } = this.state;

        if(error) {
            return (
                <div>Kunne ikke hente budsjetter...</div>
            )
        }

        if(!budsjett) {
            return (
                <div>
                    <p>Ingen budsjett med id: {id} funnet...</p>
                </div>
            )
        }

        if(isLoading) {
            return (
                <div>Laster inn budsjetter...</div>
            )
        }

        const budsjettElementer = budsjett
        .map( ({ tittel }) => {
            return (
            <BudsjettIcon>
                {tittel}
            </BudsjettIcon>
            )
        })

        return (
            <div>
                    <p>{navn} er innlogget med {epost}.</p>
                    <button onClick={this.handleDeleteClick.bind(this)}>DELETE</button>
                    <Link to="/loggut">Log out</Link>
                    <BudsjettOpprett/>
                    {budsjettElementer}            
            </div>
        )
    }

}

export default Hjem;
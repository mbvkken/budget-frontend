import React from 'react';
import jwtDecode from 'jwt-decode';
import { Body, BudsjettIcon } from '../App-Styles';
import { Link } from 'react-router-dom';
import { deleteBudget, getBudgetByEpost, newBudget } from '../services/budget';
import BudsjettOpprett from './BudsjettOpprett';
import {Typography} from '@material-ui/core'



class Hjem extends React.Component {
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

handleClick(id){
const {history} = this.props;
history.push("/budsjett-detaljer/"+id)

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

        if (error) {
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
            .map(({ tittel, budsjettID }) => {
                    return(
                <BudsjettIcon key={budsjettID} onClick={()=> this.handleClick(budsjettID) }>
                            {tittel} and
                            {budsjettID}
                        </BudsjettIcon>
                       )
        })

        return (
            <div>
                    <Typography>{navn} er innlogget med {epost}.</Typography>
                    <Link to="/loggut">Log out</Link>
                    <BudsjettOpprett/>
                    {budsjettElementer}            
            </div>
        )
    }

}

export default Hjem;
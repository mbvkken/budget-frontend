import React from 'react';
import jwtDecode from 'jwt-decode';
import { Body, PrimaryButton } from '../App-Styles';
import { createNewBudget } from '../services/budget';

class BudsjettOpprett extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('bruker_budsjett_token');

        let payload;

        try {
            payload = jwtDecode(token);
        } catch (err) {

        }

        this.state = {
            budsjett: {},
            session: payload,
            error: null
        }
    }

    handleInputChange(field, event) {
        this.setState({
            budsjett: {
                ...this.state.budsjett,
                [field]: event.target.value
            }
        })
    }

    async handleNewBudgetClick(event) {
        event.preventDefault();
        const { history } = this.props;
        const { budsjett } = this.state;
        const {
            session: {
                epost
            } = {}
        } = this.state;

        try {
            const newBudget = await createNewBudget(budsjett.tittel, epost);
            history.push('/');
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        const { budsjett } = this.state;
        const {
            session: {
                epost
            } = {}
        } = this.state;

        return (
            <div>
                <Body>
                    <h1>Lag et nytt budsjett</h1>

                    <form>
                        <label>
                            Tittel:
                            <input type="text" name="tittel" value={budsjett.tittel} onChange={this.handleInputChange.bind(this, "tittel")}></input>
                        </label>
                        <div>
                            <PrimaryButton onClick={this.handleNewBudgetClick.bind(this)}>Legg til nytt budsjett</PrimaryButton>
                        </div>
                    </form>
                </Body>
            </div>
        )
    }
}

export default BudsjettOpprett;
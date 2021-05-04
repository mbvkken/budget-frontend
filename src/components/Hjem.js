import React from 'react';
import jwtDecode from 'jwt-decode';
import { offWhite, primaryGreen, secondaryGreen } from '../App-Styles'
import { Body, BudsjettIcon, Carousel, Containit } from '../App-Styles';
import { Link } from 'react-router-dom';
import { deleteBudget, getBudgetByEpost, newBudget } from '../services/budget';
import BudsjettOpprett from './BudsjettOpprett';
import { Typography } from '@material-ui/core'
import { EditBud } from '../primitives/editDeleteElements';
import EditDeleteMenu from '../primitives/edDelMenu';
import BudsjettCarousel from '../primitives/Carousel';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styled from 'styled-components';
import { ReactComponent as KrIcon } from '../kr.svg'




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

    handleClick(budsjettObj) {
        const { history } = this.props;
        const { budsjett } = this.state;
        localStorage.setItem('currentBudget', JSON.stringify(budsjettObj));
        console.log(budsjettObj);
        history.push("/budsjett-detaljer")

    }

    render() {
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

        if (!budsjett) {
            return (
                <div>
                    <p>Ingen budsjett med id: {id} funnet...</p>
                </div>
            )
        }

        if (isLoading) {
            return (
                <div>Laster inn budsjetter...</div>
            )
        }
        const Centered = styled.div`
            display: grid;
            place-items: center;
            `;

        const budsjettElementer = budsjett
            .map(({ tittel, budsjettID }) => {
                return (
                    <BudsjettIcon key={budsjettID} onClick={() => this.handleClick({ budsjettID, tittel })}>

                        <Centered>
                            <KrIcon />

                            <h4 style={{ margin: "0px 0.4em", textAlign: "center" }}>{tittel}</h4>
                        </Centered>
                    </BudsjettIcon>
                )
            })

        return (
            <div>
                <Typography variant="h4" style={{ margin: "1em 20px" }}>Velkommen tilbake, {navn}!</Typography>
                <div>
                    <Typography variant="h5" style={{ margin: "0.5em 20px" }}>Mine budsjetter</Typography>
                    <Containit>
                        <Carousel>
                            {budsjettElementer}
                            <Link to="/budsjett-opprett">
                                <span>
                                    <BudsjettIcon>
                                        <Link to="/budsjett-opprett">
                                            <AddCircleOutlineIcon style={{ fill: `${secondaryGreen}`, fontSize: "70px" }} />
                                        </Link>
                                    </BudsjettIcon>
                                </span>
                            </Link>
                        </Carousel>
                    </Containit>
                </div>
                <div>
                    <Typography variant="h5" style={{ margin: "0.5em 20px" }}>Mine sparemål</Typography>
                    <Containit style={{backgroundColor: 'rgba(105, 105, 105, 0.8)'}}>
                        <div style = {{position: 'absolute', padding: '1.5em', fontSize: '30px', fontWeight: '900', color: `${offWhite}`}}>Kommer snart...</div>
                        <Carousel>
                            <BudsjettIcon>
                                <AddCircleOutlineIcon style={{ fill: `${secondaryGreen}`, fontSize: "70px" }} />
                            </BudsjettIcon>
                        </Carousel>
                    </Containit>

                </div>
            </div>
        )
    }

}

export default Hjem;
import React from 'react';
import jwtDecode from 'jwt-decode';
import { primaryGreen, secondaryGreen } from '../App-Styles'
import { Body, BudsjettIcon, Carousel, Containit } from '../App-Styles';
import { Link } from 'react-router-dom';
import { deleteBudget, getBudgetByEpost, newBudget } from '../services/budget';
import BudsjettOpprett from './BudsjettOpprett';
import { Typography } from '@material-ui/core'
import { EditBud } from '../primitives/editDeleteElements';
import EditDeleteMenu from '../primitives/edDelMenu';
import BudsjettCarousel from '../primitives/Carousel'
import HomeIcon from '@material-ui/icons/Home';
import { red } from '@material-ui/core/colors';
import styled from 'styled-components';
import { ReactComponent as KrIcon} from '../kr.svg'




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

    handleClick(id) {
        const { history } = this.props;
        const { budsjett } = this.state;
        console.log(budsjett);
        history.push("/budsjett-detaljer/" + id)

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
`
        const budsjettElementer = budsjett
            .map(({ tittel, budsjettID }) => {
                return (
                    <BudsjettIcon key={budsjettID} onClick={() => this.handleClick(budsjettID)}>

                        <Centered>
                            <KrIcon/>

                            <h3 style={{ margin: "0" }}>{tittel}</h3>
                        </Centered>
                    </BudsjettIcon>
                    /* <EditDeleteMenu budID={budsjettID} />
                <EditBud budID={budsjettID} /> */

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
                        </Carousel>
                    </Containit>
                </div>
                <div>
                    <Typography variant="h5" style={{ margin: "0.5em 20px" }}>Mine sparemål</Typography>

                    {/* {budsjettElementer} */}
                </div>
            </div>
        )
    }

}

export default Hjem;
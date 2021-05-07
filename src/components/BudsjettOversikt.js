import React from "react";
// import { Link } from 'react-router-dom';
import ListBudsjett from "../primitives/list";
import jwtDecode from "jwt-decode";
// import { Body, BudsjettIcon, Carousel, Containit, Horiz } from "../App-Styles";
// import { Link } from "react-router-dom";
import { getBudgetByEpost } from "../services/budget";
// import BudsjettOpprett from "./BudsjettOpprett";
// import { Typography } from "@material-ui/core";
// import { EditBud } from "../primitives/editDeleteElements";
// import EditDeleteMenu from "../primitives/edDelMenu";
// import BudsjettCarousel from "../primitives/Carousel";
// import { BudgetEDMenu } from "../primitives/edDelMenu.js";

class Hjem extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("bruker_budsjett_token");

    let payload;
    try {
      payload = jwtDecode(token);
      console.log(payload);
    } catch (err) {
      // throw new Error('noe gikk galt')
    }

    this.state = {
      budsjett: [],
      isLoading: false,
      error: null,
      message: "",
      session: payload,
    };
  }

  async componentDidMount() {
    await this.populateBudgets();
    // console.log(budID);
  }

  async populateBudgets() {
    const { session: { epost } = {} } = this.state;

    try {
      this.setState({ isLoading: true });
      const budsjett = await getBudgetByEpost(epost);
      this.setState({ budsjett: budsjett, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleClick(budsjettObj) {
    console.log(budsjettObj);
    const { history } = this.props;
    const { budsjett } = this.state;
    localStorage.setItem("currentBudget", JSON.stringify(budsjettObj));
    console.log(budsjettObj);
    history.push("/budsjett-detaljer");
  }

  render() {
    const { id } = this.props;
    const {
      session: { navn, epost } = {},
      budsjett,
      isLoading,
      error,
    } = this.state;

    if (error) {
      return <div>Kunne ikke hente budsjetter...</div>;
    }

    if (!budsjett) {
      return (
        <div>
          <p>Ingen budsjett med id: {id} funnet...</p>
        </div>
      );
    }

    if (isLoading) {
      return <div>Laster inn budsjetter...</div>;
    }

    const budsjettElementer = budsjett.map(({ tittel, budsjettID }) => {
      return (
        <ListBudsjett
          key={budsjettID}
          budID={budsjettID}
          tittel={tittel}
          history={this.props.history}
          refreshPage={this.populateBudgets.bind(this)}
        />
      );
    });

    return (
      <div style={{ display: "grid", placeItems: "center", width: "100vw" }}>
        <h1
          style={{
            margin: "1.2em 0em",
            fontFamily: "Ubuntu",
            fontWeight: "400",
          }}
        >
          Mine budsjetter
        </h1>{" "}
        {/* <Horiz> */}
        {budsjettElementer}
        {/* </Horiz> */}
      </div>
    );
  }
}

export default Hjem;

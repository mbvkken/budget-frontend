import React from "react";
// import { Nav, Body } from '../App-Styles';
// import { Link } from 'react-router-dom';
import { deleteBudget } from "../services/budget";
import {
  opprettNyKategori,
  /*endreKategori, sletteKategori,*/ getKatsByBudsjettID,
} from "../services/kategori";
import Katdiv from "./Kategori";
import NewKatAction from "../primitives/newAddKat";
import ControlledAccordions from "../primitives/accordian";
import styled from "styled-components";
import {
  PrimaryButton,
  Horiz,
  SecondaryButton,
  deleteRed,
} from "../App-Styles";
import { KatEDMenu } from "../primitives/edDelMenu";

class BudsjettLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overallSum: [],
      currentBudgetID: "",
      currentBudgetName: "",
      activeKat: "",
      isLoading: false,
      error: null,
      allKatsByID: [],
      kat: {
        tittel: "",
        ID: "",
      },
    };
  }

  async componentDidMount() {
    await this.populateKats();
    // console.log(this.state.allKatsByID);
  }

  async populateKats() {
    const unparsed = localStorage.getItem("currentBudget");

    const budget = JSON.parse(unparsed);
    await this.setState({
      currentBudgetID: budget.budsjettID,
      currentBudgetName: budget.tittel,
    });
    const id = this.state.currentBudgetID;

    try {
      this.setState({ isLoading: true });
      console.log(id);
      const kats = await getKatsByBudsjettID(budget.budsjettID);
      this.setState({ allKatsByID: kats, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  async handleDeleteBudgetClick() {
    const id = this.state.currentBudgetID;
    console.log(id);
    // if (!window.confirm("u sure?")) {
    //   return;
    // }

    try {
      await deleteBudget(id);
      const { history } = this.props;
      history.push("/");
    } catch (error) {
      console.log("sletting av budsjett feilet...", error);
    }
  }

  async handleClicker(ID) {
    await this.setState({ activeKat: ID });
  }
  async AllKatSum(sum) {
    const { overallSum } = this.state;
    await this.setState({
      overallSum: [...this.state.overallSum, sum],
    });

    console.log(overallSum);
  }

  render() {
    const id = this.state.currentBudgetID;
    const tittel = this.state.currentBudgetName;

    const { kat, allKatsByID } = this.state;

    const KatsElementer = allKatsByID.map(({ tittel, ID }) => {
      return (
        <Horiz key={ID} onClick={() => this.handleClicker(ID)}>
          <ControlledAccordions
            style={{ margin: "0" }}
            named={tittel}
            katid={ID}
            setMainSum={this.AllKatSum.bind(this)}
          />
          <KatEDMenu katid={ID} refreshPage={this.populateKats.bind(this)} />
        </Horiz>
      );
    });
    const toDisplay = this.state.overallSum
      .filter((item) => item)
      .reduce((a, b) => a + b, 0);
    return (
      <div style={{ width: "95vw" }}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            placeItems: "center",
            margin: "1.2em 0em",
            fontFamily: "Ubuntu",
            fontWeight: "400",
          }}
        >
          {tittel}
        </h1>
        <Horiz>
          <h1>Balanse: </h1>

          <h1 style={toDisplay >= 0 ? { color: "green" } : { color: "red" }}>
            {toDisplay}
          </h1>
        </Horiz>
        <NewKatAction
          refreshPage={this.populateKats.bind(this)}
          budID={this.state.currentBudgetID}
        />
        {KatsElementer}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          <SecondaryButton onClick={this.handleDeleteBudgetClick.bind(this)}>
            Slett budsjett
          </SecondaryButton>
        </div>
      </div>
    );
  }
}

export default BudsjettLink;

import React from "react";
// import { Nav, Body } from '../App-Styles';
// import { Link } from 'react-router-dom';
import { deleteBudget } from "../services/budget";
import {
  opprettNyKategori,
  /*endreKategori, sletteKategori,*/ getKatsByBudsjettID,
} from "../services/kategori";
import { PrimaryButton, Horiz } from "../App-Styles";
import Katdiv from "./Kategori";
import SimpleModal from "../primitives/addKat";
import { ControlledAccordions, FakeAccordion } from "../primitives/accordian";
import EdDelButton from "../primitives/edDelMenu.js";
import styled from "styled-components";

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
    // console.trace('hei');
  }

  async populateKats() {
    const unparsed = localStorage.getItem("currentBudget");

    const budget = JSON.parse(unparsed);
    await this.setState({
      currentBudgetID: budget.budsjettID,
      currentBudgetName: budget.tittel,
    });
    // const {currentBudget} = this.state;
    const id = this.state.currentBudgetID;
    console.log("othertest! " + this.state.currentBudgetID);

    try {
      this.setState({ isLoading: true });
      console.log(id);
      const kats = await getKatsByBudsjettID(budget.budsjettID);
      this.setState({ allKatsByID: kats, isLoading: false });
      // console.log(this.state.allKatsByID)
    } catch (error) {
      this.setState({ error });
    }
  }

  async handleDeleteClick() {
    const id = this.state.currentBudget.budsjettID;
    console.log(id);
    if (!window.confirm("u sure?")) {
      return;
    }

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
    // console.log(this.state.activeKat)
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
      // console.log('this is '+ID)
      return (
        <Horiz
          key={ID}
          onClick={() => this.handleClicker(ID)}
          style={{ width: "95%" }}
        >
          <ControlledAccordions
            named={tittel}
            katid={ID}
            setMainSum={this.AllKatSum.bind(this)}
          />
          <EdDelButton katid={ID} />
        </Horiz>
      );
    });
    const BottomRight = styled.div`
      position: fixed;
      bottom: 90px;
      right: 20px;
      z-index: 999;
    `;

    const toDisplay = this.state.overallSum
      .filter((item) => item)
      .reduce((a, b) => a + b, 0);
    // console.log(toDisplay);
    return (
      <div style={{ width: "95vw" }}>
        <button onClick={this.handleDeleteClick.bind(this)}>DELETE</button>
        <h1
          style={{ margin: "1em 0em", fontFamily: "Ubuntu", fontWeight: "400" }}
        >
          {tittel}
          {toDisplay}
        </h1>
        <button onClick={() => this.AllKatSum(5)}>clickme</button>
        {/* <h1>{tittel}</h1> */}
        {/* <FakeAccordion /> */}
        {KatsElementer}
        <BottomRight>
          <SimpleModal budID={this.state.currentBudgetID} />
        </BottomRight>
      </div>
    );
  }
}

export default BudsjettLink;

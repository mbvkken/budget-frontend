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
import ControlledAccordions from "../primitives/accordian";
import EdDelButton from "../primitives/edDelMenu.js";

class BudsjettLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overallSum: "",
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
    console.log(this.state.allKatsByID);
    // console.trace('hei');
  }

  updateOverallSum(newSum) {
    this.setState({ overallSum: newSum });
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
            setSum={this.updateOverallSum}
          />
          <EdDelButton katid={ID} />
        </Horiz>
      );
    });

    return (
      <div style={{ width: "95vw" }}>
        <button onClick={this.handleDeleteClick.bind(this)}>DELETE</button>

        <h1>{tittel}</h1>
        <SimpleModal budID={this.state.currentBudgetID} />
        {KatsElementer}
      </div>
    );
  }
}

export default BudsjettLink;

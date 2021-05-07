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
import { Horiz, SecondaryButton } from "../App-Styles";
import { KatEDMenu } from "../primitives/edDelMenu";
import CachedIcon from "@material-ui/icons/Cached";

const RefreshButton = styled.div`
  width: ${(props) => (props.toggle ? "40px" : "0px")};
  height: ${(props) => (props.toggle ? "40px" : "0px")};
  border-radius: 50%;
  display: grid;
  place-items: center;
  background-color: lightgrey;
  transition: 0.3s ease-in-out;
  margin: 10px;
  /* box-shadow: 5px 4px 6px -4px rgba(0, 0, 0, 0.59); */
  overflow: hidden;
  &:active {
    background-color: #7ac478;
    /* border: 0; */
    /* transform: scale(.99); */
    /* padding: 0.6em 1.6em; */
    transform: rotateZ(360deg);
  }
`;

class BudsjettLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshPage: false,
      callRefresh: 0,
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

  async AllKatSumRefresh(res) {
    const { overallSum } = this.state;
    await this.populateKats();
    await this.setState({
      overallSum: [],
      callRefresh: this.state.callRefresh + 1,
      refreshPage: res,
    });
    console.log(this.state.callRefresh);
  }

  smolboyRefresh() {
    // this.populateKats();
    this.setState({
      overallSum: [0],
      // callRefresh: this.state.callRefresh + 1,
    });
    console.log(this.state.callRefresh);
  }

  async AllKatSum(sum) {
    const { overallSum } = this.state;
    await this.setState({
      overallSum: [...this.state.overallSum, sum],
    });

    console.log(overallSum);
  }

  refreshPage() {
    window.location.reload();
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
            updateSum={this.state.callRefresh}
            refeshPlz={this.smolboyRefresh.bind(this)}
          />
          <KatEDMenu
            katid={ID}
            refreshPage={this.AllKatSumRefresh.bind(this)}
          />
        </Horiz>
      );
    });
    const toDisplay = this.state.overallSum
      .filter((item) => item)
      .reduce((a, b) => a + b, 0);
    return (
      <div style={{ width: "95vw" }}>
        {/* <div onClick={this.smolboyRefresh.bind(this)}>clickme</div> */}
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
          <h1
            style={
              toDisplay >= 0
                ? { color: "#0daa61", fontWeight: "400" }
                : { color: "#c03d3d" }
            }
          >
            <span style={{ color: "#262a38" }}>Balanse:</span> {toDisplay}kr
          </h1>

          <RefreshButton
            toggle={this.state.refreshPage}
            onClick={() => this.refreshPage()}
          >
            <CachedIcon />
          </RefreshButton>
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
          <SecondaryButton
            isTrue={"test"}
            onClick={this.handleDeleteBudgetClick.bind(this)}
          >
            Slett budsjett
          </SecondaryButton>
        </div>
      </div>
    );
  }
}

export default BudsjettLink;

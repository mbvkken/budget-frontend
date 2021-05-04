import React from "react";
import jwtDecode from "jwt-decode";
import { Body, offWhite, PrimaryButton } from "../App-Styles";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { formHelperTextClasses } from "@material-ui/core";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

class Profil extends React.Component {
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

  render() {
    const { session: { navn, epost } = {} } = this.state;

    const profilStyleOver = {
      backgroundColor: "#FAF9F6",
      width: "100vw",
      display: "grid",
      placeItems: "center",
    };
    const profilStyleUnder = {
      width: "auto",
      margin: "0em 1em",
    };

    const profilKort = {
      backgroundColor: "#3C5948",
      color: "#FAF9F6",
      width: "auto",
      borderRadius: "2px",
      padding: "2em",
    };

    const profilAvatar = {
      height: "200px",
      width: "200px",
      margin: "2rem",
      backgroundColor: deepOrange[500],
    };

    const profilSide = {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
    };

    const editButton = {
      width: "92%",
      fontSize: "medium",
    };

    const loggUtKnapp = {
      width: "92%",
      fontSize: "medium",
      marginTop: "0px",
    };

    const ToolTip = {};

    return (
      <div style={profilSide}>
        <div style={profilStyleOver}>
          <Avatar style={profilAvatar}>{navn}</Avatar>
        </div>
        <div style={profilStyleUnder}>
          <div style={profilKort}>
            <h2>Profil</h2>
            <p>Navn: {navn}</p>
            <p>Epost: {epost}</p>
            <h2>
              Innstillinger <HelpOutlineIcon style={{ fill: `${offWhite}` }} />
            </h2>
            <p>Kjønn: </p>
            <p>Årsinntekt: </p>
            <p>Bil: fossil/el/ingen</p>
            <p>Student: ja/nei</p>
          </div>
          <PrimaryButton style={editButton}>
            Rediger brukerinnstillinger
          </PrimaryButton>
          <Link to="/loggut">
            <PrimaryButton style={loggUtKnapp}>Logg ut</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profil;

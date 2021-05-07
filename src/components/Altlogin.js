import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { sjekkBruker } from "../services/session";
import { PrimaryButton, primaryGreen, secondaryGreen } from "../App-Styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: `${secondaryGreen} !important`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: `${primaryGreen}`,

    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");

  const [error, setError] = useState("");
  const [loginStatus, setStatus] = useState(false);

  async function handleLoginClick(event) {
    event.preventDefault();

    const { history } = props;
    // const { epost, passord } = loginDetails;

    try {
      setStatus({
        loginStatus: true,
      });
      setError({ err: "" });
      if (!epost || !passord) {
        throw new Error("Kunne ikke verifisere - prøv igjen.");
      }
      console.log(epost, passord);
      const result = await sjekkBruker({
        epost,
        passord,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.token) {
        throw new Error("Kunne ikke verifisere - prøv igjen.");
      }
      localStorage.setItem("bruker_budsjett_token", result.token);
      history.push("/");
    } catch (error) {
      await setError({ error });
      await setStatus({ loginStatus: false });
      console.log(loginStatus);
    }
  }

  function handleRegistrering(event) {
    event.preventDefault();
    const { history } = props;
    history.push("/registrer");
  }
  // const test = { err };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* <Typography component="h1" variant="h5"> */}
        <h1>Logg inn</h1>
        {/* </Typography> */}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
            id="email"
            label="Epost"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
            name="password"
            label="Passord"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Husk meg"
          />
          <PrimaryButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
            className={classes.submit}
            style={{ width: "100%", fontSize: "1em" }}
          >
            Logg inn
          </PrimaryButton>
          <PrimaryButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegistrering}
            className={classes.submit}
            style={{ width: "100%", fontSize: "1em", marginTop: "0" }}
          >
            Registrer deg
          </PrimaryButton>
        </form>
      </div>
      <div>
        {/* {loginStatus && <p>Logger inn...</p>} */}
        {/* {error && <p>Kunne ikke logge inn: {error.message}</p>} */}
      </div>
    </Container>
  );
}

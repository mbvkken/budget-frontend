import React from "react";
import { Link } from "react-router-dom";
import { registrerBruker, sjekkBruker } from "../services/session";
import { PrimaryButton } from "../App-Styles";

class RegistrerDeg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupForm: {
        navn: "",
        epost: "",
        passord: "",
        gjentaPassord: "",
      },
      isSigningUp: false,
      error: null,
    };
  }

  handleInputChange(field, event) {
    this.setState({
      signupForm: {
        ...this.state.signupForm,
        [field]: event.target.value,
      },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props;

    const { navn, epost, passord, gjentaPassord } = this.state.signupForm;

    this.setState({
      isSigningUp: true,
      error: null,
    });

    try {
      // if (!passord || !epost || !navn) {
      //     throw new Error('');
      // }
      if (passord !== gjentaPassord) {
        throw new Error("Passordene er ikke like");
      }

      const result = await registrerBruker({
        navn,
        epost,
        passord,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      const result2 = await sjekkBruker({
        epost,
        passord,
      });

      if (result2.error) {
        throw new Error(result.error);
      }

      if (!result2.token) {
        throw new Error("Kunne ikke verifisere - prøv igjen.");
      }

      localStorage.setItem("bruker_budsjett_token", result2.token);

      history.push("/");
    } catch (error) {
      this.setState({ error, isSigningUp: false });
    }
  }

  render() {
    const { isSigningUp, error } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h1>Registrer deg</h1>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              Navn:
              <input
                type="text"
                value={this.state.signupForm.navn}
                onChange={this.handleInputChange.bind(this, "navn")}
              />
            </label>
          </div>
          <div>
            <label>
              Epost:
              <input
                type="text"
                value={this.state.signupForm.epost}
                onChange={this.handleInputChange.bind(this, "epost")}
              />
            </label>
          </div>
          <div>
            <label>
              Passord:
              <input
                type="password"
                value={this.state.signupForm.passord}
                onChange={this.handleInputChange.bind(this, "passord")}
              />
            </label>
          </div>
          <div>
            <label>
              Gjenta passord:
              <input
                type="password"
                value={this.state.signupForm.gjentaPassord}
                onChange={this.handleInputChange.bind(this, "gjentaPassord")}
              />
            </label>
          </div>
          <div>
            <PrimaryButton type="submit">Registrer bruker</PrimaryButton>
          </div>

          <div>
            {isSigningUp && <p>Registrerer...</p>}
            {error && <p>Kunne ikke registrere bruker: {error.message}</p>}
          </div>
          <div>
            <Link to="/loggInn">Logg inn</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrerDeg;

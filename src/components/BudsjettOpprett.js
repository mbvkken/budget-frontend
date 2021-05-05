import React from "react";
import jwtDecode from "jwt-decode";
import { Body, PrimaryButton, Input, Label } from "../App-Styles";
import { createNewBudget } from "../services/budget";
import { Typography } from "@material-ui/core";

class BudsjettOpprett extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("bruker_budsjett_token");

    let payload;

    try {
      payload = jwtDecode(token);
    } catch (err) {
      throw new Error("kunne ikke autorisere");
    }

    this.state = {
      budsjett: {
        tittel: "",
        shared: "",
      },
      budsjettposter: [],
      session: payload,
      isLoading: false,
      error: null,
    };
  }

  handleInputChange(field, event) {
    event.preventDefault();
    this.setState({
      budsjett: {
        ...this.state.budsjett,
        [field]: event.target.value,
      },
    });
  }

  async handleNewBudgetClick(event) {
    event.preventDefault();
    const { history } = this.props;
    const { budsjett } = this.state;
    const { session: { epost } = {} } = this.state;

    try {
      // if (!budsjett.tittel.trim()) {
      //     alert('Please Enter title');
      //     return;
      //   }
      const newBudgetID = await createNewBudget(
        budsjett.tittel,
        budsjett.shared,
        epost
      );
      console.log(newBudgetID);

      const newBudgetObj = {
        budsjettID: newBudgetID,
        tittel: budsjett.tittel,
      };

      localStorage.setItem("currentBudget", JSON.stringify(newBudgetObj));
      history.push("/budsjett-detaljer");
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { budsjett } = this.state;

    const { session: { epost } = {}, isLoading, error } = this.state;

    // if (error) {
    //     return (
    //       <div>Kunne ikke hente budsjetter: {error.message}</div>
    //     );
    //   }

    if (isLoading) {
      return <div>Laster inn budsjetter...</div>;
    }
    return (
      <div>
        <Typography variant="h4" style={{ margin: "2em 0em" }}>
          Lag et nytt budsjett
        </Typography>

        <form>
          <div>
            <label>
              Tittel:
              <Input
                type="text"
                name="tittel"
                value={budsjett.tittel}
                placeholder="Budsjettnavn"
                onChange={this.handleInputChange.bind(this, "tittel")}
              />
            </label>
          </div>
          <div>
            <label>
              Del med:
              <Input
                type="text"
                name="shared"
                value={budsjett.shared}
                placeholder="Epost"
                onChange={this.handleInputChange.bind(this, "shared")}
              />
              <p style={{ margin: "0px" }}>Separer med ","</p>
            </label>
          </div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <PrimaryButton
              style={{ width: "100%" }}
              onClick={this.handleNewBudgetClick.bind(this)}
            >
              Legg til nytt budsjett
            </PrimaryButton>
          </div>
        </form>
      </div>
    );
  }

  //     return (
  //       <div>
  //         <h1
  //           style={{ margin: "2em 0em", fontFamily: "Ubuntu", fontWeight: "400" }}
  //         >
  //           Lag et nytt budsjett
  //         </h1>

  //         <form>
  //           <div>
  //             <label>
  //               Tittel:
  //               <Input
  //                 type="text"
  //                 name="tittel"
  //                 value={budsjett.tittel}
  //                 placeholder="Budsjettnavn"
  //                 onChange={this.handleInputChange.bind(this, "tittel")}
  //               />
  //             </label>
  //           </div>
  //           <div>
  //             <label>
  //               Del med:
  //               <Input
  //                 type="text"
  //                 name="shared"
  //                 value={budsjett.shared}
  //                 placeholder="Epost"
  //                 onChange={this.handleInputChange.bind(this, "shared")}
  //               />
  //               <p style={{ margin: "0px" }}>Separer med ","</p>
  //             </label>
  //           </div>
  //           <div style={{ display: "grid", placeItems: "center" }}>
  //             <PrimaryButton
  //               style={{ width: "100%" }}
  //               onClick={this.handleNewBudgetClick.bind(this)}
  //             >
  //               Legg til nytt budsjett
  //             </PrimaryButton>
  //           </div>
  //         </form>
  //       </div>
  //     );
  //   }
}

export default BudsjettOpprett;

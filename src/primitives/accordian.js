import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Katdiv from "../components/Kategori";
import EditKat from "./editDeleteElements";
import styled from "styled-components";
import { GiveSpace } from "../App-Styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(20),
//     flexBasis: "33.33%",
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// }));

export default function ControlledAccordions(props) {
  //   const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [totalSum, setTotalSum] = React.useState("");

  React.useEffect(() => props.setMainSum(totalSum), [totalSum]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Accordion
        style={{ margin: "0" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          style={{ height: "70px", boxShadow: "0px 3px 4px 0px #c4c2c2ab" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <GiveSpace>
            <h3 style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {props.named}
            </h3>

            <h3>{totalSum}</h3>
          </GiveSpace>
        </AccordionSummary>

        <Katdiv title={props.named} katid={props.katid} setSum={setTotalSum} />
      </Accordion>
    </div>
  );
}

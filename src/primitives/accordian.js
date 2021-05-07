import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Katdiv from "../components/Kategori";
import styled from "styled-components";
import { GiveSpace } from "../App-Styles";

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [totalSum, setTotalSum] = React.useState(0);
  // const prevNum = React.useRef(0)
  //Prev.current = totalSum;
  React.useEffect(() => {
    props.setMainSum(totalSum);
  }, [totalSum, props.updateSum]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNew = () => {
    // props.refeshPlz();
    props.setMainSum(totalSum);
    // console.log("hello");
  };
  return (
    <div style={{ width: "100%" }}>
      {/* <button onClick={() => handleNew()}>Clickme</button> */}
      <Accordion
        style={{ margin: "0" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          style={{
            height: "70px",
            boxShadow: "-1px 6px 14px 4px rgba(119,119,119,0.07)",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <GiveSpace>
            <h3 style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {props.named}
            </h3>

            <h3
              style={
                totalSum >= 0
                  ? {
                      color: "#0daa61",
                      letterSpacing: "1px",
                    }
                  : {
                      color: "#c03d3d",
                      letterSpacing: "1px",
                    }
              }
            >
              {totalSum}kr
            </h3>
          </GiveSpace>
        </AccordionSummary>

        <Katdiv title={props.named} katid={props.katid} setSum={setTotalSum} />
      </Accordion>
    </div>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Katdiv from "../components/Kategori";
import EditKat from "./editDeleteElements";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [totalSum, setTotalSum] = React.useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // function getTotalSum(posts){
  //     const summedUp =(posts.reduce((a, b) => a + (parseInt(b.sum) || 0), 0))
  //     this.setState({totalSum: summedUp})
  //   }

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{props.named}</Typography>
          <Typography className={classes.secondaryHeading}>
            {totalSum}
          </Typography>
          <EditKat katid={props.katid} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Katdiv
              title={props.named}
              katid={props.katid}
              setSum={setTotalSum}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PrimaryButton } from "../App-Styles";
import {
  opprettNyKategori,
  /*endreKategori, sletteKategori,*/ getKatsByBudsjettID,
} from "../services/kategori";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tittel, setTittel] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleNewKatClick(event) {
    event.preventDefault();

    try {
      await opprettNyKategori(tittel, props.budID);
    } catch (error) {}
    // const newKat = { ID: 5, budsjettID: props.budID, tittel: tittel };
    props.refreshPage();
    handleClose();
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <PrimaryButton onClick={handleOpen}>Legg til ny kategori</PrimaryButton>
      </div>
 
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>\
      <form>
        <Input
          placeholder="Tittel"
          value={tittel}
          onChange={(e) => setTittel(e.target.value)}
        />

        <div>
          <PrimaryButton onClick={handleNewKatClick}>
            Legg til ny kategori
          </PrimaryButton>
        </div>
      </form>
      </div>
        </Fade>
      </Modal>
    </div>
  );
}

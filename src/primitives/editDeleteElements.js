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
  getKatsByBudsjettID,
  endreKategori,
} from "../services/kategori";
import { updateBudget } from "../services/budget";

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

export default function EditKat(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.isOpen);
  const [tittel, setTittel] = useState("");
  // console.log(props.katid);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleNewKatClick(event) {
    console.log(tittel, props.katid);
    event.preventDefault();
    handleClose();
    try {
      await endreKategori(tittel, props.katid);
      //   window.location.reload(false);
    } catch (error) {}
  }

  return (
    <div>
      {/* <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab> */}

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
          <div className={classes.paper}>
            <form>
              <Input
                placeholder="Tittel"
                value={tittel}
                onChange={(e) => setTittel(e.target.value)}
              />

              <div>
                <PrimaryButton onClick={handleNewKatClick}>
                  Endre Kategori
                </PrimaryButton>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export function EditBud(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tittel, setTittel] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleBudClick(event) {
    console.log(tittel, props.budID);
    event.preventDefault();
    handleClose();
    try {
      await updateBudget(tittel, props.budID);
      //   window.location.reload(false);
    } catch (error) {}
  }

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>

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
          <div className={classes.paper}>
            <form>
              <Input
                placeholder="Tittel"
                value={tittel}
                onChange={(e) => setTittel(e.target.value)}
              />

              <div>
                <PrimaryButton onClick={handleBudClick}>
                  Endre Budsjett
                </PrimaryButton>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

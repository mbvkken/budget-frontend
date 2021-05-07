import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PrimaryButton, PrimaryButtonSmall, StyledModal } from "../App-Styles";
import {
  opprettNyKategori,
  getKatsByBudsjettID,
  endreKategori,
} from "../services/kategori";
import { updateBudget } from "../services/budget";
import { endrePost } from "../services/budsjettpost";
import Modal from "styled-react-modal";

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

export function EditKatold(props) {
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
    props.refreshPage();
  }

  return (
    <div>
      <PrimaryButtonSmall onClick={handleOpen}>Rediger</PrimaryButtonSmall>

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
                <PrimaryButtonSmall onClick={handleNewKatClick}>
                  Endre Kategori
                </PrimaryButtonSmall>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export function EditBud(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tittel, setTittel] = useState("");

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  async function handleBudClick(event) {
    console.log(tittel, props.budID);
    event.preventDefault();
    toggleModal();
    try {
      await updateBudget(tittel, props.budID);
      //   window.location.reload(false);
    } catch (error) {}
    props.refreshPage();
  }

  return (
    <div>
      <PrimaryButtonSmall onClick={toggleModal}>Rediger</PrimaryButtonSmall>

      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <form>
          <Input
            placeholder="Tittel"
            value={tittel}
            onChange={(e) => setTittel(e.target.value)}
          />
        </form>
        <PrimaryButtonSmall style={{ margin: "5px" }} onClick={handleBudClick}>
          Endre Budsjett
        </PrimaryButtonSmall>
      </StyledModal>
    </div>
  );
}

export function EditPostold(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.isOpen);
  const [tittel, setTittel] = useState("");
  const [sum, setSum] = useState("");

  // console.log(props.katid);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleEditPostClick(event) {
    console.log(tittel, props.postID);
    event.preventDefault();
    handleClose();
    try {
      await endrePost(tittel, sum, 0, props.postID);
      //   window.location.reload(false);
    } catch (error) {}
    props.refreshPage();
  }

  return (
    <div>
      <PrimaryButtonSmall onClick={handleOpen}>Rediger</PrimaryButtonSmall>

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
              <Input
                placeholder="Sum"
                value={sum}
                onChange={(e) => setSum(e.target.value)}
              />

              <div>
                <PrimaryButtonSmall onClick={handleEditPostClick}>
                  Endre Post
                </PrimaryButtonSmall>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export function EditPost(props) {
  const [tittel, setTittel] = useState("");
  const [sum, setSum] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  async function handleEditPostClick(event) {
    console.log(tittel, props.postID);
    event.preventDefault();
    toggleModal();
    try {
      await endrePost(tittel, sum, 0, props.postID);
      //   window.location.reload(false);
    } catch (error) {}
    props.refreshPage();
  }

  return (
    <div>
      <PrimaryButtonSmall onClick={toggleModal}>Rediger</PrimaryButtonSmall>

      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        style={{ width: "200px" }}
      >
        <form>
          <Input
            placeholder="Tittel"
            value={tittel}
            onChange={(e) => setTittel(e.target.value)}
          />
          <Input
            placeholder="Sum"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
          />
          {/* <Input placeholder="Tittel" value={tittel} onChange={e => setTittel(e.target.value)} /> */}
        </form>
        <div>
          <PrimaryButton onClick={handleEditPostClick}>Rediger</PrimaryButton>
        </div>
      </StyledModal>
    </div>
  );
}

export function EditKat(props) {
  const [tittel, setTittel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  async function handleNewKatClick(event) {
    console.log(tittel, props.katid);
    event.preventDefault();
    toggleModal();
    try {
      await endreKategori(tittel, props.katid);
      //   window.location.reload(false);
    } catch (error) {}
    props.refreshPage();
  }

  return (
    <div>
      <PrimaryButtonSmall onClick={toggleModal}>Rediger</PrimaryButtonSmall>

      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <form>
          <Input
            placeholder="Tittel"
            value={tittel}
            onChange={(e) => setTittel(e.target.value)}
          />
        </form>
        <div>
          <PrimaryButton onClick={handleNewKatClick}>
            Endre kategori
          </PrimaryButton>
        </div>
      </StyledModal>
    </div>
  );
}

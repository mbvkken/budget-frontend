import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PrimaryButton } from '../App-Styles';
import { opprettNyKategori, getKatsByBudsjettID, endreKategori } from '../services/kategori';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditKat(props) {
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
    console.log(props.katid)
    event.preventDefault();

    try {
      await endreKategori(tittel, props.katid);
    //   window.location.reload(false);
    } catch (error) {
    }
  };

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
       
            <Input placeholder="Tittel" value={tittel} onChange={e => setTittel(e.target.value)} />

          <div>
            <PrimaryButton onClick={handleNewKatClick}>Endre kategori</PrimaryButton>
          </div>
        </form>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}
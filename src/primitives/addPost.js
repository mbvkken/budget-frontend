import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PrimaryButton } from '../App-Styles';
import { opprettNyPost, /*endreKategori, sletteKategori,*/ getKatsByBudsjettID } from '../services/budsjettpost';
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
    border: '1px solid #000',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddPost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tittel, setTittel] = useState("");
  const [sum, setSum] = useState("");

  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleNewPostClick(event) {
    event.preventDefault();
const kategoriID = props.katid
const fast = 0;
    try {
      await opprettNyPost( tittel, sum, fast, kategoriID);
    } catch (error) {
    }
    handleClose();
  };

  return (
    <div>
   
 <Fab size="small" color="primary" aria-label="add" onClick={handleOpen}>
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
            <Input placeholder="Sum" value={sum} onChange={e => setSum(e.target.value)} />
            {/* <Input placeholder="Tittel" value={tittel} onChange={e => setTittel(e.target.value)} /> */}

          <div>
            <PrimaryButton onClick={handleNewPostClick}>Legg til nytt Post</PrimaryButton>
          </div>
        </form>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}
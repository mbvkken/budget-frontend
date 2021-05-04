import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { PrimaryButton,primaryGreen  } from '../App-Styles';
import styled from "styled-components";
import { registrerBruker,sjekkBruker } from '../services/session';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2c415e', //'#5e8c71',  //theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
},
submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: `${primaryGreen}`,
  },


}));

export default function SignUp(props) {
  const classes = useStyles();
//   const [signupForm, setSignUp] = useState({navn: '',
//   epost: '',
//   passord: '',
//   gjentaPassord: ''});

  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [gjentaPassord, setGjentaPassord] = useState('');




  

 const [err, setError] = useState('') ;
  const  [isSigningUp, setSigningUp] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const { history } = props;


    setSigningUp({
        isSigningUp: true
    });
    setError({  
        error: null
    });


    try {
        // if (!passord || !epost || !navn) {
        //     throw new Error('');
        // }
        if (passord !== gjentaPassord) {
            throw new Error('Passordene er ikke like');
        }
       
        const result = await registrerBruker( {
            navn, 
            epost,
            passord
        });

        if (result.error) {
            throw new Error(result.error);
        }

        const result2 = await sjekkBruker({
            epost,
            passord
        });

        if(result2.error) {
            throw new Error(result.error);
        }

        if(!result2.token) {
            throw new Error('Kunne ikke verifisere - prøv igjen.');
        }
    
        localStorage.setItem('bruker_budsjett_token', result2.token);
    
        history.push('/');
    } catch (error) {
        setSigningUp({
            isSigningUp: false
        });
        setError({  
            error: error
        });
    }
}

// const inputChange = (event) => {
//     setSignUp((prevState) => ({
//        ...prevState,
//        [field]: event.target.value
//     }));
// }
function handleRegistrering(event) {
    event.preventDefault();
    const { history } = props;
    history.push('/logginn')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value={navn}
                onChange={e => setNavn(e.target.value)}
                id="firstName"
                label="Navn"
                autoFocus
              />
            </Grid>
         
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={epost}
                onChange={e => setEpost(e.target.value)}
                id="email"
                label="Epost"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={passord}
                onChange={e => setPassord(e.target.value)}
                name="password"
                label="Passord"
                type="password"
                id="password"
                autoComplete="current-password"
                // className={classes.textfield}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={gjentaPassord}
                onChange={e => setGjentaPassord(e.target.value)}
                name="password"
                label="Gjenta Passord"
                type="password"
                id="password2"
                autoComplete="current-password"
                // className={classes.textfield}

              />
            </Grid>
       
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}

          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link onClick={handleRegistrering} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
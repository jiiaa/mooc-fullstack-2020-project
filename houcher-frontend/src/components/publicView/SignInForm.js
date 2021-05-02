import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import userService from '../../services/user';
import { setNotification } from '../../reducers/notificationReducer';
import { useHistory } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: '#000000',
      textDecoration: 'none',
    },
  },
});

function SignInForm(props) {
  const { classes } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value === passwordConfirmation) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handlePasswordConfirmation = (value) => {
    setPasswordConfirmation(value);
    if (value === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const createUser = async (event) => {
    event.preventDefault();
    try {
      const user = await userService.create({
        username: email,
        password,
      });
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      dispatch(
        setNotification(
          {
            message: `Käyttäjätili ${user.username} luotu. Voit nyt kirjautua sisään palveluun.`,
            alertType: 'success',
          },
          3
        )
      );
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    } catch (exception) {
      dispatch(
        setNotification({ message: exception.message, alertType: 'error' }, 5)
      );
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Luo käyttäjätili
          </Typography>
          <form className={classes.form} onSubmit={createUser}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              label="Sähköposti"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              label="Salasana"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Vahvista salasana"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => handlePasswordConfirmation(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={passwordMatch ? false : true}
            >
              Luo tili
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  className={classes.link}
                >
                  Onko sinulla jo tili? Kirjaudu sisään!
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInForm);

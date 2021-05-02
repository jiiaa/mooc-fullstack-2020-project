import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { Link as RouterLink } from 'react-router-dom';

import { setNotification } from '../../reducers/notificationReducer';
import { setUser } from '../../reducers/userReducer';
import { userLogin } from '../../reducers/loginReducer';
import userService from '../../services/user';
import apartmentService from '../../services/apartments';
import storage from '../../utils/storage';
import { setMyApartment } from '../../reducers/myApartmentReducer';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

function LoginForm(props) {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await userService.loginUser({
        username: email,
        password,
      });
      if (response.status === 200 && response.data.error) {
        dispatch(
          setNotification(
            {
              message: 'Väärä käyttäjätunnus tai salasana',
              alerType: 'error',
            },
            5
          )
        );
      }
      if (response.status === 200 && response.data.token) {
        const expireTime = Date.now() + 3600000;
        const user = { ...response.data, expireTime };
        storage.saveUser(user);
        apartmentService.setToken(user.token);
        dispatch(setUser(user));
        if (user.myHome) {
          const res = await apartmentService.getSingle(user.myHome);
          if (res.status === 200 && response.data) {
            dispatch(setMyApartment(res.data));
          }
        }
        dispatch(userLogin());
        history.push('/home');
      }
    } catch (exception) {
      console.error(exception.data);
      dispatch(
        setNotification(
          {
            message: exception.message,
            alertType: 'error',
          },
          5
        )
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
            Kirjaudu
          </Typography>
          <form onSubmit={loginUser} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Sähköposti"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Salasana"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Muista minut"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!email || !password ? true : false}
            >
              Kirjaudu
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Unohditko salasanan?
                </Link> */}
              </Grid>
              <Grid item>
                <Typography
                  component={RouterLink}
                  to="/signin"
                  variant="body2"
                  className={classes.link}
                >
                  {'Eikö sinulla ole vielä tiliä? Luo tili!'}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);

import React from 'react';

import { Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const apartmentTypes = [
  { label: 'Valitse talotyyppi', value: null },
  { label: 'Kerrostalo', value: 'kerrostalo' },
  { label: 'Rivitalo', value: 'rivitalo' },
  { label: 'Paritalo', value: 'paritalo' },
  { label: 'Omakotitalo', value: 'omakotitalo' },
];

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 0,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: 0,
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(20, 20, 1, 20),
  },
});

const UserInfoForm = ({
  classes,
  user,
  handleChange,
  editProfile,
  cancelEdit,
}) => {
  return (
    <>
      {/* <div className={classes.layout}> */}
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Käyttäjäprofiili
        </Typography>
        <form onSubmit={(e) => editProfile(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                name="username"
                label="Käyttäjätunnus"
                fullWidth
                disabled
                value={user.username}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="alias"
                name="alias"
                label="Nimi näytöllä"
                fullWidth
                autoFocus
                value={user.alias}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstname"
                name="firstname"
                label="Etunimi"
                fullWidth
                value={user.firstname}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                label="Sukunimi"
                fullWidth
                value={user.lastname}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Typography className={classes.heading} variant="h6" gutterBottom>
            Etsimäni asunto
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                id="newApartmentType"
                name="newApartmentType"
                label="Talotyyppi"
                fullWidth
                value={user.newApartmentType}
                onChange={(e) => handleChange(e)}
                SelectProps={{ native: true }}
              >
                {apartmentTypes.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    defaultValue={
                      option.value === user.newApartmentType
                        ? user.newApartmentType
                        : option.value
                    }
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                required
                id="newNumberOfRooms"
                name="newNumberOfRooms"
                label="Huoneiden määrä"
                helperText="Keittö mukaanlaskettuna"
                fullWidth
                value={user.newNumberOfRooms}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                required
                id="newPostalCode"
                name="newPostalCode"
                label="Postinumero"
                fullWidth
                value={user.newPostalCode}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                required
                id="newMaxPrice"
                name="newMaxPrice"
                label="Hintakatto"
                fullWidth
                value={user.newMaxPrice}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => cancelEdit(e)}
              >
                Peruuta
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Tallenna
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* </div> */}
    </>
  );
};

UserInfoForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfoForm);

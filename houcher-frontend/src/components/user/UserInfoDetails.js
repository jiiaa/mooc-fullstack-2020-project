import React from 'react';
import { Paper, Typography, Button, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  layout: {
    [theme.breakpoints.up(750 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 0,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(750 + theme.spacing(3) * 2)]: {
      marginTop: 0,
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1, 20, 1, 20),
  },
});

const UserInfoDetails = ({ classes, user, setIsEditing }) => {
  return (
    <>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.heading} variant="h6" gutterBottom>
            Käyttäjäprofiili
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Käyttäjätunnus:&nbsp;
                </Box>
                {user.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Nimi näytöllä:&nbsp;
                </Box>
                {user.alias}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                <Box fontWeight="fontWeightBold" component="span">
                  Etunimi:&nbsp;
                </Box>
                {user.firstname}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Sukunimi:&nbsp;
                </Box>
                {user.lastname}
              </Typography>
            </Grid>
          </Grid>
          <Typography className={classes.heading} variant="h6" gutterBottom>
            Etsimäni asunto
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Asunnontyyppi:&nbsp;
                </Box>
                {user.newApartmentType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Huoneiden määrä:&nbsp;
                </Box>
                {user.newNumberOfRooms}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Postinumero:&nbsp;
                </Box>
                {user.newPostalCode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <Box fontWeight="fontWeightBold" component="span">
                  Hintakatto:&nbsp;
                </Box>
                {user.newMaxPrice}€
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Muokkaa
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

UserInfoDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfoDetails);

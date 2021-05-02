import React from 'react';
import { Button, CircularProgress, Paper, Typography } from '@material-ui/core';
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
    borderRadius: '0 0 4px 4px',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: 0,
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paperProgress: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: 0,
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '20rem',
  },
});

const UserApartmentDetails = ({
  classes,
  myApartment,
  setIsEditingHome,
}) => {

  const { apartment } = myApartment;
  let content;

  if (myApartment.isFetching) {
    content = (
      <Paper className={classes.paperProgress}>
        <CircularProgress className={classes.progress} />
      </Paper>
    );
  } else if (myApartment.hasFetchError) {
    content = myApartment.errorMessage;
  } else {
    content = (
      <>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {apartment.price} € | {apartment.surfaceArea} m²
                </Typography>
                <Typography gutterBottom>
                  {apartment.streetAddress}, {apartment.city} |{' '}
                  {apartment.apartmentSetting}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.image}
                style={{
                  backgroundImage: apartment.images ? `url(${apartment.images[0]})` : '',
                }}
              />
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {apartment.header}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{apartment.description}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Asunnon tiedot
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Sijainti: {apartment.streetAddress}, {apartment.zipCode}{' '}
                  {apartment.city}{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Asuinpinta-ala: {apartment.surfaceArea} m²
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Rakennuksen tyyppi: {apartment.apartmentType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Asunnon kokoonpano: {apartment.apartmentSetting}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Huoneiden määrä: {apartment.numberOfRooms}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Rakennusvuosi: {apartment.buildYear}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Kerroksien määrä: {apartment.numberOfFloors}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Oma tontti: {apartment.hasOwnPlot ? 'Kyllä' : 'Ei'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Parveke: {apartment.hasOwnBalcony ? 'Kyllä' : 'Ei'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Hissi: {apartment.hasOwnElevator ? 'Kyllä' : 'Ei'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  Sauna: {apartment.hasOwnSauna ? 'Kyllä' : 'Ei'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Vaihtohinta: {apartment.Price} €</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setIsEditingHome(true)}
              >
                Muokkaa
              </Button>
            </Grid>
          </Paper>
        </div>
      </>
    );
  }
  return <>{content}</>;
};

UserApartmentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserApartmentDetails);

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import apartmentService from '../../services/apartments';
import userService from '../../services/user';
import { setUser } from '../../reducers/userReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { fetchSingleApartment } from '../../reducers/singleApartmentReducer';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '70vh',
  },
});

const SingleApartment = ({ classes }) => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const singleApartment = useSelector((state) => state.singleApartmentReducer);
  const user = useSelector((state) => state.userReducer);
  const { apartment } = singleApartment;

  const isLiked = apartment.likes
    ? apartment.likes.some(like => like.id === user.id)
    : false;

  useEffect(() => {
    dispatch(fetchSingleApartment(id));
  }, [dispatch, id]);

  const handleLike = async () => {
    const index = apartment.likes.findIndex(like => like.id === user.id);
    if (index === -1) {
      const time = Date.now();
      apartment.likes.push({
        id: user.id,
        time,
        ownerHasSeen: false
      })
    } else {
      apartment.likes.splice(index, 1);
    }
    apartment.user = apartment.user.id;

    const ind = user.myLikes.indexOf(id);
    if (ind === -1) {
      user.myLikes.push(id);
    } else {
      user.myLikes.splice(index, 1);
    }

    try {
      await apartmentService.editApartment(apartment);
      const resUser = await userService.editUser(user);
      dispatch(setUser(resUser.data));
      dispatch(fetchSingleApartment(id));
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: 'Hups! Jokin meni vikaan. Yritä myöhemmin uudelleen.',
            alertType: 'error',
          },
          5
        )
      );
    }
  };

  let content;

  if (singleApartment.isFetching) {
    content = (
      <div className={classes.layout}>
        <Skeleton variant="rect" height={400} />
      </div>
    );
  } else if (singleApartment.hasFetchError) {
    content = singleApartment.errorMessage;
  } else {
    content = (
      <>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.heading}>
                  <Typography variant="h5" gutterBottom>
                    {apartment.price} € | {apartment.surfaceArea} m²
                  </Typography>
                  <IconButton
                    aria-label="settings"
                    onClick={() => handleLike(apartment.id)}
                  >
                    {isLiked ? (
                      <FavoriteIcon color="primary" />
                    ) : (
                      <FavoriteBorderIcon color="primary" />
                    )}
                  </IconButton>
                </div>
                <Typography gutterBottom>
                  {apartment.streetAddress}, {apartment.city} |{' '}
                  {apartment.apartmentSetting}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                >
                  {apartment.images
                    ? apartment.images.map((item) =>(
                    <div key={item}>
                      <img src={item} alt="apartment" />
                    </div>
                    ))
                    : <></>
                  }
                </Carousel>
              </Grid>
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
                <Typography>Vaihtohinta: {apartment.price} €</Typography>
              </Grid>
              {Object.keys(apartment).length > 0 &&
              apartment.user.newApartmentType !== undefined &&
              apartment.user.newNumberOfRooms !== undefined ? (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Vaihto
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Asunnon tyyppi:{' '}
                      {Object.keys(apartment).length &&
                        apartment.user.newApartmentType},{' '}
                      {Object.keys(apartment).length &&
                        apartment.user.newNumberOfRooms}
                      h{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Postinumero:{' '}
                      {Object.keys(apartment).length &&
                        apartment.user.newPostalCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Hintakatto:{' '}
                      {Object.keys(apartment).length &&
                        apartment.user.newMaxPrice}{' '}
                      €
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Yhteystieto:{' '}
                      {Object.keys(apartment).length && apartment.user.username}
                    </Typography>
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Paper>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

SingleApartment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleApartment);

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import ApartmentCard from './ApartmentCard';
import apartmentService from '../../services/apartments';
import userService from '../../services/user';
import { filterApartments } from '../../utils/filter';
import { setUser } from '../../reducers/userReducer';
import { initializeApartments } from '../../reducers/apartmentReducer';
import { showAll } from '../../reducers/viewReducer';
import { setNotification } from '../../reducers/notificationReducer';

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

const CardList = ({ classes, user, apartmentContent, filter }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const view = useSelector((state) => state.viewReducer);
  const apartments = apartmentContent.apartments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((item) => item.id !== user.myHome);

  const toSingleView = (id) => {
    history.push(`/home/${id}`);
  };

  const lastNumber = (apArray) => {
    let num;
    if (!view) {
      num = 6;
    } else {
      num = apArray.length + 1;
    }
    return num;
  };

  const handleLike = async (id) => {
    const likedApartment = apartmentContent.apartments.find(
      (item) => item.id === id
    );
    
    const index = likedApartment.likes.findIndex(like => like.id === user.id);
    if (index === -1) {
      const time = Date.now();
      likedApartment.likes.push({
        id: user.id,
        time,
        ownerHasSeen: false
      })
    } else {
      likedApartment.likes.splice(index, 1);
    }
    likedApartment.user = likedApartment.user.id;

    const ind = user.myLikes.indexOf(id);
    if (ind === -1) {
      user.myLikes.push(id);
    } else {
      user.myLikes.splice(ind, 1);
    }

    try {
      // const resApartment = await apartmentService.editApartment(likedApartment);
      await apartmentService.editApartment(likedApartment);
      const resUser = await userService.editUser(user);
      // const updatedApartments = apartmentContent.apartments.filter(item => (
      //   item.id === id ? resApartment : item
      // ))
      dispatch(setUser(resUser.data));
      dispatch(initializeApartments());
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
  if (apartmentContent.isFetching) {
    content = (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton variant="rect" height={150} />
            <Skeleton variant="rect" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton variant="rect" height={150} />
            <Skeleton variant="rect" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton variant="rect" height={150} />
            <Skeleton variant="rect" />
          </Grid>
        </Grid>
      </Container>
    );
  } else if (apartmentContent.hasFetchError) {
    content = apartmentContent.errorMessage;
  } else {
    content = (
      <>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {filterApartments(apartments, filter, user)
              .slice(0, lastNumber(apartmentContent.apartments))
              .map((apartment) => (
                <Grid item key={apartment.id} xs={12} sm={6} md={4}>
                  <ApartmentCard
                    apartment={apartment}
                    user={user}
                    toSingleView={toSingleView}
                    handleLike={handleLike}
                  />
                </Grid>
              ))}
          </Grid>
          {!view ? (
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<ArrowDownwardIcon />}
                  onClick={() => dispatch(showAll())}
                >
                  Näytä lisää
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </Container>
      </>
    );
  }

  return <>{content}</>;
};

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
  apartmentContent: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardList);

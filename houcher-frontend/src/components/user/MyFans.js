import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import HeaderBar from '../common/HeaderBar';
import UserLikesAccordion from './UserLikesAccordion';
import apartmentService from '../../services/apartments';
import { setNewLikes } from '../../reducers/newLikesReducer';
import { fetchMyApartment } from '../../reducers/myApartmentReducer';
import { fetchMyFans } from '../../reducers/myFansReducer';

const header = {
  title: 'Asunnostasi tykänneet',
  description: 'Nämä haluavat vaihtaa asuntoosi',
  image:
    'https://houcher-apartment-images.s3.eu-central-1.amazonaws.com/pawel-czerwinski-1CZCGvc_DBQ-unsplash.jpg',
};

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginTop: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paperProgress: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginTop: '15px',
  },
});

const MyFans = ({ classes }) => {
  const dispatch = useDispatch();
  const myApartment = useSelector((state) => state.myApartmentReducer);
  const myFans = useSelector((state) => state.myFansReducer);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    const setLikesSeen = async () => {
      let likesSeen = [];
      if (myApartment.apartment.likes) {
        likesSeen = myApartment.apartment.likes.map((like) => {
          return {...like, ownerHasSeen: true }
        });
        const myApartmentLikesSeen = {
          ...myApartment.apartment,
          likes: likesSeen,
          user: user.id
        };
        try {
          await apartmentService.editApartment(myApartmentLikesSeen);
          dispatch(fetchMyApartment(user.myHome));
          dispatch(setNewLikes(null));
        } catch (exception) {
          console.error(exception);
        }
      };
    };

    setLikesSeen();
  }, [dispatch, user.id, user.myHome]);

  useEffect(() => {
    dispatch(fetchMyFans(user.myHome));
  }, [dispatch, user.myHome]);

  let content;

  if (user.id && !user.myHome) {
    content = (
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Asunnostasi tykänneiden omat asunnot
        </Typography>
        <Typography variant="body1">
          Et ole vielä lisännyt oman asuntosi tietoja.
        </Typography>
        <br></br>
        <Typography
          component={RouterLink}
          to={'/create'}
          variant="button"
        >
          Lisää oma asunto.
        </Typography>
      </Paper>
    )
  } else if (myFans.isFetching) {
    content = (
      <Paper className={classes.paperProgress}>
        <CircularProgress className={classes.progress} />
      </Paper>
    );
  } else if (myFans.hasFetchError) {
    content = (
      <Typography variant="body1">
        {myFans.errorMessage}
      </Typography>
    );
  } else if (myFans.myFans && myFans.myFans.length === 0) {
    content = (
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Asunnostasi tykänneiden omat asunnot
        </Typography>
        <Typography variant="body1">
          Kukaan ei ole vielä tykännyt asunnostasi.
        </Typography>
      </Paper>
    )
  } else {
    content = (
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Asunnostasi tykänneiden omat asunnot
        </Typography>
        {myFans.myFans &&
          myFans.myFans.map((item) => (
            <UserLikesAccordion key={item.myHome.id} apartment={item.myHome} />
          ))}
      </Paper>
    );
  }

  return (
    <>
      <HeaderBar header={header} />
      <div className={classes.layout}>
        {content}
      </div>
    </>
  );
};

MyFans.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyFans);
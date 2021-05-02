import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import HeaderBar from '../common/HeaderBar';
import UserLikesAccordion from './UserLikesAccordion';
import { fetchMyLikes } from '../../reducers/myLikesReducer';

const header = {
  title: 'Tykkäämäsi asunnot',
  description: 'Unelmiesi asunnot ovat tässä',
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

const MyLikes = ({ classes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const myLikes = useSelector((state) => state.myLikesReducer);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchMyLikes(user.id));
    }
  }, [dispatch, user.id]);

  let content;

  if (user.id && !user.myHome) {
    content = (
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Tykkäämäsi asunnot
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
  } else if (myLikes.isFetching) {
    content = (
      <Paper className={classes.paperProgress}>
        <CircularProgress className={classes.progress} />
      </Paper>
    );
  } else if (myLikes.hasFetchError) {
    content = (
      <Typography variant="body1">
        {myLikes.errorMessage}
      </Typography>
    );
  } else if (myLikes.user.myLikes && myLikes.user.myLikes.length === 0) {
    content = (
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Tykkäämäsi asunnot
        </Typography>
        <Typography variant="body1">
          Et ole vielä tykännyt yhdestäkään asunnosta.
        </Typography>
        <br></br>
        <Typography
          component={RouterLink}
          to={'/home'}
          variant="button"
        >
          Katsele asuntoja ja tykästy.
        </Typography>
      </Paper>
    )
  } else {
    content = (
      <Paper className={classes.paper}>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Tykkäämäsi asunnot
        </Typography>
        {myLikes.user.myLikes &&
          myLikes.user.myLikes.map((item) => (
            <UserLikesAccordion key={item.id} apartment={item} />
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

MyLikes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyLikes);
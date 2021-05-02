import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import UserLikesAccordion from './UserLikesAccordion';
import { fetchMyLikes } from '../../reducers/myLikesReducer';

const styles = (theme) => ({
  layout: {
    width: '100%',
    marginTop: 0,
    [theme.breakpoints.up(750 + theme.spacing(2) * 2)]: {
      maxWidth: 700,
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
  paperProgress: {
    textAlign: 'center',
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
  progress: {
    marginTop: '15px',
  },
});

const UserLikes = ({ classes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const myLikes = useSelector((state) => state.myLikesReducer);

  useEffect(() => {
    dispatch(fetchMyLikes(user.id));
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
    content = myLikes.errorMessage;
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

  return <div className={classes.layout}>{content}</div>;
};

UserLikes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserLikes);

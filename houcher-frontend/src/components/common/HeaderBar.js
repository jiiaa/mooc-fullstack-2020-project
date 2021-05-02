import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  main: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
});

const HeaderBar = (props) => {
  const { classes, header } = props;

  return (
    <>
      <Paper
        className={classes.main}
        style={{ backgroundImage: `url(${header.image})` }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {header.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {header.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);

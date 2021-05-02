import React from 'react';
// import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      {/* <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Sisältöä footeriin.
      </Typography> */}
      <Copyright />
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);

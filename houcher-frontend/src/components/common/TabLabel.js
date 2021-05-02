import React from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  responsive: {
    [theme.breakpoints.down(780)]: {
      display:'none'
    }
  },
});

const TabLabel = ({ text, classes }) => {
  
  return (
    <span className={classes.responsive}>
      {text}
    </span>
  );
};

export default withStyles(styles)(TabLabel);
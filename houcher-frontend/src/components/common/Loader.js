import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

const Loader = ({ classes }) => {
  const open = useSelector((state) => state.loaderReducer);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);

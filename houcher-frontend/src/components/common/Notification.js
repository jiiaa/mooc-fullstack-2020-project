import React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = () => {
  const classes = useStyles();
  const notification = useSelector((state) => state.notificationReducer);
  if (!notification) {
    return null;
  }

  return (
    <div className={classes.root}>
      {notification.message && (
        <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
          <Alert severity={notification.alertType}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Notification;

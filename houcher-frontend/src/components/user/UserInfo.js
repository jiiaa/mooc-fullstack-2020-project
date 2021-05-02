import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UserInfoDetails from './UserInfoDetails';
import UserInfoForm from './UserInfoForm';
import userService from '../../services/user';
import { setNotification } from '../../reducers/notificationReducer';
import { setUser } from '../../reducers/userReducer';

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
  submit: {
    margin: theme.spacing(1, 20, 1, 20),
  },
});

const UserInfo = ({ classes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    setUserObject((obj) => {return({
      ...obj,
      id: user.id,
      username: user.username,
      alias: user.lastname ? user.lastname : '',
      firstname: user.firstname ? user.firstname : '',
      lastname: user.lastname ? user.lastname : '',
      myHome: user.myHome ? user.myHome : null,
      myLikes: user.myLikes ? user.myLikes : [],
      newApartmentType: user.newApartmentType ? user.newApartmentType : '',
      newNumberOfRooms: user.newNumberOfRooms ? user.newNumberOfRooms : '',
      newPostalCode: user.newPostalCode ? user.newPostalCode : '',
      newMaxPrice: user.newMaxPrice ? user.newMaxPrice : '',
    });
    })
  }, [user,]);

  useEffect(() => {
    if (user.username && (!user.firstname || !user.lastname)) {
      dispatch(
        setNotification(
          {
            message: 'Täydennä profiilisi tiedot aluksi',
            alertType: 'success',
          },
          5
        )
      );
      setIsEditingUser(true);
    } else {
      setIsEditingUser(false);
    }
  }, [user.username, user.firstname, user.lastname, dispatch]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserObject({
      ...userObject,
      [name]: value,
    });
  };

  const cancelEdit = async (e) => {
    e.preventDefault();
    setIsEditingUser(false);
  };

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.editUser(userObject);
      setIsEditingUser(false);
      dispatch(setUser(response.data));
      dispatch(
        setNotification(
          {
            message: 'Profiilisi tiedot päivitettiin',
            alertType: 'success',
          },
          5
        )
      );
    } catch (exception) {
      console.error(exception.data);
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

  return (
    <>
      {user.username && (
        <div className={classes.layout}>
          {/* <Paper className={classes.paper}> */}
          {isEditingUser ? (
            <UserInfoForm
              user={userObject}
              handleChange={handleUserChange}
              editProfile={editProfile}
              cancelEdit={cancelEdit}
            />
          ) : (
            <UserInfoDetails user={user} setIsEditing={setIsEditingUser} />
          )}
          {/* </Paper> */}
        </div>
      )}
    </>
  );
};

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);

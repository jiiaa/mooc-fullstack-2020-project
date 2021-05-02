import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UserApartmentDetails from './UserApartmentDetails';
import UserApartmentForm from './UserApartmentForm';
import apartmentService from '../../services/apartments';
import {
  fetchMyApartment,
  setMyApartment,
} from '../../reducers/myApartmentReducer';
import { setNotification } from '../../reducers/notificationReducer';

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

const UserApartment = ({ classes }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer);
  const myApartment = useSelector((state) => state.myApartmentReducer);
  const [isEditingHome, setIsEditingHome] = useState(false);
  const [myApartmentObject, setMyApartmentObject] = useState({
    apartment: {
      streetAddress: '',
      zipCode: '',
      city: '',
      apartmentType: '',
      surfaceArea: '',
      numberOfRooms: '',
      buildYear: '',
      hasSauna: false,
      hasBalcony: false,
      hasOwnPlot: false,
      hasElevator: false,
      numberOfFloors: '',
      apartmentSetting: '',
      header: '',
      description: '',
      images: '',
      price: '',
    },
    isFetching: false,
    hasFetchError: false,
    errorMessage: null,
  });
  useEffect(() => {
    if (user.myHome === null) {
      history.push('/create');
      dispatch(
        setNotification(
          { message: 'Lisää oman asuntosi tiedot', alertType: 'success' },
          5
        )
      );
    } else if (user.myHome) {
      dispatch(fetchMyApartment(user.myHome));
    }
  }, [dispatch, history, user.myHome]);

  useEffect(() => {
    setMyApartmentObject(myApartment);
  }, [myApartment]);

  const handleInputChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const apartment = { ...myApartmentObject.apartment };
    apartment[name] = value;
    setMyApartmentObject({
      ...myApartmentObject,
      apartment,
    });
  };

  const cancelEdit = async (e) => {
    e.preventDefault();
    setIsEditingHome(false);
  };

  const editApartment = async (e) => {
    e.preventDefault();
    let editedApartment = myApartmentObject.apartment;
    editedApartment.user = user.id;
    try {
      const response = await apartmentService.editApartment(editedApartment);
      setIsEditingHome(false);
      dispatch(setMyApartment(response.data));
      dispatch(
        setNotification(
          {
            message: 'Oman asuntosi tiedot päivitettiin',
            alertType: 'success',
          },
          5
        )
      );
    } catch (exception) {
      console.error(exception);
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
      <div className={classes.layout}>
        {isEditingHome ? (
          <UserApartmentForm
            myApartment={myApartmentObject}
            editApartment={editApartment}
            handleInputChange={handleInputChange}
            // handleCheckboxChange={handleCheckboxChange}
            cancelEdit={cancelEdit}
          />
        ) : (
          <UserApartmentDetails
            myApartment={myApartmentObject}
            setIsEditingHome={setIsEditingHome}
          />
        )}
      </div>
    </>
  );
};

UserApartment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserApartment);

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';

import LaunchIcon from '@material-ui/icons/Launch';
import { Paper, Typography, Button, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

import { setNotification } from '../../reducers/notificationReducer';
import { startLoading, stopLoading } from '../../reducers/loaderReducer';
import apartmentService from '../../services/apartments';
import userService from '../../services/user';
import {
  apartmentTypeList,
  numberOfRoomsList,
} from '../../constants/constants';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  dragHere: {
    border: 'medium dashed ',
    width: '50%',
    padding: 20,
    textAlign: 'center',
  },
  dragHereSpan: {
    display: 'block',
    maxWidth: '8rem',
    margin: '0 auto',
  },
  dragHereButton: {
    maxWidth: '8.25rem',
    margin: '0 auto',
  },
  errors: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.2rem 0.4rem',
    backgroundColor: '#e57373',
    borderRadius: '4px',
    color: '#fff',
  },
  imageList: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '600px',
  },
  imageItem: {
    marginTop: '0.5rem',
    marginRight: '0.5rem',
  },
  submit: {
    margin: theme.spacing(1, 20, 1, 20),
  },
});

const ApartmentForm = ({ classes }) => {
  const user = useSelector((state) => state.userReducer);
  const [apartmentObject, setApartmentObject] = useState({
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
    images: 'link',
    price: '',
  });
  const [images, setImages] = useState([]);
  const maxNumber = 6;
  const accepType = ['jpg', 'jpeg', 'gif', 'png'];
  const maxFileSize = 5000000;
  const dispatch = useDispatch();
  const history = useHistory();

  const createNew = async (e) => {
    e.preventDefault();
    dispatch(startLoading());

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('fileToUpload[]', images[i].file);
    }

    const apartArray = Object.entries(apartmentObject);
    apartArray.map((i) => formData.append(i[0], i[1]));

    try {
      const newApartment = await apartmentService.create(formData);
      user.myHome = newApartment.id;
      await userService.editUser(user);

      dispatch(
        setNotification(
          { message: 'Asunto tallennettu.', alertType: 'success' },
          3
        )
      );
      dispatch(stopLoading());
      setTimeout(() => {
        history.push(`/home/${newApartment.id}`);
      }, 3000);
    } catch (exception) {
      dispatch(stopLoading());
      dispatch(
        setNotification(
          { message: 'Hups! Jokin meni vikaan.', alertType: 'error' },
          5
        )
      );
    }
  };

  const update = (e) => {
    setApartmentObject({
      ...apartmentObject,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const updateCheckBox = (e) => {
    setApartmentObject({
      ...apartmentObject,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePageChange = () => {
    window.open('https://asuntojen.hintatiedot.fi/haku/');
  };

  return (
    <>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Tallenna asunto
          </Typography>
          <form onSubmit={(e) => createNew(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="streetAddress"
                  name="streetAddress"
                  label="Katuosoite"
                  fullWidth
                  value={apartmentObject.streetAddress}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  id="surfaceArea"
                  name="surfaceArea"
                  label="Asunnon koko"
                  fullWidth
                  value={apartmentObject.surfaceArea}
                  onChange={(e) => update(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">m²</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Kaupunki/Paikkakunta"
                  fullWidth
                  value={apartmentObject.city}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  label="Postinumero"
                  fullWidth
                  value={apartmentObject.zipCode}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  select
                  id="numberOfRooms"
                  label="Huoneiden lukumäärä"
                  name="numberOfRooms"
                  onChange={(e) => update(e)}
                  value={apartmentObject.numberOfRooms}
                  required
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {numberOfRoomsList.map((number) => (
                    <option key={number.number} value={number.number}>
                      {number.number}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="apartmentType"
                  label="Talotyyppi"
                  name="apartmentType"
                  onChange={(e) => update(e)}
                  value={apartmentObject.apartmentType}
                  required
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {apartmentTypeList.map((type) => (
                    <option key={type.id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  id="buildYear"
                  name="buildYear"
                  label="Rakennusvuosi"
                  fullWidth
                  value={apartmentObject.buildYear}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  id="numberOfFloors"
                  name="numberOfFloors"
                  label="Kerroksien määrä"
                  fullWidth
                  value={apartmentObject.numberOfFloors}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  id="price"
                  name="price"
                  label="Hinta-arvio"
                  fullWidth
                  value={apartmentObject.price}
                  onChange={(e) => update(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  onClick={handlePageChange}
                  variant="contained"
                  color="secondary"
                  startIcon={<LaunchIcon />}
                >
                  Apua hinnoitteluun
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="apartmentSetting"
                  name="apartmentSetting"
                  label="Asunnon kokoonpano"
                  placeholder="esim. 2h, k, s"
                  fullWidth
                  value={apartmentObject.apartmentSetting}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="header"
                  name="header"
                  label="Ilmoituksen otsikko"
                  fullWidth
                  value={apartmentObject.header}
                  onChange={(e) => update(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Kuvaus asunnosta"
                  name="description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={apartmentObject.description}
                  onChange={(e) => update(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  maxFileSize={maxFileSize}
                  acceptType={accepType}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    // onImageRemoveAll,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <div
                        className={classes.dragHere}
                        {...dragProps}
                        style={isDragging ? { backgroundColor: '#e57373' } : undefined }
                      >
                        <span className={classes.dragHereSpan}>Raahaa kuva tähän</span>
                        <span>tai</span>
                        <div className={classes.dragHereButton}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={onImageUpload}
                            style={isDragging ? { color: '#fff' } : undefined }
                          >
                          Valitse kuva
                          </Button>
                        </div>
                      </div>
                      {errors && <div className={classes.errors}>
                        {errors.maxFileSize && <div>Kuvan tiedostokoko on suurempi kuin {maxFileSize} MB</div>}
                        {errors.acceptType && <div>Kuvan tiedostomuoto ei ole sallittu ({accepType.join(', ')})</div>}
                        {errors.maxNumber && <div>Kuvia voi olla enintään {maxNumber} kpl</div>}
                      </div>}
                      &nbsp;
                      {/* <button onClick={onImageRemoveAll}>
                        Remove all images
                      </button> */}
                      <div className={classes.imageList}>
                        {imageList.map((image, index) => (
                          <div key={index} className={classes.imageItem}>
                            <img src={image['data_url']} alt="" height="100" />
                            <div className="image-item__btn-wrapper">
                              <Button onClick={() => onImageRemove(index)}>
                                Poista kuva
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="hasSauna"
                      checked={apartmentObject.hasSauna}
                      onChange={(e) => updateCheckBox(e)}
                    />
                  }
                  label="Oma sauna"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="hasBalcony"
                      checked={apartmentObject.hasBalcony}
                      onChange={(e) => updateCheckBox(e)}
                    />
                  }
                  label="Parveke"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="hasOwnPlot"
                      checked={apartmentObject.ownPlot}
                      onChange={(e) => updateCheckBox(e)}
                    />
                  }
                  label="Oma tontti"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="hasElevator"
                      checked={apartmentObject.hasElevator}
                      onChange={(e) => updateCheckBox(e)}
                    />
                  }
                  label="Hissi"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Tallenna
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
    </>
  );
};

ApartmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApartmentForm);

import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

import {
  apartmentTypeList,
} from '../../constants/constants';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 0,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: '0 0 4px 4px',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: 0,
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  submit: {
    margin: theme.spacing(1, 20, 1, 20),
  },
});

const UserApartmentForm = ({
  classes,
  myApartment,
  editApartment,
  handleInputChange,
  handleCheckboxChange,
  cancelEdit,
}) => {
  const { apartment } = myApartment;

  return (
    <>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Tallenna asunto
          </Typography>
          <form onSubmit={(e) => editApartment(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="streetAddress"
                  name="streetAddress"
                  label="Katuosoite"
                  fullWidth
                  value={apartment.streetAddress}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="surfaceArea"
                  name="surfaceArea"
                  label="Asunnon koko"
                  fullWidth
                  value={apartment.surfaceArea}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Kaupunki"
                  fullWidth
                  value={apartment.city}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zipCode"
                  name="zipCode"
                  label="Postinumero"
                  fullWidth
                  value={apartment.zipCode}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  id="apartmentType"
                  name="apartmentType"
                  label="Talotyyppi"
                  fullWidth
                  value={apartment.apartmentType}
                  onChange={(e) => handleInputChange(e)}
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
                  id="numberOfRooms"
                  name="numberOfRooms"
                  label="Huoneiden määrä"
                  fullWidth
                  value={apartment.numberOfRooms}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="buildYear"
                  name="buildYear"
                  label="Rakennusvuosi"
                  fullWidth
                  value={apartment.buildYear}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="numberOfFloors"
                  name="numberOfFloors"
                  label="Kerroksien määrä"
                  fullWidth
                  value={apartment.numberOfFloors}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Hinta-arvio"
                  fullWidth
                  value={apartment.price}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="apartmentSetting"
                  name="apartmentSetting"
                  label="Asunnon kokoonpano"
                  fullWidth
                  value={apartment.apartmentSetting}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="header"
                  name="header"
                  label="Ilmoituksen otsikko"
                  fullWidth
                  value={apartment.header}
                  onChange={(e) => handleInputChange(e)}
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
                  value={apartment.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="hasSauna"
                      checked={apartment.hasSauna}
                      onChange={(e) => handleInputChange(e)}
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
                      checked={apartment.hasBalcony}
                      onChange={(e) => handleInputChange(e)}
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
                      checked={apartment.ownPlot}
                      onChange={(e) => handleInputChange(e)}
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
                      checked={apartment.hasElevator}
                      onChange={(e) => handleInputChange(e)}
                    />
                  }
                  label="Hissi"
                />
              </Grid>
            </Grid>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={(e) => cancelEdit(e)}
                >
                  Peruuta
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Tallenna
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </>
  );
};

UserApartmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserApartmentForm);

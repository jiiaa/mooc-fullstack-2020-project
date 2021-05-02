import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  Collapse,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputLabel,
  Select,
  Input,
  MenuItem,
  ListItemText,
  TextField,
  Switch,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { FilterList } from '@material-ui/icons';
import { showAll } from '../../reducers/viewReducer';
import {
  apartmentTypeList,
  numberOfRoomsList,
} from '../../constants/constants';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(915 + theme.spacing(2) * 2)]: {
      width: 915,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(915 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3),
    },
  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  filtersButton: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(),
  },
  formControl: {
    minWidth: 300,
    maxWidth: 300,
  },
});

const ApartmentFilter = ({ classes, applyFilter, filter }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      filter.numberOfRooms.length > 0 ||
      filter.apartmentTypes.length > 0 ||
      filter.bestSix === true
    ) {
      dispatch(showAll());
    }
  }, [filter, dispatch]);

  const handleChange = (e) => {
    applyFilter({
      ...filter,
      apartmentTypes: e.target.value,
    });
  };

  const handleRoomChange = (e) => {
    applyFilter({
      ...filter,
      numberOfRooms: e.target.value,
    });
  };

  const handleOrderChange = (e) => {
    applyFilter({
      ...filter,
      order: e.target.value,
    });
  };

  const handleBestChange = (e) => {
    applyFilter({
      apartmentTypes: [],
      numberOfRooms: [],
      order: undefined,
      bestSix: e.target.checked,
    });
  };

  const refresh = () => {
    applyFilter({
      apartmentTypes: [],
      numberOfRooms: [],
      order: undefined,
    });
  };

  return (
    <>
      <div className={classes.layout}>
        <Button
          className={classes.filtersButton}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <FilterList className={classes.leftIcon} />
          Hae asuntoja
        </Button>
        <Collapse in={filtersOpen}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filter.bestSix}
                        onChange={handleBestChange}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    label="Näytä sopivimmat vaihdot"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox-first">
                    Talotyyppi
                  </InputLabel>
                  <Select
                    multiple
                    // fullWidth
                    // margin="dense"
                    value={filter.apartmentTypes}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    input={<Input id="select-multiple-checkbox-first" />}
                  >
                    {apartmentTypeList.map((apartment) => (
                      <MenuItem key={apartment.id} value={apartment.type}>
                        <ListItemText primary={apartment.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox-second">
                    Huoneiden lukumäärä
                  </InputLabel>
                  <Select
                    multiple
                    // required
                    // fullWidth
                    //margin="dense"
                    value={filter.numberOfRooms}
                    onChange={handleRoomChange}
                    renderValue={(selected) => selected.join(', ')}
                    input={<Input id="select-multiple-checkbox-second" />}
                  >
                    {numberOfRoomsList.map((room) => (
                      <MenuItem key={room.number} value={room.number}>
                        <ListItemText primary={room.number} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  //margin="normal"
                  name="customerId"
                  label="Järjestä ilmoitukset"
                  value={filter.order === undefined ? '' : filter.order}
                  onChange={(e) => handleOrderChange(e)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option aria-label="Empty option" />
                  <option key="latest" value="latest">
                    Uusimman mukaan
                  </option>
                  <option key="oldest" value="oldest">
                    Vanhimman mukaan
                  </option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => refresh()}
                >
                  Tyhjennä
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
      </div>
    </>
  );
};

ApartmentFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  applyFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApartmentFilter);

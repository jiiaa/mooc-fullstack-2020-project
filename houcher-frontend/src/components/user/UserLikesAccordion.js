import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LaunchIcon from '@material-ui/icons/Launch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(2),
  },
  accordion: {
    backgroundColor: '#fafafa',
  },
  header: {
    display: 'inline-block',
  },
  launchIcon: {
    verticalAlign: 'sub',
    marginLeft: '10px',
  },
  details: {
    display: 'block',
  },
  image: {
    width: '100%',
  },
  description: {
    maxHeight: '93px',
    overflow: 'hidden',
  },
  threedots: {
    position: 'absolute',
    right: '20px',
    bottom: '43px',
    background: '#fafafa',
    paddingLeft: '8px',
  },
});

const UserLikesAccordion = ({ classes, apartment }) => {
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Typography variant="h5" className={classes.header} gutterBottom>
              {apartment.price} € | {apartment.surfaceArea} m²
            </Typography>
            <Link to={`/home/${apartment.id}`}>
              <LaunchIcon className={classes.launchIcon} color="secondary" />
            </Link>
            <Typography gutterBottom>
              {apartment.streetAddress}, {apartment.city} |{' '}
              {apartment.apartmentSetting}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <img
            src={apartment.images[0]}
            alt="apartment"
            width="600"
            className={classes.image}
          />
          <Typography variant="h6" gutterBottom>
            {apartment.header}
          </Typography>
          <Typography className={classes.description} gutterBottom>
            {apartment.description}
          </Typography>
          <div className={classes.threedots}>
            <MoreHorizIcon />
          </div>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push(`/home/${apartment.id}`)}
          >
            Näytä asunto
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withStyles(styles)(UserLikesAccordion);

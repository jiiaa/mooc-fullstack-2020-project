import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  CardMedia,
  CardHeader,
  IconButton,
  Grid,
  Divider,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import PropTypes from 'prop-types';

const styles = (theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardSecondary: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
  },
  size: {
    float: 'right',
  },
});

const ApartmentCard = ({
  classes,
  apartment,
  user,
  toSingleView,
  handleLike,
}) => {

  const isLiked = apartment.likes
  ? apartment.likes.some(like => like.id === user.id)
  : false;

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => handleLike(apartment.id)}
            >
              {isLiked ? (
                <FavoriteIcon color="primary" />
              ) : (
                <FavoriteBorderIcon color="primary" />
              )}
            </IconButton>
          }
          title={<Typography>{apartment.streetAddress}</Typography>}
          subheader={
            <>
              {apartment.zipCode} {apartment.city}
            </>
          }
        />
        <CardMedia
          className={classes.cardMedia}
          image={apartment.images[0]}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Grid container spacing={4} direction="row" justify="space-between">
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="h6">
                {apartment.price} €
              </Typography>
            </Grid>

            <Grid item xs>
              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                align="right"
              >
                {apartment.surfaceArea} m²
              </Typography>
            </Grid>
          </Grid>
          <Typography>{apartment.apartmentSetting}</Typography>
          <Typography>
            {apartment.apartmentType}, {apartment.buildYear}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent className={classes.cardSecondary}>
          <Grid container spacing={4} direction="row" justify="space-between">
            <Grid item xs>
              <Typography gutterBottom variant="subtitle2">
                Vaihto:
              </Typography>
            </Grid>
          </Grid>

          <Typography>
            {apartment.user.newApartmentType}
            , {apartment.user.newNumberOfRooms}h ,{' '}
            {apartment.user.newPostalCode}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => toSingleView(apartment.id)}
          >
            Lisää
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

ApartmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  apartment: PropTypes.object.isRequired,
  toSingleView: PropTypes.func.isRequired,
};

export default withStyles(styles)(ApartmentCard);

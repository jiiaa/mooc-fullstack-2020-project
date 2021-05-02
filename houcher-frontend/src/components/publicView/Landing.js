import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AccessTime, Favorite, MonetizationOn } from '@material-ui/icons';

const styles = (theme) => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '20.25%', // 16:9
    paddingBottom: '17.25%', // 16:9
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    //flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Landing(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Houcher
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Vaihda nykyinen asuntosi unelmiesi asuntoon! Houcherilla löydät
              uuden asunnon ja samalla myyt asuntosi sitä tarvitsevalle.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/login"
                  >
                    Kirjaudu
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={RouterLink}
                    to="/signin"
                  >
                    Luo tili
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardMedia}>
                    <MonetizationOn
                      style={{ color: '#4caf50', fontSize: 65 }}
                    />
                  </CardContent>

                  <CardContent className={classes.cardContent}>
                    <Typography>
                      Säästä selvää rahaa! Houcherilla et tarvitse välittäjää
                      etkä maksa välityspalkkioita.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardMedia}>
                    <AccessTime style={{ color: '#2979ff', fontSize: 65 }} />
                  </CardContent>

                  <CardContent className={classes.cardContent}>
                    <Typography>
                      Säästä aikaa! Löydä asunnollesi ostaja ja samalla
                      itsellesi unelmiesi asunto.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardMedia}>
                    <Favorite style={{ color: '#ff1744', fontSize: 65 }} />
                  </CardContent>

                  <CardContent className={classes.cardContent}>
                    <Typography>
                      Löydä asuntojen match ja nauti elämäsi tärkeimpien
                      kauppojen helppoudesta.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);

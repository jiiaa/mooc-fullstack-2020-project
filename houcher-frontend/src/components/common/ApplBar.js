import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  AccountCircle,
  HomeWorkOutlined,
  FavoriteBorderOutlined,
  GradeOutlined
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import LikesBadge from '../common/LikesBadge';
import TabLabel from './TabLabel';
import { userLogout } from '../../reducers/loginReducer';
import { resetUser } from '../../reducers/userReducer';
import { showSix } from '../../reducers/viewReducer';
import { resetApartments } from '../../reducers/apartmentReducer';
import { resetMyApartment } from '../../reducers/myApartmentReducer';
import { resetSingleApartment } from '../../reducers/singleApartmentReducer';
import { resetMyLikes } from '../../reducers/myLikesReducer';
import { resetMyFans} from '../../reducers/myFansReducer';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  flexgrow: {
    flexGrow: 2,
  },
  titleMain: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    paddingBottom: 4,
  },
  title: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    [theme.breakpoints.down(780)]: {
      marginLeft: '1.5rem',
    },
  },
});

const StyledTypography = withStyles({
  subtitle1: {
    marginLeft: '1rem',
    display: 'inline-block',
  },
})(Typography);

const ApplBar = ({ classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const user = useSelector((state) => state.userReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeWindow = () => {
    setAnchorEl(null);
  };

  // Reset localStorage and all reducers when loggin out
  // Redirect to landing page
  const handleLogout = () => {
    setAnchorEl(null);
    window.localStorage.clear();
    dispatch(resetUser());
    dispatch(resetApartments());
    dispatch(resetMyApartment());
    dispatch(resetSingleApartment());
    dispatch(resetMyLikes());
    dispatch(resetMyFans());
    dispatch(userLogout());
    dispatch(showSix());
    history.push('/');
  };

  const menuItemDisabled = user.myHome ? true : false;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            component={RouterLink}
            to={isLoggedIn ? '/home' : '/'}
            variant="h6"
            className={classes.titleMain}
          >
            Houcher
          </Typography>
          {isLoggedIn && (
            <>
              <div className={classes.flexgrow}>
                <StyledTypography
                  component={RouterLink}
                  to="/home"
                  variant="subtitle1"
                  className={classes.title}
                >
                  <IconButton>
                    <HomeWorkOutlined />
                  </IconButton>
                  <TabLabel text={'Kaikki asunnot'} />
                </StyledTypography>
                <StyledTypography
                  component={RouterLink}
                  to="/myfans"
                  variant="subtitle1"
                  className={classes.title}
                >
                  <IconButton>
                    <GradeOutlined />
                  </IconButton>
                  <LikesBadge
                    myFans={43}
                    text='Asunnostasi tykänneet'
                  />
                </StyledTypography>
                <StyledTypography
                  component={RouterLink}
                  to="/userlikes"
                  variant="subtitle1"
                  className={classes.title}
                >
                  <IconButton>
                    <FavoriteBorderOutlined />
                  </IconButton>
                  <TabLabel text={'Omat tykkäyksesi'} />
                </StyledTypography>
              </div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={closeWindow}
              >
                <MenuItem
                  component={RouterLink}
                  to="/home"
                  onClick={() => setAnchorEl(null)}
                >
                  Etusivu
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/user"
                  onClick={() => setAnchorEl(null)}
                >
                  Omat tiedot
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/create"
                  onClick={() => setAnchorEl(null)}
                  disabled={menuItemDisabled}
                >
                  Tallenna asunto
                </MenuItem>
                <MenuItem onClick={handleLogout}>Kirjaudu ulos</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

ApplBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplBar);

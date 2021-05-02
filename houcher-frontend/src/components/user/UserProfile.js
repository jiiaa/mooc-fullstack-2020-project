import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {
  AccountCircle,
  HomeOutlined,
  FavoriteBorderOutlined,
  GradeOutlined
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
import UserApartment from './UserApartment';
import UserLikes from './UserLikes';
import UserFans from './UserFans';
import TabLabel from '../common/TabLabel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const parseQueryParam = (param) => {
  const result = new RegExp('/?tab=([0-9]+)').exec(param);
  const tabNumber = result ? parseInt(result[1]) : 0;
  return tabNumber;
}

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(750 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  customflex: {
    justifyContent: 'space-around',
  }
});

const UserProfile = ({ classes }) => {
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const currentTab = parseQueryParam(window.location.search);
    history.push(`?tab=${currentTab}`);
    setValue(currentTab);
  }, [history])

  const handleTabChange = (event, newValue) => {
    const queryParams = `?tab=${newValue}`
    history.push(queryParams);
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.layout}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="simple-tabs"
            variant="fullWidth"
            classes={{ flexContainer: classes.customflex}}
          >
            <Tab
              icon={<AccountCircle />}
              label={<TabLabel text={'Omat tiedot'} />}
              {...a11yProps(0)} />
            <Tab
              icon={<HomeOutlined />}
              label={<TabLabel text={'Oma asunto'} />}
              {...a11yProps(1)}
            />
            <Tab
              icon={<GradeOutlined />}
              label={<TabLabel text={'Asunnostasi tykänneet'} />}
              {...a11yProps(3)}
            />
            <Tab
              icon={<FavoriteBorderOutlined />}
              label={<TabLabel text={'Omat tykkäyksesi'} />}
              {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <UserInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserApartment />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserFans />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserLikes />
        </TabPanel>
      </div>
    </>
  );
};

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);

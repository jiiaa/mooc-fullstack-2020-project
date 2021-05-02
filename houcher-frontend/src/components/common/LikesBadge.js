import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { setNewLikes } from '../../reducers/newLikesReducer';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 3,
    color: '#fff',
    padding: '10px 4px',
    fontSize: 14,
  },
}))(Badge);

const styles = (theme) => ({
  responsive: {
    [theme.breakpoints.down(780)]: {
      display:'none'
    }
  }
})

const LikesBadge = ({ text, classes }) => {
  const dispatch = useDispatch();
  const newLikes = useSelector((state) => state.newLikesReducer);
  const myApartment = useSelector((state) => state.myApartmentReducer);
  
  if (myApartment.apartment.likes) {
    let newLikes = null;
    myApartment.apartment.likes.forEach((like) => {
      if (like.ownerHasSeen === false) {
        newLikes++;
      }
    })
    dispatch(setNewLikes(newLikes));
  };

  return (
    <>
      {newLikes ?
        <StyledBadge color="secondary" badgeContent={newLikes}>
          <span className={classes.responsive}>{text}</span>
        </StyledBadge>
      :
        <span className={classes.responsive}>{text}</span>
      }
    </>
  );
};

export default withStyles(styles)( LikesBadge);

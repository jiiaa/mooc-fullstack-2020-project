import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../apartment/CardList';
import HeaderBar from './HeaderBar';
import ApartmentFilter from '../apartment/ApartmentFilter';
import { initializeApartments } from '../../reducers/apartmentReducer';
import {
  useQueryParams,
  ArrayParam,
  withDefault,
  StringParam,
  BooleanParam,
} from 'use-query-params';

const header = {
  title: 'Tervetuloa Houcheriin!',
  description: 'Aloitetaan unelmiesi asunnon etsintä',
  image:
    'https://houcher-apartment-images.s3.eu-central-1.amazonaws.com/pawel-czerwinski-1CZCGvc_DBQ-unsplash.jpg',
};

const Home = () => {
  const dispatch = useDispatch();
  const apartmentContent = useSelector((state) => state.apartmentReducer);
  const user = useSelector((state) => state.userReducer);
  const history = useHistory();
  const [filter, setFilter] = useQueryParams({
    apartmentTypes: withDefault(ArrayParam, []),
    numberOfRooms: withDefault(ArrayParam, []),
    order: StringParam,
    bestSix: withDefault(BooleanParam, false),
  });

  useEffect(() => {
    if (user.username && (!user.firstname || !user.lastname)) {
      history.push(`/user`);
    }
  }, [user, history]);

  useEffect(() => {
    dispatch(initializeApartments());
  }, [dispatch]);

  const applyFilter = (f) => {
    setFilter(f, 'push');
  };

  return (
    <>
      <HeaderBar header={header} />
      <ApartmentFilter applyFilter={applyFilter} filter={filter} />
      <CardList
        apartmentContent={apartmentContent}
        user={user}
        filter={filter}
      />
    </>
  );
};

export default Home;

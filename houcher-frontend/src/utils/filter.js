const findBest = (list, user) => {
  let returnedList;
  let firstFilter;

  // returnedList = list.filter(
  //   (apartment) => apartment.numberOfRooms === user.newNumberOfRooms
  // );

  // returnedList = list.filter(
  //   (apartment) => apartment.zipCode === user.newPostalCode
  // );

  firstFilter = list.filter(
    (apartment) =>
      apartment.apartmentType.toLowerCase() === user.newApartmentType
  );

  returnedList = firstFilter.filter(
    (apartment) =>
      parseInt(apartment.price, 10) <= parseInt(user.newMaxPrice, 10)
  );

  return returnedList;
};

export const filterApartments = (apartmentList, filterParams, user) => {
  let filteredList = apartmentList;

  if (filterParams.bestSix === true) {
    filteredList = findBest(apartmentList, user);
  }

  if (filterParams.apartmentTypes.length > 0) {
    filteredList = filteredList.filter((apartment) =>
      filterParams.apartmentTypes.includes(apartment.apartmentType)
    );
  }

  if (filterParams.numberOfRooms.length > 0) {
    filteredList = filteredList.filter((apartment) =>
      filterParams.numberOfRooms.includes(apartment.numberOfRooms)
    );
  }

  if (filterParams.order !== undefined) {
    if (filterParams.order === 'latest') {
      filteredList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (filterParams.order === 'oldest') {
      filteredList.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  }

  return filteredList;
};

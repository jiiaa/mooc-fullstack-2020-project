import axios from 'axios';
const baseUrl = '/api/apartments';

let token = '';

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response;
};

const getMyApartment = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const editApartment = async (editedObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const editUrl = `${baseUrl}/${editedObject.id}`;
  const response = await axios.put(editUrl, editedObject, config);
  return response;
};

export default { setToken, getAll, getSingle, getMyApartment, create, editApartment };

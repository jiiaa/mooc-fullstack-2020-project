import axios from 'axios';
import storage from '../utils/storage';

const baseUrl = '/api/user';

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.getUser().token}` },
  };
};

// User sigin i.e. create a new user account
const create = async (credentials) => {
  const signinUrl = baseUrl + '/signin';
  const response = await axios.post(signinUrl, credentials);
  return response.data;
};

// User login
const loginUser = async (credentials) => {
  const loginUrl = baseUrl + '/login';
  const response = await axios.post(loginUrl, credentials);
  return response;
};

// Get a user's not-populated data by ID
// User's home and likes cointain only the IDs
const getUser = async (id) => {
  const getUrl = `${baseUrl}/${id}`;
  const response = await axios.get(getUrl, getConfig());
  return response;
};

// Get a user's populated data by ID
// User's home and likes are populated
const getUserPopulated = async (id) => {
  const getUrl = `${baseUrl}/populate/${id}`;
  const response = await axios.get(getUrl, getConfig());
  return response;
};

// Get the home data for all users who have liked this user's home
const getUserFansHomes = async (id) => {
  const getUrl = `${baseUrl}/likes/${id}`;
  const response = await axios.get(getUrl, getConfig());
  return response;
};

// Edit the user data by ID
const editUser = async (user) => {
  const editUrl = `${baseUrl}/${user.id}`;
  const response = await axios.put(editUrl, user, getConfig());
  return response;
};

export default {
  create,
  loginUser,
  getUser,
  getUserPopulated,
  getUserFansHomes,
  editUser,
};

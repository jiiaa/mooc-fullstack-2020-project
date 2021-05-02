const storageKey = 'loggedHoucherUser';

const saveUser = (user) =>
  window.localStorage.setItem(storageKey, JSON.stringify(user));

const getUser = () =>
  JSON.parse(localStorage.getItem(storageKey));

const logoutUser = () =>
  localStorage.removeItem(storageKey);

export default {
  saveUser,
  getUser,
  logoutUser
}
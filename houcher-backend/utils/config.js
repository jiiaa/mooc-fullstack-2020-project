require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URI = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'development') {
  MONGO_URI = process.env.MONGO_URI_development;
}

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.MONGO_URI_test;
}

if (process.env.NODE_ENV === 'jukka') {
  MONGO_URI = process.env.MONGO_URI_jukka;
}

if (process.env.NODE_ENV === 'olli') {
  MONGO_URI = process.env.MONGO_URI_olli;
}

module.exports = {
  PORT,
  MONGO_URI
};

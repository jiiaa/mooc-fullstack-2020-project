const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userRouter = require('express').Router();
const User = require('../models/user');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// User sign-in endpoint
userRouter.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username or password missing' });
  }
  if (username.length < 1 || password.length < 1) {
    return res.status(400).json({ error: 'Username (12) or password (14) has too few characters' });
  }

  const saltRounds = 13;
  const pwHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    password: pwHash,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// User login endoint
userRouter.post('/login', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);
  if (!user || !passwordCorrect) {
    return response.status(200).send({
      error: 'Väärä käyttäjätunnus tai salasana'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  response
    .status(200)
    .send({
      token,
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      alias: user.alias,
      myHome: user.myHome,
      myLikes: user.myLikes,
      newApartmentType: user.newApartmentType,
      newNumberOfRooms: user.newNumberOfRooms,
      newPostalCode: user.newPostalCode,
      newMaxPrice: user.newMaxPrice
    });
});

// Get a user's data by user's ID
userRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  res.json(user);
});

// Get a user's data by user's ID and populate home and likes
userRouter.get('/populate/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id })
    .populate('myHome', { streetAddress: 1, apartmentSetting: 1 })
    .populate('myLikes', {
      streetAddress: 1,
      zipCode: 1,
      city: 1,
      apartmentType: 1,
      surfaceArea: 1,
      apartmentSetting: 1,
      header: 1,
      description: 1,
      price: 1,
      images: 1,
    });
  res.json(user);
});

/**
 * Get all users who have liked this apartment (ID) and populate their own apartment.
 * @param String apartment ID
 * @return Array users with myHome populated
 */
userRouter.get('/likes/:id', async (req, res) => {
  const id = req.params.id;
  console.log('id', id);
  const users = await User.find({ myLikes: mongoose.Types.ObjectId(id) })
    .populate('myHome', {
      streetAddress: 1,
      zipCode: 1,
      city: 1,
      apartmentType: 1,
      surfaceArea: 1,
      apartmentSetting: 1,
      header: 1,
      description: 1,
      price: 1,
      images: 1,
    });
  console.log('response:', users);
  res.json(users);
});

// Edit user data
userRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token puuttuu tai väärä' });
  }

  if (decodedToken.id === user.id) {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true } );
    console.log('updatedUser:', updatedUser);
    return res.status(200).send(updatedUser);
  }
});


module.exports = userRouter;

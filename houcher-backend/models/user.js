const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  alias: String,
  newPostalCode: String,
  newApartmentType: String,
  newNumberOfRooms: String,
  newMaxPrice: String,
  myHome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  },
  myLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment'
    }
  ],
},
{ timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;

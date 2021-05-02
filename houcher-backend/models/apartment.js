const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const apartmentSchema = new mongoose.Schema({
  streetAddress: String,
  zipCode: String,
  city: String,
  apartmentType: String,
  surfaceArea: String,
  numberOfRooms: String,
  buildYear: String,
  hasSauna: Boolean,
  hasBalcony: Boolean,
  hasOwnPlot: Boolean,
  hasElevator: Boolean,
  numberOfFloors: String,
  apartmentSetting: String,
  header: String,
  description: String,
  images: Array,
  price: String,
  likes: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true }
);

apartmentSchema.plugin(uniqueValidator);

apartmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Apartment', apartmentSchema);

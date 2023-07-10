const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const accomodationSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    uniqueCaseInsensitive: true,
    lowercase: true,
    dropDups: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  ideal_accommodation: {
    type: String,
    required: true
  },
  price_range: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  resolved: {
    type: Boolean,
    required: false,
    default: false
  },
}, {
  timestamps: true
});

accomodationSchema.plugin(mongooseUniqueValidator);
const Accomodations = mongoose.model('Accomodations', accomodationSchema);

module.exports = Accomodations;
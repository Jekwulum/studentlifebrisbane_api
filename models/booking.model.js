const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
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
  school: {
    type: String,
    required: true
  },
  airport_name: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  pickup_date: {
    type: String,
    required: Date
  },
  flight_number: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
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

bookingSchema.plugin(uniqueValidator);
const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;
const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
  re_password: Joi.any().equal(Joi.ref('password')).required().options({ messages: { 'any.only': 'passwords do not match' } })
});

const login = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
});

const contactUs = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  message: Joi.string().required()
});

const accommodation = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .trim()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  ideal_accommodation: Joi.string().required(),
  price_range: Joi.number().required(),
  location: Joi.string().required()
});

const booking = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .trim()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  school: Joi.string().required(),
  airport_name: Joi.string().required(),
  destination: Joi.string().required(),
  pickup_date: Joi.date().required(),
  flight_number: Joi.string().required(),
  passengers: Joi.number().required()
});

module.exports = { accommodation, booking, contactUs, createUser, login };
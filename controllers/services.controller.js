const config = process.env;
const sendMailService = require('../middlewares/email.service');
const validator = require('../middlewares/validators');
const { v4: uuidv4 } = require('uuid');
const AccomodationModel = require('../models/accommodation.model');
const BookingModel = require('../models/booking.model');

const ServicesController = {

  sendMail: (req, res) => {
    const { error, value } = validator.contactUs.validate(req.body);
    if (error) {
      return res.status(400).json({ status: "FAILED", message: error.details[0].message });
    }
    const { name, email, message } = value;

    try {
      const html =
        `<strong>Mail from ${name} with email: ${email}<strong>
        <br>
        <p>${message}<p>`;
      sendMailService(html, res)
    }
    catch (err) {
      res.status(500).json({ status: "FAILED", message: err.message });
    }
  },

  getAccommodations: async (req, res) => {
    AccomodationModel.find({})
      .then(accomodations => res.status(200).json({ status: "SUCCESS", data: accomodations }))
      .catch(err => res.status(500).json({ status: "FAILED", message: err.message }))
  },

  addAccomodation: async (req, res) => {
    try {
      const { error, value } = validator.accommodation.validate(req.body);
      if (error) {
        return res.status(400).json({ status: "FAILED", message: error.details[0].message });
      }

      value.id = uuidv4();
      let newAccomodation = new AccomodationModel(value);
      const savedDoc = await newAccomodation.save();

      if (savedDoc) {
        return res.status(201).json({ status: "SUCCESS", message: "accommodation request made" });
      } else return res.status(500).json({ status: "FAILED", message: "server error" });

    } catch (error) {
      return res.status(500).json({ status: "FAILED", message: error.message });
    }
  },

  updateAccomodation: async (req, res) => {
    let mydoc = await AccomodationModel.findById(req.params.id).exec();
    mydoc.resolved = true;
    await mydoc.save();
    res.status(200).json({ status: "SUCCESS", message: "Successfully updated record" });
  },

  getBookings: async (req, res) => {
    BookingModel.find({})
      .then(airportPickups => res.status(200).json({ status: "SUCCESS", data: airportPickups }))
      .catch(err => res.status(500).json({ status: "FAILED", message: err.message }))
  },

  addBooking: async (req, res) => {
    try {
      const { error, value } = validator.booking.validate(req.body);
      if (error) {
        return res.status(400).json({ status: "FAILED", message: error.details[0].message });
      }

      value.id = uuidv4();
      let newBooking = new BookingModel(value);
      const savedDoc = await newBooking.save();

      if (savedDoc) {
        return res.status(201).json({ status: "SUCCESS", message: "Booking request made" });
      } else return res.status(500).json({ status: "FAILED", message: "server error" });

    } catch (error) {
      return res.status(500).json({ status: "FAILED", message: error.message });
    }
  },

  updateBooking: async (req, res) => {
    let mydoc = await BookingModel.findById(req.params.id).exec();
    mydoc.resolved = true;
    await mydoc.save();
    res.status(200).json({ status: "SUCCESS", message: "Successfully updated record" });
  }
};


module.exports = ServicesController;
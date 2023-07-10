const router = require('express').Router();
const ServicesController = require('../controllers/services.controller')

router.post('/send-email', ServicesController.sendMail);

router.get('/accommodation', ServicesController.getAccommodations);

router.post('/accommodation', ServicesController.addAccomodation);

router.patch('/accommodation/:id', ServicesController.updateAccomodation);


router.get('/booking', ServicesController.getBookings);

router.post('/booking', ServicesController.addBooking);

router.patch('/booking/:id', ServicesController.updateBooking);

module.exports = router;
const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const tokenService = require('../middlewares/token.service');

router.post('/login', AuthController.login);

router.get('/user', tokenService.verifyToken, AuthController.getUser)

router.post('/logout', AuthController.logout);

router.post('/register', AuthController.register);

router.get('/get', AuthController.get);

module.exports = router;
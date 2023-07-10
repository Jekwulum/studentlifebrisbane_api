const bcrypt = require('bcrypt');
const config = process.env;
const validator = require('../middlewares/validators');
const { v4: uuidv4 } = require('uuid');
const TokenModel = require('../models/token.model');
const UserModel = require('../models/user.model');
const TokenService = require('../middlewares/token.service');


const AuthController = {
  get: async (req, res) => {
    UserModel.find({})
      .then(users => res.status(200).json({ users }))
      .catch(err => res.status(500).json({ status: "FAILED", message: err.message }));
  },

  getUser: async (req, res) => {
    UserModel.findOne({ id: req.user.id })
      .then(user => {
        res.status(200).json({ data: user })
      })
      .catch(err => res.status(500).json({ status: "FAILED", message: err.message }));
  },

  login: async (req, res) => {
    try {
      const { error, value } = validator.login.validate(req.body);
      if (error) {
        return res.status(400).json({ status: "FAILED", message: error.details[0].message });
      }

      const existingUser = await UserModel.findOne({ email: value.email });

      if (existingUser) {
        bcrypt.compare(value.password, existingUser.password, async (err, response) => {
          if (err || !response) res.status(400).json({ status: "FAILED", message: "Invalid login credentials" })
          else {
            const token = await TokenService.generateToken(existingUser.id, existingUser.email);
            await TokenModel.findOneAndUpdate({ id: existingUser.id }, token, { new: true })
            res.status(200).json({ status: "SUCCESS", "access": token });
          }
        })
      } else res.status(400).json({ status: "FAILED", message: "Invalid login credentials" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "FAILED", message: "error occurred" });
    }
  },

  logout: async (req, res) => {
    const id = TokenService.getValue(req, 'id');
    await TokenModel.deleteMany({ id });
    res.status(200).json({ status: "SUCCESS", message: "Logout successful" })
  },

  register: async (req, res) => {
    try {
      const { error, value } = validator.createUser.validate(req.body);
      if (error) {
        return res.status(400).json({ status: "FAILED", message: error.details[0].message });
      }

      const existingUser = await UserModel.findOne({ email: value.email });
      if (existingUser) {
        return res.status(400).json({ status: "FAILED", message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(Number(config.SALT_RATE));
      const hash = await bcrypt.hash(req.body.password, salt);

      value.password = hash;
      delete value.re_password;
      value.id = uuidv4();
      let user = new UserModel(value);
      const savedDoc = await user.save();

      if (savedDoc) {
        const token = await TokenService.generateToken(savedDoc.id, savedDoc.email);
        if (token) {
          return res.status(201).json({ status: "SUCCESS", access: token, message: "Staff added successfully" });
        } else {
          return res.status(500).json({ status: "FAILED", message: "no token found" });
        }
      } else {
        return res.status(500).json({ status: "FAILED", message: "server error" });
      }
    } catch (error) {
      return res.status(500).json({ status: "FAILED", message: error.message });
    }

  }
};

module.exports = AuthController;
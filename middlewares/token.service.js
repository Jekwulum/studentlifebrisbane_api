const config = process.env;
const jwt = require('jsonwebtoken');
const TokenModel = require("../models/token.model");

const tokenService = {
  bearerSplit: token => token.split(' ')[1],

  decodeToken: req => jwt.decode(tokenService.bearerSplit(req.headers['authorization']), process.env.SECRET_TOKEN),

  getValue: (req, key) => tokenService.decodeToken(req)[key],

  generateToken: async (id, email) => {
    const token = jwt.sign({ id, email }, config.SECRET_TOKEN, { expiresIn: "2h" });
    let tokenData = new TokenModel({ token, id });
    await tokenData.save();
    return token;
  },

  verifyToken: async (req, res, next) => {

    let token;
    if (req.headers && req.headers['authorization']) {
      token = req.headers['authorization'].split(" ")[1];
    }
    else return res.status(404).json({ status: "FAILED", message: "Error occurred, validation token not found" });
    
    // try {
    //   tokenExists = await TokenModel.findOne({ token }).exec();
    //   console.log(tokenExists, "exists");
    //   if (!tokenExists) return res.status(400).json({ status: "FAILED", message: "Invalid Token" });
    //   req.user = jwt.verify(token, config.TOKEN_KEY);
    // } catch (error) {
    //   return res.status(401).json({ status: "FAILED", message: "Invalid Token" });
    // }
    req.user = tokenService.decodeToken(req);
    return next();
  }
};

module.exports = tokenService;
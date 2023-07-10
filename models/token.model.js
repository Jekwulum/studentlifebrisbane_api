const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  id: {
    type: String,
    refPath: 'UsersRef',
    required: true
  }
}, {
  timestamps: true
});

tokenSchema.plugin(uniqueValidator);
const AuthTokens = mongoose.model('AuthTokens', tokenSchema);

module.exports = AuthTokens;
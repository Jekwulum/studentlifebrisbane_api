const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});
const Users = mongoose.model('Users', userSchema);

module.exports = Users;
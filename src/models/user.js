const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  direction: [{}],
  resetLink: {
    type: String,
    default: ''
  },
  verify: false,
  rol:{
    type: String,
    default: 'user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema)
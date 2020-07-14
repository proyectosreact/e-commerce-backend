const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    trim: true
  },
  direction: [{}],
  resetLink: {
    type: String,
    default: ''
  },
  verify: false,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema)
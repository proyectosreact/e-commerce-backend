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
  isAdmin:{
    type:Boolean,require:true,default:false
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
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema)
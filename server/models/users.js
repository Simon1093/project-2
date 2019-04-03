const mongoose = require('mongoose');

const usersScheme = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true
  },
  secondName: String,
  avatar: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  googleId: String
});

const Users = mongoose.model('Users', usersScheme);

module.exports = Users;

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model('Admin', adminSchema);

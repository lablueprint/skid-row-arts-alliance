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
  name: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Admin', adminSchema);

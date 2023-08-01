const mongoose = require('mongoose');

const nonprofitSchema = new mongoose.Schema({
  image: {
    required: false,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  website: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Nonprofit', nonprofitSchema);

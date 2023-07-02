const mongoose = require('mongoose');

const nonprofitSchema = new mongoose.Schema({
  organizationTitle: {
    required: true,
    type: String,
  },
  descriptions: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phoneNumer: {
    required: true,
    type: String,
  },
  website: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Nonprofit', nonprofitSchema);

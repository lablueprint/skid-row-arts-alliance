const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const timeSchema = new mongoose.Schema({
  startTime: {
    required: true,
    type: String,
  },
  endTime: {
    required: true,
    type: String,
  },
});

const eventSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Number,
  },
  time: {
    required: true,
    type: timeSchema,
  },
  /*
  location: {
    required: true,
    address: String,
    specialinstructions: String,
  },
  nonprofits: {
    required: true,
    type: [String],
  }
  description: {
    required: true,
    type: String,
  }
  images: {
    required: true,
    type: [String]
  }
  tags: {
    required: true,
    type: [String]
  }
  */
});

module.exports = mongoose.model('Event', eventSchema);

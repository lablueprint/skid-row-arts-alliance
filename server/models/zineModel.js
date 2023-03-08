const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionTitle: {
    required: true,
    type: String,
  },
  sectionPage: {
    required: true,
    type: Number,
  },
});

const zineSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String,
  },
  season: {
    required: true,
    type: String,
  },
  year: {
    required: true,
    type: String,
  },
  contents: {
    required: true,
    type: [sectionSchema],
  },
});

module.exports = mongoose.model('Zine', zineSchema);

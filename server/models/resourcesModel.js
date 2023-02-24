const mongoose = require('mongoose');

const coordsSchema = new mongoose.Schema({
  latitude: {
    required: true,
    type: Number,
  },
  longitude: {
    required: true,
    type: Number,
  },
});

const resourceSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  icon: {
    required: true,
    type: String,
  },
  coordinates: {
    required: true,
    type: coordsSchema,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);

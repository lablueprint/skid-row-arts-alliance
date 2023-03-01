const mongoose = require('mongoose');

const locationCoordsSchema = new mongoose.Schema({
  latitude: {
    required: true,
    type: Number,
  },
  longitude: {
    required: true,
    type: Number,
  },
});

const locationSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  specialinstructions: {
    required: true,
    type: String,
  },
  coordinates: {
    required: true,
    type: locationCoordsSchema,
  },
});

const resourceSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  icon: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: locationSchema,
  },
  nonprofits: {
    required: true,
    type: [String],
  },
  description: {
    required: true,
    type: String,
  },
  isResource: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);

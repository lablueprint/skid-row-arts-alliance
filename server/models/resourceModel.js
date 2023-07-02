const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  days: {
    required: true,
    type: [Number],
  },
  startTime: {
    required: true,
    type: String,
  },
  endTime: {
    required: true,
    type: String,
  },
});

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
  address: {
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
  dateDetails: {
    required: true,
    type: dateSchema,
  },
  locationDetails: {
    required: true,
    type: locationSchema,
  },
  host: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);

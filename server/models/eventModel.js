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

// TODO: edit the mobile app parsing of data
const dateSchema = new mongoose.Schema({
  recurring: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  day: {
    required: true,
    type: Number,
  },
  week: {
    required: true,
    type: Number,
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

const eventSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Event', eventSchema);

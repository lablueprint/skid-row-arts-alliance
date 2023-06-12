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
  date: {
    required: false,
    type: Date,
  },
  day: {
    required: true,
    type: String,
  },
  recurring: {
    required: true,
    type: String,
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
  hosts: {
    required: true,
    type: [String],
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

module.exports = mongoose.model('Event', eventSchema);

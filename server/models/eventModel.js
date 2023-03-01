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

const dateSchema = new mongoose.Schema({
  startDate: {
    required: true,
    type: Date,
  },
  endDate: {
    required: true,
    type: Date,
  },
  recurring: {
    required: true,
    type: Boolean,
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

const eventSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: dateSchema,
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
  images: {
    required: true,
    type: [String],
  },
  tags: {
    required: true,
    type: [String],
  },
  isResource: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model('Event', eventSchema);

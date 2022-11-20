const mongoose = require('mongoose');

// model schema to validate and structure documents
// const locationCoordsSchema = new mongoose.Schema({
//   required: true,
//   // TBD
// });

const dateSchema = new mongoose.Schema({
  day: {
    requred: true,
    day: String,
    date: String,
    recurring: Boolean,
  },
});

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

// const locationSchema = new mongoose.Schema({
//   required: true,
//   address: String,
//   specialinstructions: String,
//   coordinates: locationCoordsSchema,
// });

const eventSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: dateSchema,
  },
  time: {
    required: true,
    type: timeSchema,
  },
  // location: {
  //   required: true,
  //   type: locationSchema,
  // },
  // nonprofits: {
  //   required: true,
  //   type: [String],
  // },
  // description: {
  //   required: true,
  //   type: String,
  // },
  // images: {
  //   required: true,
  //   type: [String],
  // },
  // tags: {
  //   required: true,
  //   type: [String],
  // },
});

module.exports = mongoose.model('Event', eventSchema);

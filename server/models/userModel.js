const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  instagram: {
    required: false,
    type: String,
  },
  facebook: {
    required: false,
    type: String,
  },
  twitter: {
    required: false,
    type: String,
  },
});

// Model schema to validate and structure user info
const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: false,
    type: String,
  },
  socialMedia: {
    required: false,
    type: socialSchema,
  },
  bio: {
    required: false,
    type: String,
  },
  profilePicture: {
    required: false,
    type: String,
  },
  savedEvents: {
    required: true,
    type: [String],
  },
  savedArtwork: {
    required: true,
    type: [String],
  },
  userArtwork: {
    required: true,
    type: [String],
  },
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: {
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
  },
});
// TODO: adjust the schema to have the status and media type(s)
// requires updating frontend to account for status to display or not
const submissionSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  socials: {
    required: true,
    type: socialMediaSchema,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  s3keys: {
    required: true,
    type: [String],
  },
  thumbnail: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);

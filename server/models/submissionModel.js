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
});

module.exports = mongoose.model('Submission', submissionSchema);

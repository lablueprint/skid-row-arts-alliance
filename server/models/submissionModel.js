const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  platform: {
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
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

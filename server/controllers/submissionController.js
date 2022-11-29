const mongoose = require('mongoose');

const Submission = mongoose.model('Submission');

const createSubmission = async (req, res) => {
  const submission = new Submission(req.body);
  try {
    const response = await submission.save(submission);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const deleteSubmission = async (req, res) => {
  const { id } = req.params;
  try {
    await Submission.deleteOne({ _id: id });
    res.send(`Successfully deleted ${id}`);
  } catch (err) {
    console.error(err);
  }
};

const getSubmissions = async (req, res) => {
  res.send('Hello all');
};

const getSubmission = async (req, res) => {
  res.send(`Hello ${req.params.id}`);
};

module.exports = {
  createSubmission, deleteSubmission, getSubmissions, getSubmission,
};

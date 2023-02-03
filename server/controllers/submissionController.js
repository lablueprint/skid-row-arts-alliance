require('../models/submissionModel');
const mongoose = require('mongoose');

const Submission = mongoose.model('Submission');

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const createSubmission = async (req, res) => {
  const image = req.body.blob;
  const buf = Buffer.from(image, 'base64');
  const d = new Date().toLocaleString();
  const date = d.slice(0, d.length - 3)
    .split('/')
    .join('_')
    .split(' ')
    .join('_')
    .replace(',', '');
  const keyString = `${date}_${req.body.name}_${req.body.title}`; // account for multiple images in the future
  try {
    await s3.upload({
      Bucket: 'sraa-images',
      Key: keyString,
      ContentType: 'image/jpeg',
      Body: buf,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(1, data);
      }
    });
  } catch (err) {
    console.error(err);
  }

  // Mongo
  const submission = new Submission({
    name: req.body.name,
    email: req.body.email,
    socials: req.body.socials,
    title: req.body.title,
    description: req.body.description,
  });
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
  try {
    const data = await Submission.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getSubmission = async (req, res) => {
  res.send(`Hello ${req.params.id}`);
};

module.exports = {
  createSubmission, deleteSubmission, getSubmissions, getSubmission,
};

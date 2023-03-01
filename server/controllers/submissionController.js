require('../models/submissionModel');
const mongoose = require('mongoose');

const Submission = mongoose.model('Submission');

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const getFileName = (name, title) => {
  const d = new Date().toLocaleString();
  const date = d.slice(0, d.length - 3)
    .split('/')
    .join('_')
    .split(' ')
    .join('_')
    .replace(',', '');
  return `${date}_${name}_${title}`; // account for multiple images in the future
};

const createSubmission = async (req, res) => {
  // S3
  const { objects, name, title } = req.body;
  const keyString = getFileName(name, title);

  const s3Promises = await objects.map(async (object, index) => s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: `${keyString}_${index}`,
    ContentType: object.type,
    Body: Buffer.from(object.uri, 'base64'),
  }).promise());
  Promise.all(s3Promises).catch((err) => console.error(err));
  console.log('Done');

  const s3Keys = [];
  for (let i = 0; i < objects.length; i += 1) {
    s3Keys.push(`${keyString}_${i}`);
  }

  // Mongo
  const submission = new Submission({
    name: req.body.name,
    email: req.body.email,
    socials: req.body.socials,
    title: req.body.title,
    description: req.body.description,
    s3Keys,
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

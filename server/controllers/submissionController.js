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
  return `${date}_${name}_${title}`;
};

const createSubmission = async (req, res) => {
  // S3
  const { objects, name, title } = req.body;
  const keyString = getFileName(name, title);

  // Keys
  const s3keys = [];
  objects.slice(0, objects.length - 1).forEach((object, index) => {
    s3keys.push(`Submissions/${keyString}_${index}.${(object.type.split('/')[1] === 'quicktime') ? 'mov' : object.type.split('/')[1]}`);
  });
  const thumbnail = `Thumbnails/${keyString}.${objects[objects.length - 1].type.split('/')[1]}`;

  // Files
  const s3Promises = await objects.slice(0, objects.length - 1)
    .map(async (object, index) => s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: s3keys[index],
      ContentType: object.type,
      Body: Buffer.from(object.uri, 'base64'),
    }).promise());
  Promise.all(s3Promises).catch((err) => console.error(err));

  // Thumbnail
  try {
    await s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: thumbnail,
      ContentType: objects[objects.length - 1].type,
      Body: Buffer.from(objects[objects.length - 1].uri, 'base64'),
    }, (err) => {
      if (err) {
        console.log(err);
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
    s3keys,
    thumbnail,
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

const AWS = require('aws-sdk');
const Submission = require('../models/submissionModel');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const getAllSubmissions = async (req, res) => {
  try {
    // S3 Key retrieval from MongoDB
    // Empty `filter` means "match all documents"
    const filter = {};
    const allSubmissions = await Submission.find(filter);

    // Image retrieval from AWS S3
    const s3Promises = await allSubmissions.map(async (submission) => s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: submission.s3keys[0] ? submission.s3keys[0] : '0001Bulbasaur.png',
    }).promise());
    const imageDataList = Promise.all(s3Promises);

    // Reformat data for response
    const responseList = (await imageDataList).map((data, idx) => ({
      ContentType: data.ContentType,
      SubmissionId: allSubmissions[idx]._id,
      Encoding: `data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`,
    }));
    res.send(responseList);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getSubmission = async (req, res) => {
  try {
    // Art submission retrieval from MongoDB
    console.log(req.query);
    const submission = await Submission.findById(req.query.id);

    // Image retrieval from AWS S3
    const s3Promises = await submission.s3keys.map(async (s3key) => s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: s3key,
    }).promise());
    const mediaDataList = Promise.all(s3Promises);

    // Reformat data for response
    const mediaData = (await mediaDataList).map((data) => (
      {
        ContentType: data.ContentType,
        Encoding: `data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`,
      }
    ));
    res.send({
      MediaData: mediaData,
      Submission: submission,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

module.exports = {
  getAllSubmissions,
  getSubmission,
};

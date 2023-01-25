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
      Key: submission.s3keys[0],
    }).promise());
    const imageDataList = Promise.all(s3Promises);
    const responseList = (await imageDataList).map((data, idx) => ({
      ContentType: data.ContentType,
      SubmissionData: allSubmissions[idx],
      Encoding: `data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`,
    }));
    res.send(responseList);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllSubmissions,
};

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

    const thumbnailKeys = allSubmissions.map((submission) => (submission.s3keys[0] ? submission.s3keys[0] : '0007Squirtle.png'));
    // Reformat data for response
    const responseList = thumbnailKeys.map((key, idx) => ({
      SubmissionData: allSubmissions[idx],
      ImageURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`,
    }));
    res.send(responseList);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getSubmission = async (req, res) => {
  try {
    // Art submission retrieval from MongoDB
    const submission = await Submission.findById(req.query.id);

    // Retrieve data about S3 objects related to current submission
    const s3Promises = submission.s3keys.map(async (key) => s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    }).promise());
    const s3DataList = Promise.all(s3Promises);

    // Construct list of objects mapping ContentType to Object URL from S3
    const mediaDataList = (await s3DataList).map((data, idx) => ({
      ContentType: data.ContentType,
      MediaURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${submission.s3keys[idx]}`,
    }));
    res.send({
      MediaData: mediaDataList,
      Submission: submission,
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

module.exports = {
  getAllSubmissions,
  getSubmission,
};

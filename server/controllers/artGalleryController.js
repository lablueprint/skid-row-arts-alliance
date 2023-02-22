const Submission = require('../models/submissionModel');

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

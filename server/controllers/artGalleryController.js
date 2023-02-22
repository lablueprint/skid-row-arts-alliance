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
    console.error(err);
  }
};

module.exports = {
  getAllSubmissions,
};

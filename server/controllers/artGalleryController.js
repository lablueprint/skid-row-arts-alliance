const AWS = require('aws-sdk');
const Submission = require('../models/submissionModel');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// const imageList = ['0001Bulbasaur.png', '0004Charmander.png', '0007Squirtle.png'];

const retrieveImage = async (req, res) => {
  // S3 Key retrieval from MongoDB
  // Empty `filter` means "match all documents"
  const filter = {};
  const allImages = await Submission.find(filter);

  // Image retrieval from AWS S3
  const s3Promises = allImages.map((image) => s3.getObject({
    Bucket: 'test-sraa',
    Key: image.s3key,
  }).promise()
    .then((data) => ({
      ContentType: data.ContentType,
      Key: image.s3key,
      Encoding: `data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`,
    })));
  Promise.all(s3Promises)
    .then((list) => res.send(list))
    .catch((err) => console.log(err));
};

module.exports = {
  retrieveImage,
};

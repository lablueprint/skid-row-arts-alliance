const AWS = require('aws-sdk');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const retrieveImage = async (req, res) => {
  try {
    await s3.getObject({
      Bucket: 'test-sraa',
      Key: 'test3.png',
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send((`data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  retrieveImage,
};

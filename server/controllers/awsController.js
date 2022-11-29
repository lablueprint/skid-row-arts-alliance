const AWS = require('aws-sdk');
const fs = require('fs');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uploadImage = async (req, res) => {
  const fileContent = fs.readFileSync('C:/Users/sputn/Documents/LA Blueprint/skid-row-arts-alliance/server/controllers/001Bulbasaur.png');
  console.log(fileContent);
  try {
    await s3.upload({
      Bucket: 'testsraa',
      Key: 'test.png',
      Body: fileContent,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    res.send('here');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  uploadImage,
};

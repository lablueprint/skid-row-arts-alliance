const AWS = require('aws-sdk');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const imageList = ['test.png', 'test1.png', 'test2.png', 'test3.png'];

const retrieveImage = async (req, res) => {
  const s3Promises = imageList.map((key) => s3.getObject({
    Bucket: 'test-sraa',
    Key: key,
  }).promise()
    .then((data) => ({
      ContentType: data.ContentType,
      Encoding: `data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`,
    })));
  Promise.all(s3Promises)
    .then((list) => res.send(list))
    .catch((err) => console.log(err));

  // try {
  //   const encodingList = imageList.map((image) => {
  //     const encoding = s3.getObject({
  //       Bucket: 'test-sraa',
  //       Key: image,
  //     }, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //         return null;
  //       }
  //       return `data:${data.ContentType};base64,
  // ${Buffer.from(data.Body, 'binary').toString('base64')}`;
  //     });
  //     return encoding;
  //   });
  //   res.send(encodingList);
  // } catch (err) {
  //   console.error(err);
  // }
};

module.exports = {
  retrieveImage,
};

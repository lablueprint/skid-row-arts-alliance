const AWS = require('aws-sdk');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// const uploadImage = async (req, res) => {
//   console.log(fileContent);
//   try {
//     await s3.upload({
//       Bucket: 'test-sraa',
//       Key: 'LA/SRAA/test.png',
//       Body: fileContent,
//     }, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//     res.send('new here');
//   } catch (err) {
//     console.error(err);
//   }
// };

const retrieveImage = async (req, res) => {
  try {
    await s3.getObject({
      Bucket: 'test-sraa',
      Key: 'LA/SRAA/test.png',
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        let image = Buffer.from(data.Body).toString('base64');
        image = 'data:' + data.ContentType + ';base64,' + image;
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': data.ContentType,
        });
        res.send(image);
      }
    });
    // res.send('im');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  retrieveImage,
};

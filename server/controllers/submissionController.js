const AWS = require('aws-sdk');
const Submission = require('../models/submissionModel');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// const deleteThumbnail = async (key) => {
//   s3.deleteObject({
//     Bucket: process.env.S3_BUCKET,
//     Key: key,
//   }, (e, data) => {
//     if (e) {
//       console.log(e);
//     } else {
//       console.log(data);
//     }
//   });
// };

// const deleteSubmissions = async (keys) => {
//   const s3Promises = await objects.slice(0, objects.length - thumbnailExists)
//     .map(async (_, index) => s3.deleteObject({
//       Bucket: process.env.S3_BUCKET,
//       Key: s3keys[index],
//     }).promise());

//   Promise.all(s3Promises).catch(() => {
//     res.send('Failsafe failed to delete submissions', err);
//   });
//   res.send(err);
// };

const createSubmission = async (req, res) => {
  // S3
  const {
    objects, name, title, thumbnailExists,
  } = req.body;
  const d = new Date().toLocaleString();
  const date = d.slice(0, d.length - 3)
    .split('/')
    .join('_')
    .split(' ')
    .join('_')
    .replace(',', '');
  const keyString = `${date}_${name}_${title}`;

  // Keys
  const s3keys = [];
  objects.slice(0, objects.length - thumbnailExists).forEach((object, index) => {
    s3keys.push(`Submissions/${keyString}_${index}.${(object.type.split('/')[1] === 'quicktime') ? 'mov' : object.type.split('/')[1]}`);
  });
  const thumbnail = thumbnailExists ? `Thumbnails/${keyString}.${objects[objects.length - thumbnailExists].type.split('/')[1]}` : 'Thumbnails/default.jpg';

  // Thumbnail
  if (thumbnailExists) {
    try {
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: thumbnail,
        ContentType: objects[objects.length - thumbnailExists].type,
        Body: Buffer.from(objects[objects.length - thumbnailExists].uri, 'base64'),
      }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Files
  const s3Promises = await objects.slice(0, objects.length - thumbnailExists)
    .map(async (object, index) => s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: s3keys[index],
      ContentType: object.type,
      Body: Buffer.from(object.uri, 'base64'),
    }).promise());
  Promise.all(s3Promises).catch((err) => console.error(err));

  const mediaTypes = [];
  objects.slice(0, objects.length - thumbnailExists).forEach((o) => {
    mediaTypes.push(o.type.slice(0, o.type.indexOf('/')));
  });

  // Mongo
  const submission = new Submission({
    name: req.body.name,
    email: req.body.email,
    socials: req.body.socials,
    title: req.body.title,
    description: req.body.description,
    s3keys,
    thumbnail,
    tags: req.body.tags,
    mediaTypes,
    date: d.slice(0, d.indexOf(',')),
    status: 'Incomplete',
    comments: '',
  });

  try {
    const response = await submission.save(submission);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const deleteSubmission = async (req, res) => {
  const { id } = req.params;
  try {
    await Submission.deleteOne({ _id: id });
    res.send(`Successfully deleted ${id}`);
  } catch (err) {
    console.error(err);
  }
};

const getGalleryThumbnails = async (req, res) => {
  try {
    console.log('jhi');
    // S3 Key retrieval from MongoDB
    // Empty `filter` means "match all documents"
    const filter = {};
    const allSubmissions = await Submission.find(filter);

    const thumbnailKeys = allSubmissions.map((submission) => (submission.thumbnail ? submission.thumbnail : '0007Squirtle.png'));
    // Reformat data for response
    const responseList = thumbnailKeys.map((key, idx) => ({
      SubmissionId: allSubmissions[idx]._id,
      ImageURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`,
    }));
    res.send(responseList);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getArtworkDetails = async (req, res) => {
  try {
    // Art submission retrieval from MongoDB
    const submission = await Submission.findById(req.params.id);

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

const getSubmissions = async (req, res) => {
  try {
    // S3 Key retrieval from MongoDB
    // Empty `filter` means "match all documents"
    const filter = {};
    const allSubmissions = await Submission.find(filter);

    // Reformat data for response
    const responseList = allSubmissions.map((submission) => ({
      id: submission._id,
      title: submission.title,
      name: submission.name,
      status: submission.status,
      type: submission.mediaTypes,
      date: submission.date,
    }));
    res.send(responseList);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const updateSubmission = async (req, res) => {
  try {
    const data = await Submission.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createSubmission,
  deleteSubmission,
  getGalleryThumbnails,
  getArtworkDetails,
  getSubmissions,
  updateSubmission,
};

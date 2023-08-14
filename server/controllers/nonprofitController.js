const AWS = require('aws-sdk');
const Nonprofit = require('../models/nonprofitModel');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const addNonprofit = async (req, res) => {
  const { newNonprofit } = req.body;
  const nonprofitData = JSON.parse(newNonprofit);

  const { file } = req;
  const d = new Date().toLocaleString();
  const date = d.slice(0, d.length - 3)
    .split('/')
    .join('_')
    .split(' ')
    .join('_')
    .replace(',', '');
  const formattedTitle = nonprofitData.title.replace(/ /g, '_');
  const imageKey = `NonprofitThumbnails/${date}_${formattedTitle}.${file.mimetype.split('/')[1]}`;
  try {
    await s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: imageKey,
      ContentType: file.mimetype,
      Body: file.buffer,
    }).promise();
    nonprofitData.image = imageKey;
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }

  const nonprofit = new Nonprofit(nonprofitData);
  try {
    const data = await nonprofit.save(nonprofit);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const updateNonprofit = async (req, res) => {
  const { updatedNonprofit } = req.body;
  const nonprofitData = JSON.parse(updatedNonprofit);

  const { file } = req;
  if (file) {
    const d = new Date().toLocaleString();
    const date = d.slice(0, d.length - 3)
      .split('/')
      .join('_')
      .split(' ')
      .join('_')
      .replace(',', '');
    const formattedTitle = nonprofitData.title.replace(/ /g, '_');
    const imageKey = `NonprofitThumbnails/${date}_${formattedTitle}.${file.mimetype.split('/')[1]}`;
    try {
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: imageKey,
        ContentType: file.mimetype,
        Body: file.buffer,
      }).promise();

      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: nonprofitData.image,
      }).promise();
      nonprofitData.image = imageKey;
    } catch (err) {
      res.status(err.statusCode ? err.statusCode : 400);
      res.send(err);
    }
  }

  try {
    const data = await Nonprofit.findByIdAndUpdate(req.params.id, nonprofitData);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getAllNonprofits = async (_, res) => {
  try {
    const nonprofits = await Nonprofit.find();

    const allNonprofits = nonprofits.map((nonprofit) => ({
      ...nonprofit.toObject(),
      imageURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${nonprofit.image}`,
    }));

    res.send(allNonprofits);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getNonprofitFromTitle = async (req, res) => {
  try {
    const data = await Nonprofit.findOne({ title: req.params.title });

    const nonprofit = {
      ...data.toObject(),
      imageURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${data.image}`,
    };
    res.send(nonprofit);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const deleteNonprofit = async (req, res) => {
  try {
    const data = await Nonprofit.findByIdAndRemove(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

module.exports = {
  addNonprofit,
  updateNonprofit,
  getAllNonprofits,
  getNonprofitFromTitle,
  deleteNonprofit,
};

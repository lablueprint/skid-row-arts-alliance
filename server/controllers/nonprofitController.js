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
  try {
    const data = await Nonprofit.findByIdAndUpdate(req.params.id, req.body);
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
      image: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${nonprofit.image}`,
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
    res.send(data);
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

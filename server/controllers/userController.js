/* eslint-disable no-console */
const AWS = require('aws-sdk');
const User = require('../models/userModel');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const data = await user.save(user);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(111, req.body);  //prints out updatedUser info
    console.log(req.params.id);
    const data = await User.findByIdAndUpdate(req.params.id, req.body.updatedUser, { new: true });
    console.log('updated user:', data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
  console.log(req.body);
};

// send event as ["eventID"]
const addUserEvent = async (req, res) => {
  try {
    const data = await User.updateOne({ _id: req.params.id }, { $push: { savedEvents: req.body } });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// send resource as ["resourceID"]
const addUserResource = async (req, res) => {
  try {
    const data = await User.updateOne({ _id: req.params.id }, { $push: { savedResources: req.body } });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// send artwork as ["artworkID"]
const addUserArtwork = async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const data = await User.updateOne({ _id: req.params.id }, { $push: { savedArtwork: req.body } });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const getAllUserInfo = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getEmail = async (req, res) => {
  try {
    const data = await User.find({ email: req.params.email }, 'email');
    if (data.length === 0) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (err) {
    console.error(err);
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id, '-password');
    data.profilePicture = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${data.profilePicture}`;
    console.log(data);
    res.json({
      msg: data,
    });
  } catch (err) {
    console.error(err);
  }
};

const getUserEvents = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedEvents -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserResources = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedResources -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserArtwork = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedArtwork -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndRemove(req.params.id);
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

// send event as ["eventID"]
const removerUserEvent = async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const data = await User.updateOne({ _id: req.params.id }, { $pullAll: { savedEvents: req.body } });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// send event as ["eventID"]
const removeUserResource = async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const data = await User.updateOne({ _id: req.params.id }, { $pullAll: { savedResources: req.body } });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// send artwork as ["artworkID"]
const removeUserArtwork = async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const data = await User.updateOne({ _id: req.params.id }, { $pullAll: { savedArtwork: req.body } });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addUserProfilePicture = async (req, res) => {
  // S3
  const { image } = req.body;
  const userId = req.params.id;
  const s3key = `ProfilePictures/${userId}.${image.type.split('/')[1]}`;

  try {
    await s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: s3key,
      ContentType: image.type,
      Body: Buffer.from(image.uri, 'base64'),
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ s3key });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getUserProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = await User.findById(req.params.id, 'profilePicture -_id');
    console.log(profilePicture);
    res.json({
      imageURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${profilePicture}`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  getAllUserInfo,
  updateUser,
  addUserEvent,
  addUserResource,
  addUserArtwork,
  deleteUser,
  getEmail,
  getSpecificUser,
  getUserEvents,
  getUserResources,
  getUserArtwork,
  removerUserEvent,
  removeUserResource,
  removeUserArtwork,
  addUserProfilePicture,
  getUserProfilePicture,
};

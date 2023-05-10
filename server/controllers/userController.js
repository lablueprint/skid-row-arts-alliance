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
  const image = req.body.blob;
  const buf = Buffer.from(image, 'base64');
  const keyString = `ProfilePictures/${req.params.id}`;
  console.log(Object.keys(req.params.id));
  console.log(Object.keys(req.body));
  try {
    await s3.upload({
      Bucket: 'test-sraa',
      Key: keyString,
      ContentType: 'image/jpeg',
      Body: buf,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(1, data);
      }
    });
  } catch (err) {
    console.error(err);
  }
  console.log('s3');

  // try {
  //   const data = await User.updateOne({ _id: req.params.id }, { $push: { profilePicture: req.body } });
  //   res.json(data);
  // } catch (err) {
  //   console.log(err);
  // }
  console.log('done');
};

const getUserProfilePicture = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'profilePicture -_id');
    res.json({
      msg: data,
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
  addUserArtwork,
  deleteUser,
  getEmail,
  getSpecificUser,
  getUserEvents,
  getUserArtwork,
  removerUserEvent,
  removeUserArtwork,
  addUserProfilePicture,
  getUserProfilePicture,
};

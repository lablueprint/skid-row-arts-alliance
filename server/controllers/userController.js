/* eslint-disable no-console */
const User = require('../models/userModel');

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
    const data = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
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
    const data = await User.find({}, '-password -passwordResetCode');
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
    const data = await User.findById(req.params.id, '-password -passwordResetCode');
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
};

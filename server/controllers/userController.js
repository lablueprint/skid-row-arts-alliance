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
  User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

const addUserEvent = async (req, res) => {
  User.updateOne({ _id: req.params.id }, { $push: { savedEvents: req.body } }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};

const addUserArtwork = async (req, res) => {
  User.updateOne({ _id: req.params.id }, { $push: { savedArtwork: req.body } }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};

const getAllUserInfo = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getSpecificUser = async (req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      res.json({
        msg: data,
      });
    }
  });
};

const getUserEvents = async (req, res) => {
  User.find({ _id: req.params.id }, 'savedEvents -_id', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      res.json({
        msg: data,
      });
    }
  });
};

const getUserArtwork = async (req, res) => {
  User.find({ _id: req.params.id }, 'savedArtwork -_id', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      res.json({
        msg: data,
      });
    }
  });
};

const deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      res.json({
        msg: data,
      });
    }
  });
};

const removerUserEvent = async (req, res) => {
  User.updateOne({ _id: req.params.id }, { $pullAll: { savedEvents: req.body } }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};

const removeUserArtwork = async (req, res) => {
  // eslint-disable-next-line max-len
  User.updateOne({ _id: req.params.id }, { $pullAll: { savedArtwork: req.body } }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};

module.exports = {
  createUser,
  getAllUserInfo,
  updateUser,
  addUserEvent,
  addUserArtwork,
  deleteUser,
  getSpecificUser,
  getUserEvents,
  getUserArtwork,
  removerUserEvent,
  removeUserArtwork,
};

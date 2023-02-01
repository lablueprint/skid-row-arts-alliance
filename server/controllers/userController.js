/* eslint-disable no-console */
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Example of creating a document in the database
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

const getAllUserInfo = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

// const deleteEvent = async (req, res) => {
//   Event.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       console.error(error);
//     } else {
//       res.json({
//         msg: data,
//       });
//     }
//   });
// };

module.exports = {
  createUser,
  getAllUserInfo,
  updateUser,
//   deleteEvent,
};

const nodemailer = require('nodemailer');
const User = require('../models/userModel');

const createResetCode = async (req, res) => {
  // generate a random integer between 0 and 9999
  const randomInt = Math.floor(Math.random() * 10000);
  // pad the integer with leading zeros to make it a 4-digit string
  const passwordResetCode = String(randomInt).padStart(4, '0');

  User.findOneAndUpdate({ email: req.body.email }, { passwordResetCode }, (err, data) => {
    if (err) {
      console.error(err);
      res.json({
        email: data.email,
        action: 'createResetCode',
        error: err
      });
    } else {
      res.json({
        email: data.email,
        action: 'createResetCode',
        error: null,
      });
    }
  });
};

const deleteResetCode = async (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, { passwordResetCode: '' }, (err, data) => {
    if (err) {
      console.error(err);
      res.json({
        email: data.email,
        action: 'deleteResetCode',
        error: err,
      })
    } else {
      res.json({
        email: data.email,
        action: 'deleteResetCode',
        error: null,
      })
    }
  });
};

module.exports = {
  createResetCode,
  deleteResetCode,
};

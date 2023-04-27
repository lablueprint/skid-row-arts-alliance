const nodemailer = require('nodemailer');
const User = require('../models/userModel');

// Example of creating a document in the database
const createResetCode = async (req, res) => {
  // generate a random integer between 0 and 9999
  const randomInt = Math.floor(Math.random() * 10000);
  // pad the integer with leading zeros to make it a 4-digit string
  const passwordResetCode = String(randomInt).padStart(4, '0');

  User.findOneAndUpdate({ email: req.body.email }, { passwordResetCode }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json({ email: data.email });
    }
  });
};

module.exports = {
  createResetCode,
};

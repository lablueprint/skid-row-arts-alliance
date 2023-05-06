const nodemailer = require('nodemailer');
const User = require('../models/userModel');

const createResetCode = async (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host:'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    secure: true,
  });

  // generate a random integer between 0 and 9999
  const randomInt = Math.floor(Math.random() * 10000);
  // pad the integer with leading zeros to make it a 4-digit string
  const passwordResetCode = String(randomInt).padStart(4, '0');
  console.log({user: process.env.MAIL_USER, pass: process.env.MAIL_PASS, passwordResetCode});

  try {
    transporter.sendMail({
      to: req.body.email,
      subject: 'Skid Row Arts Alliance - Account Password Reset',
      text: `Your account password reset code is ${passwordResetCode}`,
    });
  } catch (err) {
    console.log('transporter error');
    console.log(err);
    res.json({
      action: 'createResetCode',
      error: err
    });
    return;
  }


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
  console.log(req.body);
  User.findOneAndUpdate({ email: req.body.email }, { passwordResetCode: '' }, (err, data) => {
    if (err) {
      console.error(err);
      res.json({
        email: data.email ? data.email : null,
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

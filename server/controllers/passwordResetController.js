const nodemailer = require('nodemailer');
const User = require('../models/userModel');

const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host:'smtp.gmail.com',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: true,
});

const createResetCode = async (req, res) => {
  // generate a random integer between 0 and 9999
  const randomInt = Math.floor(Math.random() * 10000);
  // pad the integer with leading zeros to make it a 4-digit string
  const passwordResetCode = String(randomInt).padStart(4, '0');

  try {
    // Add reset code to user record
    const user = await User.findOneAndUpdate({ email: req.body.email }, { passwordResetCode });
    res.json({
      email: user.email,
      error: null,
    });
    // Send email with reset code
    transporter.sendMail({
      to: req.body.email,
      subject: 'Skid Row Arts Alliance - Account Password Reset',
      text: `Your account password reset code is ${passwordResetCode}`,
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400).json({
      email: null,
      error: err
    });
    return;
  }
};

const deleteResetCode = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, passwordResetCode: req.body.passwordResetCode });
    if (user) {
      await User.findByIdAndUpdate(user._id, { passwordResetCode: null });
      res.json({
        email: userRes.email,
        error: null,
      })
    } else {
      res.json({
        email: req.body.email,
        error: 'Incorrect email or reset code',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400).json({
      email: null,
      error: err,
    })
  }
};

module.exports = {
  createResetCode,
  deleteResetCode,
};

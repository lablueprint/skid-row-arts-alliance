const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const passport = require('../utils/passportConfig');

const signUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.json({ error: 'That email already exists.' });
  }
  try {
    // Generate a salted passwordr
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    // Create a new user object with secure password
    const secureUser = { ...req.body };
    secureUser.password = hashedPassword;
    // Save user in database
    const user = new User(secureUser);
    await user.save(user);
    // Send success response
    return res.send('User successfully created!');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to create a user properly' });
  }
};

const signIn = async (req, res, next) => {
  passport.authenticate('sign-in', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json(info.message); }
    return req.logIn(user, { session: false }, (e) => {
      if (err) return next(e);
      // replace secret
      const token = jwt.sign({ id: user.id }, 'secret');
      return res.json({ id: user._id, token });
    });
  })(req, res, next);
};

const signOut = async (req, res) => {
  try {
    // reminder that the frontend needs to delete the jwt stored in securestore
    return res.send('Logging out');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to logout properly' });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};

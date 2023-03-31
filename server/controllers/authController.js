const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const passport = require('../utils/passportConfig');

const signUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.email });
  if (userExists) {
    return res.send('That user email already exists');
  }
  const user = new User(req.body);
  try {
    await user.save(user);
    // only need to send status? next process should be redirecting to log in screen?
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

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const passport = require('../utils/passportConfig');

// mobile
const userSignUp = async (req, res) => {
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

const userSignIn = async (req, res, next) => {
  passport.authenticate('user-sign-in', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json({ error: info.message }); }
    return req.logIn(user, { session: false }, (e) => {
      if (err) return next(e);
      // TODO: replace secret
      const token = jwt.sign({ id: user.id }, 'secret');
      return res.json({ id: user._id, token });
    });
  })(req, res, next);
};

// admin
const adminSignUp = async (req, res) => {
  const adminExists = await Admin.findOne({ username: req.body.username });
  if (adminExists) {
    return res.send('That admin username already exists');
  }
  try {
    // Generate a salted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    // Create a new admin object
    const secureAdmin = { ...req.body };
    secureAdmin.password = hashedPassword;
    const admin = new Admin(secureAdmin);
    await admin.save(admin);

    // only need to send status? next process should be redirecting to log in screen?
    return res.send('User successfully created!');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to create a user properly' });
  }
};

const adminSignIn = async (req, res, next) => {
  passport.authenticate('admin-sign-in', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json(info.message); }
    return req.login(user, { session: false }, (e) => {
      if (err) return next(e);
      // TODO: replace secret and add an expiration
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      return res.json({ id: user._id, token });
    });
  })(req, res, next);
};

module.exports = {
  userSignUp,
  userSignIn,
  adminSignUp,
  adminSignIn,
};

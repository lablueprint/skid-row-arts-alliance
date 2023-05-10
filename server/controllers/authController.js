const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const passport = require('../utils/passportConfig');

// mobile
const userSignUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.send('That user email already exists');
  }
  try {
    // Generate a salted passwordr
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    // Create a new user object
    const secureUser = { ...req.body };
    secureUser.password = hashedPassword;
    const user = new User(secureUser);
    await user.save(user);
    // only need to send status? next process should be redirecting to log in screen?
    return res.send('User successfully created!');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to create a user properly' });
  }
};

const userSignIn = async (req, res, next) => {
  passport.authenticate('user-sign-in', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json(info.message); }
    return req.login(user, { session: false }, (e) => {
      if (err) return next(e);
      // replace secret
      const token = jwt.sign({ id: user.id }, 'secret');
      return res.json({ id: user._id, token });
    });
  })(req, res, next);
};

const userSignOut = async (req, res) => {
  try {
    // reminder that the frontend needs to delete the jwt stored in securestore
    return res.send('Logging out');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to logout properly' });
  }
};

const userPasswordReset = async (req, res) => {
  try {
    // Generate a salted passwordr
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    // Save password in database
    const user = await User.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword });
    if (!user) {
      return res.json({ error: 'That email does not exist.' });
    }
    // Send success response
    return res.send('Password successfully updated!');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to update password' });
  }
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
      // replace secret and add an expiration
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      return res.json({ id: user._id, token });
    });
  })(req, res, next);
};


module.exports = {
  userSignUp,
  userSignIn,
  userSignOut,
  userPasswordReset,
  adminSignUp,
  adminSignIn,
};

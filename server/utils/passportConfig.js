const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  console.log('=== serialize ... called ===');
  console.log({
    _id: user._id,
    email: user.email,
  });
  console.log('============================');
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log('=== deserializing ... called ===');
    console.log('================================');
    done(err, user);
  });
});

// Create a new user
passport.use('sign-up', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const userExists = await User.findOne({ email });
      // Check if the user already exists
      if (userExists) {
        return done(null, false, { message: 'That user email already exists' });
      }
      // Generate a salted passwordr
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      // Create a new user object
      const secureUser = { ...req.body };
      secureUser.password = hashedPassword;
      const user = new User(secureUser);
      await user.save(user);
      return done(null, user);
    } catch (err) {
      return done(err, false, { message: 'Unable to create a user' });
    }
  },
));

// Sign in and send them user data
passport.use('sign-in', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    console.log(email);
    try {
      // Check if a user exists
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return done(null, false, { message: 'That user does not exist' });
      }
      // Check if the password matches
      const match = bcrypt.compareSync(password, userExists.password);
      if (match) {
        return done(null, userExists);
      }
      return done(null, false, { message: 'Wrong password' });
    } catch (err) {
      return done(err, false, { message: 'Unable to sign in' });
    }
  },
));

module.exports = passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

// Sign in and send them user data
passport.use('user-sign-in', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
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

passport.use('admin-sign-in', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      // Check if an admin exists
      const adminExists = await Admin.findOne({ username });
      if (!adminExists) {
        return done(null, false, { message: 'That admin does not exist' });
      }
      // Check if the password matches
      const match = bcrypt.compareSync(password, adminExists.password);
      if (match) {
        return done(null, adminExists);
      }
      return done(null, false, { message: 'Wrong password' });
    } catch (err) {
      return done(err, false, { message: 'Unable to sign in' });
    }
  },
));

passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret', // to be replaced
  },
  async (userId, done) => {
    try {
      const userExists = await User.findById(userId.id);
      if (userExists) {
        return done(null, userExists);
      }
      const adminExists = await Admin.findById(userId.id);
      if (adminExists) {
        return done(null, adminExists);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  },
));

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

module.exports = passport;

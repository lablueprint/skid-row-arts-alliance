const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Sign in and send them user data
passport.use('sign-in', new LocalStrategy(
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

passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret', // to be replaced
  },
  async (userId, done) => {
    try {
      const userExists = await User.findById(userId.id);
      if (!userExists) {
        return done(null, false);
      }
      console.log(userExists);
      return done(null, userExists);
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

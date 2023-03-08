const express = require('express');

const authRouter = express.Router();
const passport = require('../utils/passportConfig');

authRouter.post('/sign-up', (req, res, next) => {
  passport.authenticate('sign-up', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json(info.message); }
    return req.logIn(user, (e) => {
      if (err) { return next(e); }
      return res.json(user);
    });
  })(req, res, next);
});

authRouter.post('/sign-in', (req, res, next) => {
  passport.authenticate('sign-in', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json(info.message); }
    return req.logIn(user, (e) => {
      if (err) { return next(e); }
      return res.json(user);
    });
  })(req, res, next);
});

authRouter.post('/sign-out', (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(404).json({ error: 'Unable to logout properly' });
    }
  });
  res.send('Logging out');
});

module.exports = authRouter;

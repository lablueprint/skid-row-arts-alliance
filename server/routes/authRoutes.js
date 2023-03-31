const express = require('express');
const passport = require('../utils/passportConfig');

const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.post('/sign-out', authController.signOut);

authRouter.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
});

module.exports = authRouter;

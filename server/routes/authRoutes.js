const express = require('express');
const passport = require('../utils/passportConfig');

const authRouter = express.Router();
const authController = require('../controllers/authController');

// mobile sign in/sign up
authRouter.post('/user-sign-up', authController.userSignUp);
authRouter.post('/user-sign-in', authController.userSignIn);
authRouter.post('/user-sign-out', passport.authenticate('jwt', { session: false }), authController.userSignOut);

// admin sign in/sign up
authRouter.post('/admin-sign-up', authController.adminSignUp);
authRouter.post('/admin-sign-in', authController.adminSignIn);

module.exports = authRouter;

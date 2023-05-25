const express = require('express');

const authRouter = express.Router();
const authController = require('../controllers/authController');

// mobile sign in/sign up
authRouter.post('/user-sign-up', authController.userSignUp);
authRouter.post('/user-sign-in', authController.userSignIn);

// admin sign in/sign up
authRouter.post('/admin-sign-up', authController.adminSignUp);
authRouter.post('/admin-sign-in', authController.adminSignIn);

module.exports = authRouter;

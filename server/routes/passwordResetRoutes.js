const express = require('express');

const passwordResetRouter = express.Router();
const passResetController = require('../controllers/passwordResetController');

passwordResetRouter.patch('/create', passResetController.createResetCode);
passwordResetRouter.patch('/delete', passResetController.deleteResetCode);
passwordResetRouter.patch('/reset', passResetController.resetPassword);

module.exports = passwordResetRouter;

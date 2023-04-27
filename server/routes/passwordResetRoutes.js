const express = require('express');

const passwordResetRouter = express.Router();
const passResetController = require('../controllers/passwordResetController');

passwordResetRouter.patch('/create', passResetController.createResetCode);

module.exports = passwordResetRouter;

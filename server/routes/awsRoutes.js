const express = require('express');

const awsRouter = express.Router();
const awsController = require('../controllers/awsController');

awsRouter.get('/post', awsController.uploadImage);

module.exports = awsRouter;

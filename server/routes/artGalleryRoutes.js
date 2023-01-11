const express = require('express');

const artGalleryRouter = express.Router();
const artGalleryController = require('../controllers/artGalleryController');

artGalleryRouter.get('/get', artGalleryController.retrieveImage);

module.exports = artGalleryRouter;

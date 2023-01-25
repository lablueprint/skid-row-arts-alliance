const express = require('express');

const artGalleryRouter = express.Router();
const artGalleryController = require('../controllers/artGalleryController');

artGalleryRouter.get('/get', artGalleryController.getAllSubmissions);

module.exports = artGalleryRouter;

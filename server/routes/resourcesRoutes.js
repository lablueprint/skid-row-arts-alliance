const express = require('express');

const resourceRouter = express.Router();
const resourceController = require('../controllers/resourcesController');

resourceRouter.post('/post', resourceController.createResource);

resourceRouter.get('/get', resourceController.getAllResources);

resourceRouter.patch('/update/:id', resourceController.updateResource);

resourceRouter.delete('/delete/:id', resourceController.deleteResource);

module.exports = resourceRouter;

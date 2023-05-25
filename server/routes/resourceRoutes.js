const express = require('express');
const passport = require('../utils/passportConfig');

const resourceRouter = express.Router();
const resourceController = require('../controllers/resourceController');

resourceRouter.use(passport.authenticate('jwt', { session: false }));

resourceRouter.post('/post', resourceController.createResource);
resourceRouter.get('/get', resourceController.getAllResources);
resourceRouter.patch('/update/:id', resourceController.updateResource);
resourceRouter.delete('/delete/:id', resourceController.deleteResource);

module.exports = resourceRouter;

const express = require('express');

const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

eventRouter.post('/post', eventController.createEvent);

eventRouter.get('/get', eventController.getAllEvents);

eventRouter.patch('/update/:id', eventController.updateEvent);

eventRouter.delete('/delete/:id', eventController.deleteEvent);

module.exports = eventRouter;

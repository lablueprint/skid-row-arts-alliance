const express = require('express');
const passport = require('../utils/passportConfig');

const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

eventRouter.use(passport.authenticate('jwt', { session: false }));

eventRouter.post('/create', eventController.createEvent);
eventRouter.get('/getevents', eventController.getAllEvents);
eventRouter.patch('/update/:id', eventController.updateEvent);
eventRouter.delete('/delete/:id', eventController.deleteEvent);

module.exports = eventRouter;

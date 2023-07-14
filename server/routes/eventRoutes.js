const express = require('express');
const multer = require('multer');
const passport = require('../utils/passportConfig');

const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

eventRouter.use(passport.authenticate('jwt', { session: false }));

eventRouter.post('/create', upload.array('image'), eventController.createEvent);
eventRouter.get('/getevents', eventController.getAllEvents);
eventRouter.patch('/update/:id', upload.array('image'), eventController.updateEvent);
eventRouter.delete('/delete/:id', eventController.deleteEvent);

module.exports = eventRouter;

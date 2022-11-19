const express = require('express');

const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

eventRouter.post('/post', eventController.createEvent);

eventRouter.get('/get', eventController.getAllEvents);
// eventRouter.get('/get', (req, res) => {
//   res.send('Get Event API');
// });

module.exports = eventRouter;

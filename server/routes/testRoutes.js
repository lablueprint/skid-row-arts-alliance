const express = require('express');

const testRouter = express.Router();
const testController = require('../controllers/testController');

testRouter.post('/post', (req, res) => {
  res.send('Post API');
});

testRouter.get('/get', testController.createTest);

module.exports = testRouter;

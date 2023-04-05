const express = require('express');

const submissionRouter = express.Router();
const submissionController = require('../controllers/submissionController');

submissionRouter.post('/post', submissionController.createSubmission);
submissionRouter.delete('/delete/:id', submissionController.deleteSubmission);
submissionRouter.get('/get', submissionController.getSubmissions);
submissionRouter.get('/get/:id', submissionController.getSubmission);

module.exports = submissionRouter;

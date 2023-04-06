const express = require('express');

const submissionRouter = express.Router();
const submissionController = require('../controllers/submissionController');

submissionRouter.post('/post', submissionController.createSubmission);
submissionRouter.delete('/delete/:id', submissionController.deleteSubmission);
submissionRouter.get('/get', submissionController.getAllSubmissions);
submissionRouter.get('/getsubmission', submissionController.getSubmission);

module.exports = submissionRouter;

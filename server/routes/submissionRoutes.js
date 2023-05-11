const express = require('express');
const passport = require('../utils/passportConfig');

const submissionRouter = express.Router();
const submissionController = require('../controllers/submissionController');

submissionRouter.use(passport.authenticate('jwt', { session: false }));

submissionRouter.post('/post', submissionController.createSubmission);
submissionRouter.get('/get', submissionController.getAllSubmissions);
submissionRouter.get('/getsubmission/:id', submissionController.getSubmission);
submissionRouter.delete('/delete/:id', submissionController.deleteSubmission);

module.exports = submissionRouter;

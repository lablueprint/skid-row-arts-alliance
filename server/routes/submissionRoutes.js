const express = require('express');
const passport = require('../utils/passportConfig');

const submissionRouter = express.Router();
const submissionController = require('../controllers/submissionController');

submissionRouter.use(passport.authenticate('jwt', { session: false }));

// user facing functions
submissionRouter.post('/post', submissionController.createSubmission);
submissionRouter.get('/getthumbnails', submissionController.getGalleryThumbnails);
submissionRouter.get('/getartwork/:id', submissionController.getArtworkDetails);

// admin facing functions
submissionRouter.get('/getsubmissions', submissionController.getSubmissions);
submissionRouter.delete('/deletesubmission/:id', submissionController.deleteSubmission);
submissionRouter.patch('/updatesubmission/:id', submissionController.updateSubmission);

module.exports = submissionRouter;

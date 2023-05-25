const express = require('express');

const submissionRouter = express.Router();
const submissionController = require('../controllers/submissionController');

// user facing functions
submissionRouter.post('/post', submissionController.createSubmission);
submissionRouter.get('/getthumbnails', submissionController.getGalleryThumbnails);
submissionRouter.get('/getartwork/:id', submissionController.getArtworkDetails);

// admin facing functions
submissionRouter.get('/getsubmissions', submissionController.getSubmissions);
submissionRouter.delete('/deletesubmission/:id', submissionController.deleteSubmission);
submissionRouter.patch('/updatesubmission/:id', submissionController.updateSubmission);

module.exports = submissionRouter;

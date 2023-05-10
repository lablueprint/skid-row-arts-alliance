const express = require('express');

const submissionRouter = express.Router();
const submissionController = require('../controllers/submissionController');

// user facing functions
submissionRouter.post('/post', submissionController.createSubmission);
submissionRouter.delete('/delete/:id', submissionController.deleteSubmission);
submissionRouter.get('/getthumbnails', submissionController.getGalleryThumbnails);
submissionRouter.get('/getartwork', submissionController.getArtworkDetails);

// admin facing functions
submissionRouter.get('/getsubmissions', submissionController.getSubmissions);

module.exports = submissionRouter;

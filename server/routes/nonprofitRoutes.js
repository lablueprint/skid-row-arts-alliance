const express = require('express');

const nonprofitRouter = express.Router();
const nonprofitController = require('../controllers/nonprofitController');

nonprofitRouter.post('/add', nonprofitController.addNonprofit);
nonprofitRouter.patch('/update/:id', nonprofitController.updateNonprofit);
nonprofitRouter.get('/getall', nonprofitController.getAllNonprofits);
nonprofitRouter.get('/get/:title', nonprofitController.getNonprofit);
nonprofitRouter.delete('/delete', nonprofitController.deleteNonprofit);

module.exports = nonprofitRouter;

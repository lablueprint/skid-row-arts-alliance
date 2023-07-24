const express = require('express');
const passport = require('../utils/passportConfig');

const nonprofitRouter = express.Router();
const nonprofitController = require('../controllers/nonprofitController');

nonprofitRouter.use(passport.authenticate('jwt', { session: false }));

nonprofitRouter.post('/add', nonprofitController.addNonprofit);
nonprofitRouter.patch('/update/:id', nonprofitController.updateNonprofit);
nonprofitRouter.get('/getall', nonprofitController.getAllNonprofits);
nonprofitRouter.get('/getfromtitle/:title', nonprofitController.getNonprofitFromTitle);
nonprofitRouter.delete('/delete', nonprofitController.deleteNonprofit);

module.exports = nonprofitRouter;

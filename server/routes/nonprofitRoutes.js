const express = require('express');
const multer = require('multer');
const passport = require('../utils/passportConfig');

const nonprofitRouter = express.Router();
const nonprofitController = require('../controllers/nonprofitController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

nonprofitRouter.use(passport.authenticate('jwt', { session: false }));

nonprofitRouter.post('/add', upload.single('image'), nonprofitController.addNonprofit);
nonprofitRouter.patch('/update/:id', upload.single('image'), nonprofitController.updateNonprofit);
nonprofitRouter.get('/getall', nonprofitController.getAllNonprofits);
nonprofitRouter.get('/getfromtitle/:title', nonprofitController.getNonprofitFromTitle);
nonprofitRouter.delete('/delete/:id', nonprofitController.deleteNonprofit);

module.exports = nonprofitRouter;

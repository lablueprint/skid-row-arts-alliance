const express = require('express');
const passport = require('../utils/passportConfig');

const zineRouter = express.Router();
const zineController = require('../controllers/zineController');

zineRouter.use(passport.authenticate('jwt', { session: false }));

zineRouter.post('/post', zineController.createZine);
zineRouter.get('/get', zineController.getAllZines);
zineRouter.get('/getzine/:id', zineController.getSpecificZine);
zineRouter.patch('/update/:id', zineController.updateZine);
zineRouter.delete('/delete/:id', zineController.deleteZine);

module.exports = zineRouter;

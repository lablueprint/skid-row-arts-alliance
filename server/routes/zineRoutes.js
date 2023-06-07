const express = require('express');

const zineRouter = express.Router();
const zineController = require('../controllers/zineController');

// TODO: secure Zines route
zineRouter.post('/post', zineController.createZine);

zineRouter.get('/get', zineController.getAllZines);
zineRouter.get('/getzine/:id', zineController.getSpecificZine);

zineRouter.patch('/update/:id', zineController.updateZine);

zineRouter.delete('/delete/:id', zineController.deleteZine);

module.exports = zineRouter;

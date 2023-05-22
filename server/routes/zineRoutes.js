const express = require('express');

const zineRouter = express.Router();
const zineController = require('../controllers/zineController');

zineRouter.post('/post', zineController.createZine);

zineRouter.get('/get', zineController.getAllZines);
zineRouter.get('/getZine/:id', zineController.getSpecificZine);

zineRouter.patch('/update/:id', zineController.updateZine);

zineRouter.delete('/delete/:id', zineController.deleteZine);

module.exports = zineRouter;
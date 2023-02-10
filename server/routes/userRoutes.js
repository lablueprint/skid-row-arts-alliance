const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/post', userController.createUser);

userRouter.get('/get', userController.getAllUserInfo);
userRouter.get('/getUser/:id', userController.getSpecificUser);
userRouter.get('/getEvents/:id', userController.getUserEvents);
userRouter.get('/getArtwork/:id', userController.getUserArtwork);

userRouter.patch('/update/:id', userController.updateUser);

userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = userRouter;

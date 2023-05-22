const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/post', userController.createUser);

userRouter.get('/get', userController.getAllUserInfo);
userRouter.get('/getEmail/:email', userController.getEmail);
userRouter.get('/getUser/:id', userController.getSpecificUser);
userRouter.get('/getEvents/:id', userController.getUserEvents);
userRouter.get('/getResources/:id', userController.getUserResources);
userRouter.get('/getArtwork/:id', userController.getUserArtwork);

userRouter.patch('/update/:id', userController.updateUser);
userRouter.patch('/addEvent/:id', userController.addUserEvent);
userRouter.patch('/addResource/:id', userController.addUserResource);
userRouter.patch('/addArtwork/:id', userController.addUserArtwork);
userRouter.patch('/removeEvent/:id', userController.removerUserEvent);
userRouter.patch('/removeResource/:id', userController.removeUserResource);
userRouter.patch('/removeArtwork/:id', userController.removeUserArtwork);

userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = userRouter;

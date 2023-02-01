const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/post', userController.createUser);

userRouter.get('/get', userController.getAllUserInfo);

userRouter.patch('/update/:id', userController.updateUser);

// userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = userRouter;

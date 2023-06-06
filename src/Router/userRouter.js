const express = require('express');
const { getUsers, getUserByID, deleteUserByID } = require('../Controller/userController');
const userRouter = express.Router();


userRouter.get('/',getUsers)
userRouter.get('/:id',getUserByID)
userRouter.delete('/:id',deleteUserByID)



  module.exports = userRouter;
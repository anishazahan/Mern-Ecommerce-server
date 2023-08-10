const express = require('express');
const { getUsers, getUserByID, deleteUserByID,processRegister, activateUserAccount} = require('../Controller/userController');
const userRouter = express.Router();


userRouter.post('/process-register',processRegister)
userRouter.post('/verify',activateUserAccount)
userRouter.get('/',getUsers)
userRouter.get('/:id',getUserByID)
userRouter.delete('/:id',deleteUserByID)



  module.exports = userRouter;
  
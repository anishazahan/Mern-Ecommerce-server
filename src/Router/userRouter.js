const express = require('express');
const { getUsers, getUserByID, deleteUserByID,processRegister} = require('../Controller/userController');
const userRouter = express.Router();


userRouter.post('/process-register',processRegister)
userRouter.get('/',getUsers)
userRouter.get('/:id',getUserByID)
userRouter.delete('/:id',deleteUserByID)



  module.exports = userRouter;
const express = require('express');
const { getUsers, getUserByID, deleteUserByID,processRegister, activateUserAccount} = require('../Controller/userController');
const upload = require('../middleware/upload-flies');
const userRouter = express.Router();


userRouter.post('/process-register',upload.single("image"),processRegister)
userRouter.post('/verify',activateUserAccount)
userRouter.get('/',getUsers)
userRouter.get('/:id',getUserByID)
userRouter.delete('/:id',deleteUserByID)



  module.exports = userRouter;
  
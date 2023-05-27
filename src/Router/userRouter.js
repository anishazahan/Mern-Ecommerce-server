const express = require('express');
const { getUsers, getUserByID } = require('../Controller/userController');
const userRouter = express.Router();


userRouter.get('/',getUsers)
userRouter.get('/:id',getUserByID)



  module.exports = userRouter;
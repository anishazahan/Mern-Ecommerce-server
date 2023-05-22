const express = require('express');
const { getUsers, getUserProfile } = require('../Controller/userController');
const userRouter = express.Router();


userRouter.get('/',getUsers)
userRouter.get('/profile',getUserProfile)



  module.exports = userRouter;
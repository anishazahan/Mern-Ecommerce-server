const createError = require('http-errors');
const userModel = require('../Model/user.model');

const getUsers = async(req, res,next) => {
   try {
    const users =await userModel.find();
    res.status(200).send({
      message:"users get successfully",
      users,
    })
    
   } catch (error) {
     next(error)
   }
  };


  const getUserProfile = (req, res) => {
    res.send('this is profile')
  };

  module.exports = {
    getUsers,
    getUserProfile
  }
const createError = require('http-errors')

const getUsers = (req, res,next) => {
   try {
    res.send('Hello World!xcvxbyyyyyyyyyyyyyyyyyui')
    
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
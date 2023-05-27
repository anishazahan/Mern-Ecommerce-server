const createError = require('http-errors');
const userModel = require('../Model/user.model');

const getUsers = async(req, res,next) => {
   try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

     const searchRegExp = new RegExp( ".*" + search +".*",'i')

     // searching filter for user 
     const filter = {
      
      isAdmin : {$ne : true},
      $or:[
        {name: {$regex : searchRegExp}},
        {email: {$regex : searchRegExp}},
        {phone: {$regex : searchRegExp}},
      ]
     } 

    const users =await userModel.find(filter);
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
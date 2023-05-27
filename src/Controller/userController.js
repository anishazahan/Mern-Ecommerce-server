const createError = require('http-errors');
const userModel = require('../Model/user.model');

const getUsers = async(req, res,next) => {
   try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;

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
     const options = { password : 0}

    const users =await userModel.find(filter,options).limit(limit).skip((page-1)*limit);
     const count = await userModel.find(filter).countDocuments();


      if(!users) throw createError(404,"No Users Found")

    res.status(200).send({
      message:"users get successfully",
      users,
      pagination:{
        totalPages : Math.ceil(count / limit),
        currentPage:page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,

      }
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
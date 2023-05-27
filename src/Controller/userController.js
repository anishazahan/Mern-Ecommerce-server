const createError = require('http-errors');
const userModel = require('../Model/user.model');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');

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
     const options = { password : 0}

    const users =await userModel.find(filter,options).limit(limit).skip((page-1)*limit);
     const count = await userModel.find(filter).countDocuments();


      if(!users) throw createError(404,"No Users Found")

    // res.status(200).send({
    //   message:"users get successfully",
    //   users,
    //   pagination:{
    //     totalPages : Math.ceil(count / limit),
    //     currentPage:page,
    //     previousPage: page - 1 > 0 ? page - 1 : null,
    //     nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,

    //   }
    // })

    return successResponse(res,{
      statusCode:200,
      message:"Users get successfully",
      payload:{
        users,
        pagination:{
          totalPages : Math.ceil(count / limit),
          currentPage:page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
  
        }
      }
    })
    
   } catch (error) {
     next()
   }
  };


  const getUserByID =async (req, res,next) => {
   try {

    const id = req.params.id;
    const options = {password:0};
    const findUser = await userModel.findById(id,options);

    if(!findUser) {throw createError(404,"User doesn't exists with this ID")}

    return successResponse(res,{
      statusCode:200,
      message:"Users get successfully By Id",
      payload:{findUser}
    })
 
    
  } catch (error) {
    if(error instanceof mongoose.Error){
      next(createError(404,"Invalid user Id"))
      return;
    }
    next(error)
  }
  };

  module.exports = {
    getUsers,
    getUserByID
  }
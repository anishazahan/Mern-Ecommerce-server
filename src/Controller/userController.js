const createError = require('http-errors');
const userModel = require('../Model/user.model');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findById } = require('../services/user-services/findById');
const { deleteImage } = require('../helper/deleteImage');




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
    const findUser =await findById(userModel,id,options);
    return successResponse(res,{
      statusCode:200,
      message:"Items get successfully By Id",
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


  const deleteUserByID =async (req, res,next) => {
   try {

    const id = req.params.id;
    const options = {password:0};
    const findUser =await findById(userModel,id,options);

     const userImagePath = findUser.image;
     
     deleteImage(userImagePath)


    await userModel.findByIdAndDelete({_id:id, isAdmin:false})

    return successResponse(res,{
      statusCode:200,
      message:"Items deleted successfully By Id",
     
    })
 
    
  } catch (error) {
    if(error instanceof mongoose.Error){
      next(createError(404,"Invalid user Id"))
      return;
    }
    next(error)
  }
  };




  const processRegister =async (req, res,next) => {
   try {

     const {name,email,password,phone,address} = req.body;
     const newUser = { name,email,password,phone,address}
     const userExists = userModel.exists({email:email})
     if (userExists) {
       throw createError(409,"Email already exists ,Please Login in!")
     }
  
    return successResponse(res,{
      statusCode:200,
      message:"User was created successfully",
      payload:{newUser}
     
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
    getUserByID,
    deleteUserByID,
    processRegister
  }
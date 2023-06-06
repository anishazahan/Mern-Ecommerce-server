const createHttpError = require("http-errors");
const userModel = require("../../Model/user.model");
const { default: mongoose } = require("mongoose");

const findById = async(id,options={})=>{
   try {
  
    const findItem = await userModel.findById(id,options);

    if(!findItem) {throw createHttpError(404,"Item doesn't exists with this ID")}
    return findItem;
   } catch (error) {

    if(error instanceof mongoose.Error){
        throw createError(404,"Invalid item with this Id");
      }

      throw error;
    
   }

}

module.exports = {findById};
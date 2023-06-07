const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { modelName } = require("../../Model/user.model");

const findById = async(Model,id,options={})=>{
   try {
  
    const findItem = await Model.findById(id,options);

    if(!findItem) {throw createHttpError(404,`Data doesn't exists with this ID`)}
    return findItem;
   } catch (error) {

    if(error instanceof mongoose.Error){
        throw createHttpError(404,"Invalid item with this Id");
      }

      throw error;
    
   }

}

module.exports = {findById};
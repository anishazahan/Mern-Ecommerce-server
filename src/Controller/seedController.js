  const data = require('../../src/data');

const userModel = require("../Model/user.model");
console.log(userModel);


 const seedUser =async(req,res,next)=>{
 
  try {
    const data = req.body;

    const newUser = new userModel(data);
  await newUser.save()
  res.status(201).json(newUser);
    
  } catch (error) {
    next(error)
  }

}

module.exports= {
    seedUser
}
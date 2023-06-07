const fs = require("fs").promises;

 const deleteImage =async (userImagePath)=>{

  try {
    await fs.access(userImagePath)
    await fs.unlink(userImagePath)
    console.log("User img was deleted")
  } catch (error) {
    console.error("User image doesn't exists")
  }

 }

 module.exports = {deleteImage};
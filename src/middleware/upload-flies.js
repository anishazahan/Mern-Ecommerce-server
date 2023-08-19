const multer  = require('multer')
const path = require('path')
const createError = require('http-errors');
const { UPLOAD_FILE_DIR, MAX_FILE_SIZE, FILE_EXT } = require('../config');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_FILE_DIR)
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);
      cb(null,Date.now() + "-" + file.originalname.replace(extName, " ")+ extName )
    }
  })
  
  const fileFilter = (req,file,cb)=>{
    const extName = path.extname(file.originalname);

    if(!FILE_EXT.includes(extName.substring(1))){
     const error=createError(404,"File Type Not Allow")
        return cb(error)
    }
    cb(null,true)
    

  }
  const upload = multer({ 
    storage: storage,
    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter
  
  })
  module.exports = upload
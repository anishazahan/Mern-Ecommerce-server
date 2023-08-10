const multer  = require('multer')
const path = require('path')
const createError = require('http-errors');


const maxFileSize = Number(process.env.MAX_FILE_SIZE) || 2097152;
const fileExt = process.env.FILE_EXT || ["jpg","jpeg","png"];
const upload_Dir = process.env.UPLOAD_FILE || "public/img/user";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, upload_Dir)
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);
      cb(null,Date.now() + "-" + file.originalname.replace(extName, " ")+ extName )
    }
  })
  
  const fileFilter = (req,file,cb)=>{
    const extName = path.extname(file.originalname);
const fileExt = process.env.FILE_EXT || ["jpg","jpeg","png"];
    if(!fileExt.includes(extName.substring(1))){
     const error=createError(404,"File Type Not Allow")
        return cb(error)
    }
    cb(null,true)

  }
  const upload = multer({ 
    storage: storage,
    limits:{fileSize:maxFileSize},
    fileFilter
  
  })
  module.exports = upload
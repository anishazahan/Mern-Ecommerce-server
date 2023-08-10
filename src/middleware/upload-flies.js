const multer  = require('multer')
const path = require('path')
const { uploadDir } = require('../secret')

const upload_Dir = uploadDir

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, upload_Dir)
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);
      cb(null,Date.now() + "-" + file.originalname.replace(extName, " ")+ extName )
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = upload
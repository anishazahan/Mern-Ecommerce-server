require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoAtlasURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMern";
const defaultImgPath = process.env.DEFAULT_USER_IMG_PATH || "../public/img/user/default-user.png";


module.exports={
    serverPort,
    mongoAtlasURL,
    defaultImgPath

}
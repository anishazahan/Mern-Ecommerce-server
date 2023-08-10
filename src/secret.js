require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoAtlasURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMern";
const defaultImgPath = process.env.DEFAULT_USER_IMG_PATH || "../public/img/user/default-user.png";
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "uiewr83499999999777777777777"
const smtpPassword = process.env.SMTP_PASSWORD || ""
const smtpUserName = process.env.SMTP_USERNAME || ""

module.exports={
    serverPort,
    mongoAtlasURL,
    defaultImgPath,
    jwtActivationKey,
    smtpPassword,
    smtpUserName
}


// nyzudshopdnzsvim
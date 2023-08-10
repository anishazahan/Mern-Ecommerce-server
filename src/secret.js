require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoAtlasURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMern";
const defaultImgPath = process.env.DEFAULT_USER_IMG_PATH || "../public/img/user/default-user.png";
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "uiewr83499999999777777777777"
const smtpPassword = process.env.SMTP_PASSWORD || ""
const smtpUserName = process.env.SMTP_USERNAME || ""
const clientUrl = process.env.CLIENT_URL || ""

module.exports={
    serverPort,
    mongoAtlasURL,
    defaultImgPath,
    jwtActivationKey,
    smtpPassword,
    smtpUserName,
    clientUrl
}


// nyzudshopdnzsvim

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5pc2hhIiwiZW1haWwiOiJhbmlzaGF6YWhhbjEzQGdhbWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwicGhvbmUiOiI3ODY3NjU0MyIsImlhdCI6MTY5MTYyOTY3OCwiZXhwIjoxNjkxNjMwODc4fQ.XWQgpvdrR1R3Rsu8zMS0drb080ZBf17IWxsHXHv5XjE
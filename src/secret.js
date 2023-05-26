require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoAtlasURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMern";


module.exports={
    serverPort,
    mongoAtlasURL

}
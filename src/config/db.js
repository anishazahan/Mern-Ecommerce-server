const mongoose = require('mongoose');
const { mongoAtlasURL } = require('../secret');

const connectDB = async(options={})=>{
    try {
        await mongoose.connect(mongoAtlasURL,options);
        console.log("db connected succesfully");
        mongoose.connection.on("error",(error)=>{
            console.error("db connect error",error)
        })
    } catch (error) {
        console.error("db count't connect ",error.toString())
    }
}

module.exports = connectDB;
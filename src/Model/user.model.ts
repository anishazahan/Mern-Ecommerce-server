
import mongoose from 'mongoose';
const { Schema,model } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"user name is required"]
    }
})
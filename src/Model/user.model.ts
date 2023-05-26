import exp from "constants";
import { defaultImgPath } from "../secret";


const { Schema,model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"user name is required"],
        trim:true,
        maxlength:[31,"The length of user name can be  31 characters"],
        minlength:[3,"The length of user name must be minimum 3 characters"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        unique:true
    },
    validator:{
        validator:function(v){
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)

        },
        message:"Please enter in a valid email"
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"The length the password must be minimum 6 characters"],
        set:(v)=>{
          bcrypt.hashSync(v, bcrypt.genSaltSync(10));
        }
    },
    image:{
        type:String,
        default: defaultImgPath
    },
    address:{
        type:String,
        required:[true,"address is required"],
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
    },
    isAdmin:{
        type:Boolean,
       default:false
    },
    isBanned:{
        type:Boolean,
       default:false
    },

},{
    timestamps:true
});

const userModel = model ("User",userSchema) ;
model.exports = userModel;
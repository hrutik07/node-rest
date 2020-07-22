import * as mongoose from 'mongoose';
import {model} from 'mongoose';


const userSchema = new mongoose.Schema({
    email : {type : String , required : true , index : {background : true , unique : true}},
    password : { type : String , required : true},
    profile_pic_url : {type : String , required : false},
    verified : {type : Boolean , required : true , default : false},
    verification_token : {type : Number , required : true },
    verification_token_time : {type : Date , required : true},
    reset_password_token_time :{type : Number , required : false},
    reset_password_token : {type : Number , required : false},
    username : {type : String , required : true},
    created_at : {type : Date , required : true , default : new Date()},
    updated_at : {type : Date , required : true , default : new Date()},
    
})



export default model('users', userSchema);
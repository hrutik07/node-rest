//import { body } from "express-validator";
import user from "../models/user";
import { error } from "console";
import {UserController} from "../controllers/UserController"
//import { query } from "express";
import { Query } from "mongoose";
import {query,body} from "express-validator";


export class UserVallidator{
    static signUp(){
        return [body('email','Email is Required').isEmail().custom((email,{req})=>{
            console.log('im in UserVallidator.signup()');
            return user.findOne({email:email}).then(user=>{
            if(user){
                   throw new Error('User Already Exist')
                }else{
                    console.log('im in else')
                    return true;
                }
            })
        }),
    body('password','Pasword Is Required').isAlphanumeric().isLength({min:8,max:20}).withMessage('Password can be from 8-20 Characters only'),
    body('username','Username is Required').isString()];
    }
    static verifyUser(){
        return [body('verification_token','verification token is Required').isNumeric()]
    }

    static updatePassword(){
        return [body('password','Password Is Required').isAlphanumeric(),
        body('confirm_password','Confirm Password Is required').isAlphanumeric(),
        body('new_password','New Password Is required').isAlphanumeric().custom((newPassword,{req})=>{
            if(newPassword===req.body.confirm_password){
                return true;
            }else{
                
                req.errorStatus = 422;
                throw new Error('password And Confirm password Does not match');
            }
        })]
    
    }
    static login(){
        return [query('email','Email Is Required').isEmail()
        .custom((email,{req})=>{
          return user.findOne({email}).then(user=>{

              if(user){
                  req.user = user;
                  return true;
              }else{
                  throw new Error('User Does Not Exist')
              }
           })
        })
        ,query('password','Password Is Required').isAlphanumeric()]
    }
    static sendResetPasswordEmail(){
        return[query('email').isEmail().custom((email,{req})=>{
            return user.findOne({email:email}).then((user)=>{
                if(user){
                    return true;
                }else{
                    throw new Error('Email Does Not Exist')
                }
            })
        })]
    }
    static verifyResetPasswordToken(){
        return[query('reset_password_token','Reset Password Token is Required ')
        .isNumeric().custom((token,{req})=>{
            return user.findOne({reset_password_token:token,reset_password_token_time: {$gt:Date.now()}
        
        }).then((user)=>{
            if(user){
                return true;
            }else{
                console.log(user)
                throw new Error('Token Does Not exist please request for new one')
            }
        })
        })]
    }
    static resetPassword(){
        return[body('email','email is required').isEmail().custom((email,{req})=>{
            return user.findOne({email}).then(user=>{
  
                if(user){
                    req.user = user;
                    return true;
                }else{
                    throw new Error('User Does Not Exist')
                }
             })
        
          }),body('new_password','New Password iis Required').isAlphanumeric()
            .custom((new_password,{req})=>{
              console.log(req.body.confirm_password);
              console.log(req.body.new_password)
              if(req.body.confirm_password === req.body.new_password ){
                  return true;
              }else{
                  throw new Error('Confirm Password and new password Does not matched')
              }
          }),
             body('confirm_password','confirm password Is Required').isAlphanumeric(),
             body('reset_password_token','Reset Password Token').isNumeric()
             .custom((token,{req})=>{
                 if(Number(req.user.reset_password_token) === Number(token)){
                    return true;
                 }else{
                     req.errorStatus = 422;
                     throw new Error('Reset password token is Invalid. please try again')
                 }
             })]
    }
    static updateProfilePic(){
        return [body('profile_pic').custom((profilePic,{req})=>{
            console.log('im in updateProfilepic')
            
            console.log(req.file);
            if(req.file){
                return true;
            }else{
                throw new Error('File Not Uploaded');
            }

        })]
    }
}
import User from '../models/user';
import { validationResult, body } from 'express-validator';
import { Utils } from '../utils/utils';
//import { error } from 'console';
import { NodeMailer } from '../utils/NodeMailer';
//import * as mongoose from 'mongoose';
import Bcrypt = require('bcryptjs');
import user from '../models/user';
import { resolve } from 'path';
import * as jwt from 'jsonwebtoken'
import { getEnviromentVariables } from '../enviroments/env';
import { profile, error } from 'console';
import * as Cheerio from 'cheerio';
import * as Request from 'request'
import { response } from 'express';

export class UserController {
  static async signUp(req, res, next) {
    console.log(Utils.genrateVerificationToken())
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const verificationToken = Utils.genrateVerificationToken();
    console.log(verificationToken)
    try {
    const hash = await Utils.encryptPassword(password);
    console.log('im in try');
   
      const data = {
        email: email,
        password: hash,
        username: username,
        verification_token: verificationToken,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        created_at: new Date(),
        updadated_at: new Date(),
      //  profile_pic_url : profile
      };
      console.log('im in try2.0')
      console.log(data)
      let user = await new User(data).save();
      console.log('im in try2')
      //send verification email
      res.send(user)
      await NodeMailer.sendEmail({
        to: [''], subject: 'Email verification',//write email address in''
        html: '<h1>Hello ${username}${verificationToken}</h1>'

      });
      console.log(verificationToken);
      console.log(data.verification_token);
     // await Bcrypt.hash(password, 10, (async (err, hash) => {

        //if (err) {
       //   next(err);
  
        //  return;
        //}
   // }));


    console.log('im in try3')
    } catch (e) {
      console.log('im in catch');
      console.log(e)
      next(e);

    }

  }
 

  static async verify(req, res, next) {
    const verification_token = req.body.verification_token;
    const email = req.user.email;
    try {
      // console.log('im in try')
      const user = await User.findOneAndUpdate({
        email: email,
        verification_token: verification_token, verification_token_time: { $gt: Date.now() }
      }, { verified: true }, { new: true });
      if (user) {
        res.send(user)
      } else {
        throw new Error('verification Token is expired . please request for a new one ')
      }
    } catch (e) {
      // console.log('im in catch')
      next(e);
    }

  }
  static async resendVerificationEmail(req, res, next) {
    const email = req.user.email;
    const verificationToken = Utils.genrateVerificationToken();

    try {
      const user: any = await User.findOneAndUpdate({ email: email }, {
        verification_token: verificationToken,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
      });
      if (user) {
        const mailer = await NodeMailer.sendEmail({
          to: [user.email],
          subject: 'email verification',
          html: '<h1>${verificationToken}</h1>'
        });
        console.log(res.json)
        res.json({
          success: true
        })
      } else {
        throw Error('Something went wrong')
      }
    }
    catch (e) {
      throw Error('User does not exist');

    }



  }
  static  test(req, res, next) {
    const data = [{title : 'item little', price : 'item price', desc : 'item description'}];
      Request('https://webscraper.io/test-sites/e-commerce/allinone',(error,response,html)=>{
        if(!error && response.statusCode ==200){
          res.send(html)
          const $ = Cheerio.load(html)
          console.log($('.col-md-12').text())
        }
      })
  }
  static async login(req,res,next){
   
    const password = req.query.password;
    const user = req.user;
    try{
        await Utils.comparePassword({plainPassword:password,
          encryptedPassword:user.password});
          console.log(user);
          const token = jwt.sign({email:user.email,user_id:user._id},getEnviromentVariables().jwt_secret,{expiresIn:'120d'});
          const data = {user:user,token:token};
          console.log(data);
          res.json(data)

    }
   
    catch(e){
        next(e);
    }
  }
  static async updatePassword(req,res,next){
    console.log(req.user);
    const user_id = req.user.user_id;
    const password = req.body.password;
   // const confirmPassword = req.body.confirm_password; 
    const newPassword = req.body.new_password;
    try{
  
    const user:any = await User.findOne({_id:user_id});
    console.log(user,user_id);
    if(user){
     await Utils.comparePassword({
       plainPassword:password,
       encryptedPassword:user.password
     });
     const encryptedPassword =  await Utils.encryptPassword(newPassword);
   const newUser = await User.findOneAndUpdate({_id:user_id},{password:encryptedPassword},{new:true});
   res.send(newUser);
    }  

    }catch(e){
      next(e);
    }
  }
  static async resetPassword(req,res,next){
    const user = req.user;
    const newPassword = req.body.new_password;
    try{
      console.log(req.user)
      console.log(newPassword)
      const encryptedPassword = await Utils.encryptPassword(newPassword);
      console.log(user._id);
      const updatedUser = await User.findOneAndUpdate({_id:user._id},{updated_at:new Date(),
      password : encryptedPassword
      },{new:true})

      res.send(updatedUser)
    }catch(e){
       next(e);
    }
  }
  static async sendResetPasswordEmail(req,res,next){
    const email = req.query.email;
    const resetPasswordToken = Utils.genrateVerificationToken();
    try{
        const updatedUser = await User.findOneAndUpdate({email:email},{updated_at:new Date(),reset_password_token:resetPasswordToken,
         reset_password_token_time:Date.now()+new Utils().MAX_TOKEN_TIME},{new:true});
         res.send(updatedUser);
        await NodeMailer.sendEmail({to:[email],
          subject:'reset Password Email',
          html : '<h1>${resetPasswordToken}</h1>'})
    }catch(e){
      next(e);
    }
  }
  static verifyResetPasswordToken(req,res,next){
    res.json({
      success : true
    })
  }
  static async updateProfilePic(req,res,next){
    const userId = req.user.user_id;
    const fileUrl = 'http://localhost:5000/' + req.file.path;
    try{
    const user = await User.findOneAndUpdate({_id:userId},{updated_at: new Date(),
        profile_pic_url:fileUrl
      },{new:true});
      res.send(user);

    }catch(e){
      next(e);
    }



  }
    
}




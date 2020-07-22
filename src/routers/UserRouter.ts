import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {body,query} from 'express-validator';
import { UserVallidator } from "../vallidators/UserVallidators";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { Utils } from "../utils/utils";


export class UserRouter{
    public router : Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes(){
       this.router.get('/send/verification/email',GlobalMiddleware.authenticate,UserController.resendVerificationEmail);
     //this.router.get('/send/verification/email', UserVallidator.resendVerificationEmail(),UserController.resendVerificationEmail)
       this.router.get('/test',UserController.test);
       this.router.get('/login',UserVallidator.login(),GlobalMiddleware.checkError,UserController.login)
       this.router.get('/reset/password',UserVallidator.sendResetPasswordEmail(),GlobalMiddleware.checkError,UserController.sendResetPasswordEmail)
       this.router.get('/verify/resetPasswordToken',UserVallidator.verifyResetPasswordToken(),GlobalMiddleware.checkError,UserController.verifyResetPasswordToken)
       this.router.get('/test',UserController.test)
      }
    postRoutes(){
       this.router.post('/signup',UserVallidator.signUp(),GlobalMiddleware.checkError,UserController.signUp);
    }
    patchRoutes(){
       this.router.patch('/verify',GlobalMiddleware.authenticate,UserVallidator.verifyUser(),GlobalMiddleware.checkError,UserController.verify);
       this.router.patch('/update/password',GlobalMiddleware.authenticate,UserVallidator.updatePassword(),GlobalMiddleware.checkError,UserController.updatePassword)
       this.router.patch('/reset/password',UserVallidator.resetPassword(),GlobalMiddleware.checkError,UserController.resetPassword) 
       this.router.patch('/update/profilePic',new Utils().multer.single('profile_pic'),GlobalMiddleware.authenticate,UserVallidator.updateProfilePic(),GlobalMiddleware.checkError,UserController.updateProfilePic)
    }
    deleteRoutes(){
        
    }
}
export default new UserRouter().router;
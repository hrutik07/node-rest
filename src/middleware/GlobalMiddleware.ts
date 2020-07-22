import { validationResult } from "express-validator";
import * as jwt from 'jsonwebtoken';
import { getEnviromentVariables } from "../enviroments/env";
import e = require("express");
import { decode } from "punycode";

export class GlobalMiddleware {
 static checkError(req,res,next){
     console.log('im in globalMiddleWare');
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log('im in gif')
        next(new Error(error.array()[0].msg))
    }
    else{
        console.log('im in ges')
        next();

    }
 }

 static async authenticate(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7,authHeader.length):null;
    try{
        jwt.verify(token,getEnviromentVariables().jwt_secret,((err,decoded)=>{
            if(err){
                req.errorStatus = 401;
                console.log('im in if of authenticate of globalmiddlware')
                next(err);

            }else if(!decoded){
                next(new Error('User Not Authorised'))

            }else{
                console.log('im in else of authenticate of globalmiddleware')
                req.user = decoded;
                next();
                //res.send(decoded);
            }
            
            
        }))

    }catch(e){
        next(e);
    }
 }
}

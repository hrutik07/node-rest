import * as express from 'express';
import UserRouter from './routers/UserRouter';
import PostRouter from './routers/PostRouter';
import CommentRouter from './routers/CommentRouter';
import * as mongoose from 'mongoose';
import { getEnviromentVariables } from './enviroments/env';
import bodyParser = require('body-parser');
import { Jobs } from './jobs/jobs';
export class Server{
    public app: express.Application = express();



        constructor(){
            this.setConfigurations();
            this.setRoutes();
            this.error404Handler();
            this.handleError();
            this.configureBodyParser();
        }
        setConfigurations(){
            this.connectMongoDb();
            this.app.use(bodyParser.urlencoded({extended : true}))
            Jobs.runRequiredJobs();
        }
        connectMongoDb(){
            console.log(getEnviromentVariables().db_url);
            mongoose.connect(getEnviromentVariables().db_url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            console.log('connected to database');
            });
        }
        configureBodyParser(){

        }
        setRoutes(){
         this.app.use('/src/uploads',express.static('src/uploads'))
         this.app.use('/api/user',UserRouter);
         this.app.use('/api/post',PostRouter);
         this.app.use('/api/comment',CommentRouter);
        }
        error404Handler(){
           console.log('hi');
            this.app.use((req,res)=>{
            console.log('hii');

             res.status(404).json({
                 message : 'Not Found',
                 status_code : 404 
             });
             
         });
        }
        handleError(){
         this.app.use((error,req,res,next)=>{
             const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message : error.message || 'something went wron please try again',
                status_code : errorStatus
            })
         })
         }
        

        
}


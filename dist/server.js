"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const UserRouter_1 = require("./routers/UserRouter");
const PostRouter_1 = require("./routers/PostRouter");
const CommentRouter_1 = require("./routers/CommentRouter");
const mongoose = require("mongoose");
const env_1 = require("./enviroments/env");
const bodyParser = require("body-parser");
const jobs_1 = require("./jobs/jobs");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
        this.configureBodyParser();
    }
    setConfigurations() {
        this.connectMongoDb();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        jobs_1.Jobs.runRequiredJobs();
    }
    connectMongoDb() {
        console.log(env_1.getEnviromentVariables().db_url);
        mongoose.connect(env_1.getEnviromentVariables().db_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('connected to database');
        });
    }
    configureBodyParser() {
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    error404Handler() {
        console.log('hi');
        this.app.use((req, res) => {
            console.log('hii');
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handleError() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'something went wron please try again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;

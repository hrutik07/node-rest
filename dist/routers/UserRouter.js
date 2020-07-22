"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserVallidators_1 = require("../vallidators/UserVallidators");
const GlobalMiddleware_1 = require("../middleware/GlobalMiddleware");
const utils_1 = require("../utils/utils");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification/email', GlobalMiddleware_1.GlobalMiddleware.authenticate, UserController_1.UserController.resendVerificationEmail);
        //this.router.get('/send/verification/email', UserVallidator.resendVerificationEmail(),UserController.resendVerificationEmail)
        this.router.get('/test', UserController_1.UserController.test);
        this.router.get('/login', UserVallidators_1.UserVallidator.login(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.login);
        this.router.get('/reset/password', UserVallidators_1.UserVallidator.sendResetPasswordEmail(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', UserVallidators_1.UserVallidator.verifyResetPasswordToken(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyResetPasswordToken);
        this.router.get('/test', UserController_1.UserController.test);
    }
    postRoutes() {
        this.router.post('/signup', UserVallidators_1.UserVallidator.signUp(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.signUp);
    }
    patchRoutes() {
        this.router.patch('/verify', GlobalMiddleware_1.GlobalMiddleware.authenticate, UserVallidators_1.UserVallidator.verifyUser(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verify);
        this.router.patch('/update/password', GlobalMiddleware_1.GlobalMiddleware.authenticate, UserVallidators_1.UserVallidator.updatePassword(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updatePassword);
        this.router.patch('/reset/password', UserVallidators_1.UserVallidator.resetPassword(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.resetPassword);
        this.router.patch('/update/profilePic', new utils_1.Utils().multer.single('profile_pic'), GlobalMiddleware_1.GlobalMiddleware.authenticate, UserVallidators_1.UserVallidator.updateProfilePic(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updateProfilePic);
    }
    deleteRoutes() {
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;

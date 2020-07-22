"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../models/user");
const utils_1 = require("../utils/utils");
//import { error } from 'console';
const NodeMailer_1 = require("../utils/NodeMailer");
const jwt = require("jsonwebtoken");
const env_1 = require("../enviroments/env");
class UserController {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(utils_1.Utils.genrateVerificationToken());
            const email = req.body.email;
            const password = req.body.password;
            const username = req.body.username;
            const verificationToken = utils_1.Utils.genrateVerificationToken();
            console.log(verificationToken);
            try {
                const hash = yield utils_1.Utils.encryptPassword(password);
                console.log('im in try');
                const data = {
                    email: email,
                    password: hash,
                    username: username,
                    verification_token: verificationToken,
                    verification_token_time: Date.now() + new utils_1.Utils().MAX_TOKEN_TIME,
                    created_at: new Date(),
                    updadated_at: new Date(),
                };
                console.log('im in try2.0');
                console.log(data);
                let user = yield new user_1.default(data).save();
                console.log('im in try2');
                //send verification email
                res.send(user);
                yield NodeMailer_1.NodeMailer.sendEmail({
                    to: ['hritikkumthekar7@gmail.com'], subject: 'Email verification',
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
                console.log('im in try3');
            }
            catch (e) {
                console.log('im in catch');
                console.log(e);
                next(e);
            }
        });
    }
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification_token = req.body.verification_token;
            const email = req.user.email;
            try {
                // console.log('im in try')
                const user = yield user_1.default.findOneAndUpdate({
                    email: email,
                    verification_token: verification_token, verification_token_time: { $gt: Date.now() }
                }, { verified: true }, { new: true });
                if (user) {
                    res.send(user);
                }
                else {
                    throw new Error('verification Token is expired . please request for a new one ');
                }
            }
            catch (e) {
                // console.log('im in catch')
                next(e);
            }
        });
    }
    static resendVerificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const verificationToken = utils_1.Utils.genrateVerificationToken();
            try {
                const user = yield user_1.default.findOneAndUpdate({ email: email }, {
                    verification_token: verificationToken,
                    verification_token_time: Date.now() + new utils_1.Utils().MAX_TOKEN_TIME
                });
                if (user) {
                    const mailer = yield NodeMailer_1.NodeMailer.sendEmail({
                        to: [user.email],
                        subject: 'email verification',
                        html: '<h1>${verificationToken}</h1>'
                    });
                    console.log(res.json);
                    res.json({
                        success: true
                    });
                }
                else {
                    throw Error('Something went wrong');
                }
            }
            catch (e) {
                throw Error('User does not exist');
            }
        });
    }
    static test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default
                .find({ email: 'hk2@gmail.com' })
                .setOptions({ explain: 'executionStats' });
            res.send(user);
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.query.password;
            const user = req.user;
            try {
                yield utils_1.Utils.comparePassword({ plainPassword: password,
                    encryptedPassword: user.password });
                console.log(user);
                const token = jwt.sign({ email: user.email, user_id: user._id }, env_1.getEnviromentVariables().jwt_secret, { expiresIn: '120d' });
                const data = { user: user, token: token };
                console.log(data);
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
            const user_id = req.user.user_id;
            const password = req.body.password;
            // const confirmPassword = req.body.confirm_password; 
            const newPassword = req.body.new_password;
            try {
                const user = yield user_1.default.findOne({ _id: user_id });
                console.log(user, user_id);
                if (user) {
                    yield utils_1.Utils.comparePassword({
                        plainPassword: password,
                        encryptedPassword: user.password
                    });
                    const encryptedPassword = yield utils_1.Utils.encryptPassword(newPassword);
                    const newUser = yield user_1.default.findOneAndUpdate({ _id: user_id }, { password: encryptedPassword }, { new: true });
                    res.send(newUser);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const newPassword = req.body.new_password;
            try {
                console.log(req.user);
                console.log(newPassword);
                const encryptedPassword = yield utils_1.Utils.encryptPassword(newPassword);
                console.log(user._id);
                const updatedUser = yield user_1.default.findOneAndUpdate({ _id: user._id }, { updated_at: new Date(),
                    password: encryptedPassword
                }, { new: true });
                res.send(updatedUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static sendResetPasswordEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            const resetPasswordToken = utils_1.Utils.genrateVerificationToken();
            try {
                const updatedUser = yield user_1.default.findOneAndUpdate({ email: email }, { updated_at: new Date(), reset_password_token: resetPasswordToken,
                    reset_password_token_time: Date.now() + new utils_1.Utils().MAX_TOKEN_TIME }, { new: true });
                res.send(updatedUser);
                yield NodeMailer_1.NodeMailer.sendEmail({ to: [email],
                    subject: 'reset Password Email',
                    html: '<h1>${resetPasswordToken}</h1>' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyResetPasswordToken(req, res, next) {
        res.json({
            success: true
        });
    }
    static updateProfilePic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const fileUrl = 'http://localhost:5000/' + req.file.path;
            try {
                const user = yield user_1.default.findOneAndUpdate({ _id: userId }, { updated_at: new Date(),
                    profile_pic_url: fileUrl
                }, { new: true });
                res.send(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;

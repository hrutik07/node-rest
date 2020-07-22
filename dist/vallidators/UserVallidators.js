"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVallidator = void 0;
//import { body } from "express-validator";
const user_1 = require("../models/user");
const express_validator_1 = require("express-validator");
class UserVallidator {
    static signUp() {
        return [express_validator_1.body('email', 'Email is Required').isEmail().custom((email, { req }) => {
                console.log('im in UserVallidator.signup()');
                return user_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        console.log('im in else');
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Pasword Is Required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password can be from 8-20 Characters only'),
            express_validator_1.body('username', 'Username is Required').isString()];
    }
    static verifyUser() {
        return [express_validator_1.body('verification_token', 'verification token is Required').isNumeric()];
    }
    static updatePassword() {
        return [express_validator_1.body('password', 'Password Is Required').isAlphanumeric(),
            express_validator_1.body('confirm_password', 'Confirm Password Is required').isAlphanumeric(),
            express_validator_1.body('new_password', 'New Password Is required').isAlphanumeric().custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('password And Confirm password Does not match');
                }
            })];
    }
    static login() {
        return [express_validator_1.query('email', 'Email Is Required').isEmail()
                .custom((email, { req }) => {
                return user_1.default.findOne({ email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }),
            express_validator_1.query('password', 'Password Is Required').isAlphanumeric()];
    }
    static sendResetPasswordEmail() {
        return [express_validator_1.query('email').isEmail().custom((email, { req }) => {
                return user_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email Does Not Exist');
                    }
                });
            })];
    }
    static verifyResetPasswordToken() {
        return [express_validator_1.query('reset_password_token', 'Reset Password Token is Required ')
                .isNumeric().custom((token, { req }) => {
                return user_1.default.findOne({ reset_password_token: token, reset_password_token_time: { $gt: Date.now() }
                }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        console.log(user);
                        throw new Error('Token Does Not exist please request for new one');
                    }
                });
            })];
    }
    static resetPassword() {
        return [express_validator_1.body('email', 'email is required').isEmail().custom((email, { req }) => {
                return user_1.default.findOne({ email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_1.body('new_password', 'New Password iis Required').isAlphanumeric()
                .custom((new_password, { req }) => {
                console.log(req.body.confirm_password);
                console.log(req.body.new_password);
                if (req.body.confirm_password === req.body.new_password) {
                    return true;
                }
                else {
                    throw new Error('Confirm Password and new password Does not matched');
                }
            }),
            express_validator_1.body('confirm_password', 'confirm password Is Required').isAlphanumeric(),
            express_validator_1.body('reset_password_token', 'Reset Password Token').isNumeric()
                .custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset password token is Invalid. please try again');
                }
            })];
    }
    static updateProfilePic() {
        return [express_validator_1.body('profile_pic').custom((profilePic, { req }) => {
                console.log('im in updateProfilepic');
                console.log(req.file);
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File Not Uploaded');
                }
            })];
    }
}
exports.UserVallidator = UserVallidator;

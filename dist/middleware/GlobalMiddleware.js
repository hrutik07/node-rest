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
exports.GlobalMiddleware = void 0;
const express_validator_1 = require("express-validator");
const jwt = require("jsonwebtoken");
const env_1 = require("../enviroments/env");
class GlobalMiddleware {
    static checkError(req, res, next) {
        console.log('im in globalMiddleWare');
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            console.log('im in gif');
            next(new Error(error.array()[0].msg));
        }
        else {
            console.log('im in ges');
            next();
        }
    }
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
            try {
                jwt.verify(token, env_1.getEnviromentVariables().jwt_secret, ((err, decoded) => {
                    if (err) {
                        req.errorStatus = 401;
                        console.log('im in if of authenticate of globalmiddlware');
                        next(err);
                    }
                    else if (!decoded) {
                        next(new Error('User Not Authorised'));
                    }
                    else {
                        console.log('im in else of authenticate of globalmiddleware');
                        req.user = decoded;
                        next();
                        //res.send(decoded);
                    }
                }));
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.GlobalMiddleware = GlobalMiddleware;

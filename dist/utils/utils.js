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
exports.Utils = void 0;
const Bcrypt = require("bcryptjs");
const Multer = require("multer");
const storageOptions = Multer.diskStorage({ destination: function (req, file, cb) {
        console.log('im in diskstorage');
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
        console.log('im in filename');
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME = 600000;
        this.multer = Multer({ storage: storageOptions, fileFilter: fileFilter });
    }
    static genrateVerificationToken(size = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    static comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Bcrypt.compare(password.plainPassword, password.encryptedPassword, (err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        reject(new Error('User and password Does NOt Match'));
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
}
exports.Utils = Utils;

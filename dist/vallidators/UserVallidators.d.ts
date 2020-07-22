export declare class UserVallidator {
    static signUp(): import("express-validator").ValidationChain[];
    static verifyUser(): import("express-validator").ValidationChain[];
    static updatePassword(): import("express-validator").ValidationChain[];
    static login(): import("express-validator").ValidationChain[];
    static sendResetPasswordEmail(): import("express-validator").ValidationChain[];
    static verifyResetPasswordToken(): import("express-validator").ValidationChain[];
    static resetPassword(): import("express-validator").ValidationChain[];
    static updateProfilePic(): import("express-validator").ValidationChain[];
}

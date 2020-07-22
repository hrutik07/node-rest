"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnviromentVariables = void 0;
const prod_env_1 = require("./prod.env");
const dev_env_1 = require("./dev.env");
function getEnviromentVariables() {
    if (process.env.NODE_ENV === 'production') {
        return prod_env_1.ProdEnviroment;
    }
    return dev_env_1.DevEnviroment;
}
exports.getEnviromentVariables = getEnviromentVariables;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const Database_1 = require("./Database");
const Email_1 = require("./Email");
class Jobs {
    static runRequiredJobs() {
        Database_1.Database.runDatabaseJobs();
        Email_1.Email.runEmailJobs();
    }
}
exports.Jobs = Jobs;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const JobSchedular = require("node-schedule");
class Email {
    static runEmailJobs() {
        this.sendEmailJob();
    }
    static sendEmailJob() {
        JobSchedular.scheduleJob('send email job', '* * * * *', () => {
            console.log('emial job scheduled');
        });
    }
}
exports.Email = Email;

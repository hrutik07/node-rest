"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class NodeMailer {
    static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }));
    }
    static sendEmail(data) {
        {
            return NodeMailer.initializeTransport().sendMail({ from: 'hrutik.kumthekar19@vit.edu',
                to: data.to,
                subject: data.subject,
                html: data.html });
        }
    }
}
exports.NodeMailer = NodeMailer;

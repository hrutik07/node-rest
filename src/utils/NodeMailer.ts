import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';


export class NodeMailer{
       private static initializeTransport(){
               return nodeMailer.createTransport(SendGrid({
                 auth : {
                     api_key : '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'
                 }

               }))
}
static sendEmail(data:{to:[string],subject:string,html:string}):Promise<any>{
{
return NodeMailer.initializeTransport().sendMail(
        {from:'hrutik.kumthekar19@vit.edu', 
        to : data.to,
        subject:data.subject,
        html:data.html})
}

}
}
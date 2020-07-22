import * as JobSchedular from 'node-schedule'

export class Email{
    static runEmailJobs(){
        this.sendEmailJob()
    }

    static sendEmailJob(){
        JobSchedular.scheduleJob('send email job','* * * * *',()=>{
            console.log('emial job scheduled')
        })
    }
    
}
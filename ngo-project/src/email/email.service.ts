import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class EmailService {

    constructor(private readonly mailService: MailerService) { }


    async sendEmail(code, sendTo: string) {

        const message = `your code is ${code}`;

        const r = await this.mailService.sendMail({
            from: 'FxLeader',
            to: sendTo,
            subject: `authontication Code!!`,
            text: message,
        })
        console.log(r)
        return r
    }




    private async getPage(code: string) {
        return `<!DOCTYPE html>
   <html>
    <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
        <title>link for veifying Email</title>
    </head>
    <body class="container-fluid justify-content-center">
        <div class="container-fluid justify-content-center">
        <div class="card text-center">
            <div  class="card-header" style=" height:60px; text-align : center; background-color: rgba(0, 190, 190, 0.316);">
               TEHRAN ICH SUPPORT
            </div>
            <div class="card-body">
              <h5 style="text-align : center;" class="card-title">veifying Email</h5>
              <p style="text-align : center;" class="card-text">please use this link for approv your email</p>
                <p style="text-align : center;" class="card-text text-center"><b>Your link is:</b></p>
                <h5 style="text-align : center;" class="card-title text-center">${code}</h5>
              <br>
              <p style="text-align : center;" class="card-text">this email send for approving your gmail</p>
              <p style="text-align : center;" class="card-text">If you have not requested this email, please ignore it</p>
            </div>
            <div class="card-footer text-body-secondary">
                <h6 style="text-align: center;">TEHRAN ICH SUPPORT<span class="badge text-bg-secondary"><a href = "https://webngo.oceanjourney.ir">ICH.ngo.ir</a></span></h6> 
            </div>
          </div>
    </div>
    </body>
   </html>`
    }



    async sendResetPasswordEmail(code: string, sendTo: string) {

        const message = await this.getPage(code);

        const r = await this.mailService.sendMail({
            from: 'ICH TEHRAN',
            to: sendTo,
            subject: `approving email account`,
            html: message,
        })
        // console.log(r)
        return r
    }
}

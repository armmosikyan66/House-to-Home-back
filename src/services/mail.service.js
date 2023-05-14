import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "gagikharutyunyan189@gmail.com",
                pass: "gdqyuutfshtotgnt"
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "gagikharutyunyan189@gmail.com",
            to,
            subject: 'Активация аккаунта',
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendReport(firstName, lastName, email, phoneNumber, message) {
        await this.transporter.sendMail({
            from: email,
            to: process.env.SMTP_USER,
            subject: 'Report',
            html:
                `
                <div>
                   <h3>Report from ${firstName} ${lastName}</h3>
                   <span>${message}</span>
                   <h4>Phone: ${phoneNumber}</h4>
                   <h4>E-mail: ${email}</h4>
                </div>
            `
        })
    }
}

export default new MailService();
import IEmailProvider from "../models/IEmailProvider";
import nodemailer, { Transporter } from 'nodemailer';

interface IMessage {
  to: string;
  body: string;
}

export default class EtherealMailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    const account = nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter
    });

  }

  public async sendEmail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipa GoBarber <equipa@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}

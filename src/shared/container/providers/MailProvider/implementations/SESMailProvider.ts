import IEmailProvider from "../models/IEmailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import { injectable, inject } from 'tsyringe';
import mailConfig from '@config/mail';

interface IMessage {
  to: string;
  body: string;
}

@injectable()
export default class SESMailProvider implements IEmailProvider {

  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_DEFAULT_REGION
      })
    });
  }

  public async sendEmail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {

    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

  }

}

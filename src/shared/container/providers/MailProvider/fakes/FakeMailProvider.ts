import ISendMailDTO from "../dtos/ISendMailDTO";
import IEmailProvider from "../models/IEmailProvider";


export default class FakeEmailProvider implements IEmailProvider {

  private messages: ISendMailDTO[] = [];

  public async sendEmail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }

}

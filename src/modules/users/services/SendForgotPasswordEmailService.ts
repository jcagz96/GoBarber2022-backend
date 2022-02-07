import IUsersRepository from '../repositories/IUsersRepository';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IEmailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(@inject('UsersRepository')
  private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider) {
  }

  public async execute({ email }: IRequest): Promise<void> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exist');
    }

    this.mailProvider.sendEmail(email, 'Pedido de recuperação de senha recebido');

  }
}

export default SendForgotPasswordEmailService;

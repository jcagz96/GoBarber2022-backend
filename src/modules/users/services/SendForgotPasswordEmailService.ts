import IUsersRepository from '../repositories/IUsersRepository';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/modules/IHashProvider';

interface IRequest {
  name: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(@inject('UsersRepository')
  private usersRepository: IUsersRepository) {
  }

  public async execute({ name }: IRequest): Promise<void> {


  }
}

export default SendForgotPasswordEmailService;

import AppError from '@shared/errors/AppError';
import UserRegistrationToken from '../infra/typeorm/entities/UserRegistrationToken';
import IUserRegistrationTokensRepository from '../repositories/IUserRegistrationTokensRepository';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  registrationToken: string;
  enabled: boolean;
}

@injectable()
class CreateUserRegistrationService {
  constructor(
    @inject('UserRegistrationTokenRepository')
    private usersRegistrationRepository: IUserRegistrationTokensRepository,
  ) { }

  public async execute({ user_id, registrationToken, enabled }: IRequest): Promise<UserRegistrationToken> {

    const user = this.usersRegistrationRepository.create(user_id, registrationToken, enabled);

    return user;
  }
}

export default CreateUserRegistrationService;

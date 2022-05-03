import AppError from '@shared/errors/AppError';
import UserRegistrationToken from '../infra/typeorm/entities/UserRegistrationToken';
import IUserRegistrationTokensRepository from '../repositories/IUserRegistrationTokensRepository';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  device_id: string;
  registrationToken: string;
  enabled: boolean;
}

@injectable()
class CreateUserRegistrationService {
  constructor(
    @inject('UserRegistrationTokenRepository')
    private usersRegistrationRepository: IUserRegistrationTokensRepository,
  ) { }

  public async execute({ user_id, device_id, registrationToken, enabled }: IRequest): Promise<UserRegistrationToken> {


    const userPushNotificationTokenExists = await this.usersRegistrationRepository.findByUserAndDevice(user_id, device_id);
    var userPushNotificationToken;
    if (!userPushNotificationTokenExists) {
      userPushNotificationToken = this.usersRegistrationRepository.create(user_id, device_id, registrationToken, enabled);
    }
    else {
      userPushNotificationTokenExists.registrationToken = registrationToken;
      userPushNotificationTokenExists.enabled = enabled;

      userPushNotificationToken = this.usersRegistrationRepository.save(userPushNotificationTokenExists);
    }

    return userPushNotificationToken;
  }
}

export default CreateUserRegistrationService;

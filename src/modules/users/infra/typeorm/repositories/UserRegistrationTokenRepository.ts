import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRegistrationTokensRepository from '@modules/users/repositories/IUserRegistrationTokensRepository';
import UserRegistrationToken from '../entities/UserRegistrationToken';

class UserRegistrationTokenRepository implements IUserRegistrationTokensRepository {
  private ormRepository: Repository<UserRegistrationToken>;

  constructor() {
    this.ormRepository = getRepository(UserRegistrationToken);
  }

  public async create(user_id: string, registrationToken: string, enabled: boolean): Promise<UserRegistrationToken> {
    const userRegistrationToken = this.ormRepository.create({
      user_id,
      registrationToken,
      enabled
    });

    await this.ormRepository.save(userRegistrationToken);
    return userRegistrationToken;
  }
}

export default UserRegistrationTokenRepository;

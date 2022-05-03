import { getRepository, Repository, UpdateResult } from 'typeorm';

import IUserRegistrationTokensRepository from '@modules/users/repositories/IUserRegistrationTokensRepository';
import UserRegistrationToken from '../entities/UserRegistrationToken';

class UserRegistrationTokenRepository implements IUserRegistrationTokensRepository {
  private ormRepository: Repository<UserRegistrationToken>;

  constructor() {
    this.ormRepository = getRepository(UserRegistrationToken);
  }

  public async create(user_id: string, device_id: string, registrationToken: string, enabled: boolean): Promise<UserRegistrationToken> {
    const userRegistrationToken = this.ormRepository.create({
      user_id,
      device_id,
      registrationToken,
      enabled
    });

    await this.ormRepository.save(userRegistrationToken);
    return userRegistrationToken;
  }

  public async findByUserAndDevice(user_id: string, device_id: string): Promise<UserRegistrationToken | undefined> {
    const userRegistrationToken = await this.ormRepository.findOne({ where: { user_id, device_id } });
    return userRegistrationToken;
  }

  public async findByUserId(user_id: string): Promise<UserRegistrationToken | undefined> {
    const userRegistrationToken = await this.ormRepository.findOne({ where: { user_id } });
    return userRegistrationToken;
  }

  public async save(userRegistrationToken: UserRegistrationToken): Promise<UserRegistrationToken> {
    await this.ormRepository.save(userRegistrationToken);
    return userRegistrationToken;
  }

}

export default UserRegistrationTokenRepository;

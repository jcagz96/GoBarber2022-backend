import { getRepository, Repository, UpdateResult } from 'typeorm';

import IUserSocketsRepository from '@modules/users/repositories/IUserSocketsRepository';
import UserSocket from '../entities/UserSocket';

class UserSocketsRepository implements IUserSocketsRepository {
  private ormRepository: Repository<UserSocket>;

  constructor() {
    this.ormRepository = getRepository(UserSocket);
  }

  public async create(user_id: string, socket_id: string, platform: string): Promise<UserSocket> {
    const userSocket = this.ormRepository.create({
      user_id,
      socket_id,
      platform
    });

    await this.ormRepository.save(userSocket);
    return userSocket;
  }

  public async delete(user_id: string, socket_id: string, platform: string): Promise<void> {
    const userSocket = await this.ormRepository.delete({
      user_id,
      socket_id,
      platform
    });
  }

}

export default UserSocketsRepository;

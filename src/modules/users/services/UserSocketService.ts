import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserSocketsRepository from '../repositories/IUserSocketsRepository';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import UserSocket from '../infra/typeorm/entities/UserSocket';

interface IRequest {
  user_id: string;
  socket_id: string;
  platform: string;
}

@injectable()
class UserSocketService {
  constructor(
    @inject('UserSocketsRepository')
    private userSocketRepository: IUserSocketsRepository,
  ) { }

  public async create({ user_id, socket_id, platform }: IRequest): Promise<UserSocket> {

    const userSocket = await this.userSocketRepository.create(user_id, socket_id, platform);

    return userSocket;
  }

  public async delete(socket_id: string): Promise<void> {

    const userSocket = await this.userSocketRepository.delete(socket_id);
  }

  public async findByUserIdAndPlatform(user_id: string, platform: string): Promise<UserSocket[]> {

    const userSockets = await this.userSocketRepository.findByUserIdAndPlatform(user_id, platform);

    return userSockets;
  }


}

export default UserSocketService;

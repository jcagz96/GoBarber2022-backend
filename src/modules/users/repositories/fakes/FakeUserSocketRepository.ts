import UserSocket from '../../infra/typeorm/entities/UserSocket';
import IUserSocketsRepository from '@modules/users/repositories/IUserSocketsRepository';
import { v4 as uuid } from 'uuid';

class FakeUserSocketsTokenRepository implements IUserSocketsRepository {
  public userSockets: UserSocket[] = [];

  public async create(user_id: string, socket_id: string, platform: string): Promise<UserSocket> {
    const userSocket = new UserSocket();
    userSocket.id = uuid();
    userSocket.user_id = user_id;
    userSocket.socket_id = socket_id;
    userSocket.platform = platform;

    this.userSockets.push(userSocket);

    return userSocket;
  }
  public async delete(socket_id: string): Promise<void> {
    const filteredUserSockets = this.userSockets.filter((item: UserSocket) => item.socket_id !== socket_id);
    this.userSockets = filteredUserSockets;
  }
  public async findByUserIdAndPlatform(user_id: string, platform: string): Promise<UserSocket[]> {
    const userSocketsAux = this.userSockets.filter(item => item.user_id === user_id && item.platform === platform);
    return userSocketsAux;
  }
}

export default FakeUserSocketsTokenRepository;

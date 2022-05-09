import UserSocket from "../infra/typeorm/entities/UserSocket";

export default interface IUserTokensRepository {
  create(user_id: string, socket_id: string, platform: string): Promise<UserSocket>;
  delete(socket_id: string): Promise<void>;
  findByUserIdAndPlatform(user_id: string, platform: string): Promise<UserSocket[]>;
}

import UserSocket from "../infra/typeorm/entities/UserSocket";

export default interface IUserTokensRepository {
  create(user_id: string, socket_id: string, platform: string): Promise<UserSocket>;
  delete(user_id: string, socket_id: string, platform: string): Promise<void>;
}

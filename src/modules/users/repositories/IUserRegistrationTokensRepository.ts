import UserRegistrationToken from "../infra/typeorm/entities/UserRegistrationToken";

export default interface IUserTokensRepository {
  create(user_id: string, device_id: string, registrationToken: string, enabled: boolean): Promise<UserRegistrationToken>;
  findByUserAndDevice(user_id: string, device_id: string): Promise<UserRegistrationToken | undefined>;
  findByUserId(user_id: string): Promise<UserRegistrationToken[] | undefined>;
  save(userRegistrationToken: UserRegistrationToken): Promise<UserRegistrationToken>;
}

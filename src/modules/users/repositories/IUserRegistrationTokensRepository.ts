import UserRegistrationToken from "../infra/typeorm/entities/UserRegistrationToken";

export default interface IUserTokensRepository {
  create(user_id: string, registrationToken: string, enabled: boolean): Promise<UserRegistrationToken>;
  //findByToken(token: string): Promise<UserToken | undefined>;
}

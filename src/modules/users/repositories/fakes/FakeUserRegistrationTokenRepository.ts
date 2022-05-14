import UserRegistrationToken from '../../infra/typeorm/entities/UserRegistrationToken';
import IUserRegistrationTokensRepository from '@modules/users/repositories/IUserRegistrationTokensRepository';
import { v4 as uuid } from 'uuid';

class FakeUserRegistrationTokenRepository implements IUserRegistrationTokensRepository {

  private userRegistrationTokens: UserRegistrationToken[] = [];

  public async create(user_id: string, device_id: string, registrationToken: string, enabled: boolean): Promise<UserRegistrationToken> {
    const userRegistrationToken: UserRegistrationToken = {
      id: uuid(),
      user_id,
      device_id,
      registrationToken,
      enabled,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.userRegistrationTokens.push(userRegistrationToken);

    return userRegistrationToken;
  }
  public async findByUserAndDevice(user_id: string, device_id: string): Promise<UserRegistrationToken | undefined> {
    const userRegistrationToken = this.userRegistrationTokens.find(userRegistrationTokenAux => userRegistrationTokenAux.user_id === user_id && userRegistrationTokenAux.device_id === device_id);
    return userRegistrationToken;
  }
  public async findByUserId(user_id: string): Promise<UserRegistrationToken[] | undefined> {
    const userRegistrationTokens = this.userRegistrationTokens.filter(userRegistrationTokenAux => userRegistrationTokenAux.user_id === user_id);
    return userRegistrationTokens;
  }
  public async save(userRegistrationToken: UserRegistrationToken): Promise<UserRegistrationToken> {
    const findIndex = this.userRegistrationTokens.findIndex(findUser => findUser.id = userRegistrationToken.id);
    this.userRegistrationTokens[findIndex] = userRegistrationToken;
    return userRegistrationToken;
  }






}

export default FakeUserRegistrationTokenRepository;



import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';
import IUserTokensRepository from '../IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {


  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken;
    userToken.id = uuid();
    userToken.token = uuid();
    userToken.user_id = user_id;
    userToken.created_at = new Date();
    userToken.updated_at = new Date();

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token === token);

    return userToken;
  }


}

export default FakeUserTokensRepository;

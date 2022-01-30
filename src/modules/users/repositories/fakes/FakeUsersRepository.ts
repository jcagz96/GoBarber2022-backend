

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';

class FakeUsersRepository implements IUsersRepository {

  private users: User[] = [];


  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User;

    user.id = uuid();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    this.users.push(user);
    return user;
  }
  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id = user.id);
    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
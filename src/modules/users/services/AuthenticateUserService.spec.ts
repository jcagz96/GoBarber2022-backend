import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'jonhdoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {

    await expect(authenticateUser.execute({
      email: 'jonhdoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    })

    await expect(authenticateUser.execute({
      email: 'jonhdoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });
});




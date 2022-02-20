import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jonhdoe@example.com');
  });

  it('should be able to create a new user with same email from another', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    });

    await expect(createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });
});



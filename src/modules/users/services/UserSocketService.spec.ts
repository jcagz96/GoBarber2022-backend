import UserSocketService from './UserSocketService';
import FakeUserSocketRepository from '../repositories/fakes/FakeUserSocketRepository';
import AppError from '@shared/errors/AppError';

let fakeUserSocketRepository: FakeUserSocketRepository;
let userSocketService: UserSocketService;

describe('UserSocket', () => {

  beforeEach(() => {
    fakeUserSocketRepository = new FakeUserSocketRepository();
    userSocketService = new UserSocketService(
      fakeUserSocketRepository,
    );
  });

  it('should be able to create a new user socket', async () => {
    const userSocket = await userSocketService.create({
      user_id: 'user_id_teste',
      socket_id: 'socket_id_teste',
      platform: 'website'
    });

    expect(userSocket).toHaveProperty('id');
    expect(userSocket.socket_id).toBe('socket_id_teste');
    expect(userSocket.platform).toBe('website');
  });

  it('should be able to delete a user socket', async () => {
    const userSocket = await userSocketService.create({
      user_id: 'user_id_teste',
      socket_id: 'socket_id_teste',
      platform: 'website'
    });

    expect(fakeUserSocketRepository.userSockets.length).toBe(1);

    await userSocketService.delete('socket_id_teste');

    expect(fakeUserSocketRepository.userSockets.length).toBe(0);
  });

  it('should be able to find user sockets', async () => {
    const userSocketOne = await userSocketService.create({
      user_id: 'user_id_teste_1',
      socket_id: 'socket_id_teste_1',
      platform: 'website'
    });
    const userSocketTwo = await userSocketService.create({
      user_id: 'user_id_teste_2',
      socket_id: 'socket_id_teste_2',
      platform: 'website'
    });

    const userSockets = await userSocketService.findByUserIdAndPlatform(
      'user_id_teste_2',
      'website'
    );

    expect(userSockets.length).toBe(1);
    expect(userSockets[0].socket_id).toBe('socket_id_teste_2');
  });
});



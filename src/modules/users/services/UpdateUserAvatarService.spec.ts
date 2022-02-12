import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;

let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUser', () => {

  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  });

  it('should be able to update a user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    })


    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from a non existing user', async () => {

    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should be delete old avatar when updating a new one', async () => {

    //to verify if deletefile() function was executed later
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    })


    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });

});



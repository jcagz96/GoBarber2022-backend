import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository);

    await sendForgotPasswordEmail.execute({
      email: 'jonhdoe@example.com',
    });

    expect(user).toHaveProperty('id');
  });


});



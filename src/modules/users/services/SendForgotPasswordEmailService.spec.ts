import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });

  it('should be able to recover password using email', async () => {


    const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'jonhdoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });


  it('should not be able to recover a non-existing user password', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await expect(sendForgotPasswordEmail.execute({
      email: 'jonhdoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'jonhdoe@example.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});



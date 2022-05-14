import CreateUserRegistrationService from './CreateUserRegistrationService';
import FakeUserRegistrationTokenRepository from '../repositories/fakes/FakeUserRegistrationTokenRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRegistrationTokenRepository: FakeUserRegistrationTokenRepository;
let createUserRegistrationService: CreateUserRegistrationService;

describe('CreateUserRegistrationToken', () => {

  beforeEach(() => {
    fakeUserRegistrationTokenRepository = new FakeUserRegistrationTokenRepository();
    createUserRegistrationService = new CreateUserRegistrationService(
      fakeUserRegistrationTokenRepository,
    );
  });

  it('should be able to create a new user registration token', async () => {
    const userRegistrationToken = await createUserRegistrationService.execute({
      user_id: 'user_teste_id',
      registrationToken: 'registrationToken_teste',
      device_id: 'teste_device_id',
      enabled: true
    });

    expect(userRegistrationToken).toHaveProperty('id');
    expect(userRegistrationToken.registrationToken).toBe('registrationToken_teste');
  });

  it('should be able to update user registration token, instead of create a new one', async () => {
    const userRegistrationToken = await createUserRegistrationService.execute({
      user_id: 'user_teste_id',
      registrationToken: 'registrationToken_teste',
      device_id: 'teste_device_id',
      enabled: true
    });

    expect(userRegistrationToken.registrationToken).toBe('registrationToken_teste');

    await createUserRegistrationService.execute({
      user_id: 'user_teste_id',
      registrationToken: 'registrationToken_novo',
      device_id: 'teste_device_id',
      enabled: false
    });

    expect(userRegistrationToken.registrationToken).toBe('registrationToken_novo');
  });
});



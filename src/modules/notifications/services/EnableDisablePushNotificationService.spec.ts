import CreateUserRegistrationService from '@modules/users/services/CreateUserRegistrationService';
import EnableDisablePushNotificationService from '@modules/notifications/services/EnableDisablePushNotificationService';
import FakeUserRegistrationTokenRepository from '@modules/users/repositories/fakes/FakeUserRegistrationTokenRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRegistrationTokenRepository: FakeUserRegistrationTokenRepository;
let createUserRegistrationService: CreateUserRegistrationService;
let enableDisablePushNotificationService: EnableDisablePushNotificationService;

describe('EnableDisablePushNotificationService', () => {

  beforeEach(() => {
    fakeUserRegistrationTokenRepository = new FakeUserRegistrationTokenRepository();
    createUserRegistrationService = new CreateUserRegistrationService(
      fakeUserRegistrationTokenRepository,
    );
    enableDisablePushNotificationService = new EnableDisablePushNotificationService(
      fakeUserRegistrationTokenRepository,
    );
  });

  it('should be able to disable push notifications for a given user', async () => {

    await createUserRegistrationService.execute({
      user_id: 'user_teste_id_2',
      registrationToken: 'registrationToken_teste_2',
      device_id: 'teste_device_id_2',
      enabled: true
    });

    await enableDisablePushNotificationService.execute({
      user_id: 'user_teste_id_2',
      enabled: false
    });


    expect(fakeUserRegistrationTokenRepository.userRegistrationTokens[0].enabled).toBe(false);

  });
});



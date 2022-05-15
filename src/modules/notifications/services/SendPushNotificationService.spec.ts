import CreateUserRegistrationService from '@modules/users/services/CreateUserRegistrationService';
import SendPushNotificationService from '@modules/notifications/services/SendPushNotificationService';
import FakeUserRegistrationTokenRepository from '@modules/users/repositories/fakes/FakeUserRegistrationTokenRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRegistrationTokenRepository: FakeUserRegistrationTokenRepository;
let createUserRegistrationService: CreateUserRegistrationService;
let sendPushNotificationService: SendPushNotificationService;

describe('SendPushNotificationService', () => {

  beforeEach(() => {
    fakeUserRegistrationTokenRepository = new FakeUserRegistrationTokenRepository();
    createUserRegistrationService = new CreateUserRegistrationService(
      fakeUserRegistrationTokenRepository,
    );
    sendPushNotificationService = new SendPushNotificationService(
      fakeUserRegistrationTokenRepository,
    );
  });

  it('should be able to send a push notification', async () => {

    const userRegistrationToken = await createUserRegistrationService.execute({
      user_id: 'user_teste_id_1',
      registrationToken: 'registrationToken_teste_1',
      device_id: 'teste_device_id_1',
      enabled: true
    });
    const sendPushNotification = jest.spyOn(sendPushNotificationService, 'execute');


    await sendPushNotificationService.execute({
      title: 'titulo_teste',
      message: 'mensagem_de_teste',
      user_id: 'user_teste_id_1'
    });

    expect(sendPushNotification).toHaveBeenCalled();

  });

  it('should not be able to send a push notification, because user has disabled notifications', async () => {

    const userRegistrationToken = await createUserRegistrationService.execute({
      user_id: 'user_teste_id_1',
      registrationToken: 'registrationToken_teste_1',
      device_id: 'teste_device_id_1',
      enabled: false
    });
    const sendPushNotification = jest.spyOn(sendPushNotificationService, 'execute');


    await sendPushNotificationService.execute({
      title: 'titulo_teste',
      message: 'mensagem_de_teste',
      user_id: 'user_teste_id_1'
    });

    expect(sendPushNotification).toHaveBeenCalled();

  });

});



import { injectable, inject } from 'tsyringe';
import 'dotenv/config';
import UserRegistrationTokenRepository from '@modules/users/infra/typeorm/repositories/UserRegistrationTokenRepository';


interface IRequest {
  user_id: string;
  enabled: boolean;
}

@injectable()
class EnableDisablePushNotificationService {

  constructor(
    @inject('UserRegistrationTokenRepository')
    private userRegistrationTokenRepository: UserRegistrationTokenRepository,

  ) { }

  public async execute({
    user_id,
    enabled
  }: IRequest): Promise<void> {

    const tokens = await this.userRegistrationTokenRepository.findByUserId(user_id);

    tokens?.map((token) => {
      this.userRegistrationTokenRepository.save({
        id: token.id,
        device_id: token.device_id,
        registrationToken: token.registrationToken,
        enabled: enabled,
        user_id: token.user_id,
        created_at: token.created_at,
        updated_at: new Date()
      })
    })

  }
}

export default EnableDisablePushNotificationService;

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain } from 'class-transformer';
import admin from 'firebase-admin';
import 'dotenv/config';
import IUserRegistrationTokensRepository from '@modules/users/repositories/IUserRegistrationTokensRepository';
import { firebase } from '@config/firebase';
import Logger from '../../../shared/infra/logger';


interface IRequest {
  user_id: string;
  title: string;
  message: string;
}

@injectable()
class SendPushNotificationService {

  private firebase: admin.app.App = firebase;

  constructor(
    @inject('UserRegistrationTokenRepository')
    private userRegistrationTokenRepository: IUserRegistrationTokensRepository,

  ) { }

  public async execute({
    user_id,
    title,
    message
  }: IRequest): Promise<void> {

    const tokens = await this.userRegistrationTokenRepository.findByUserId(user_id);

    if (tokens) {
      tokens.map((token) => {
        if (token.enabled) {
          this.firebase.messaging().sendToDevice(
            token.registrationToken,
            {
              notification: {
                title,
                body: message,

              }
              ,
            })
            .then(response => {
              Logger.info(`Notification sent successfully to user_id: ${user_id}, device_id ${token.device_id}`);
            })
            .catch(error => {
              Logger.error(`Error sending notification to user_id: ${user_id}, device_id ${token.device_id}`);
            });
        }
        else {
          Logger.info(`User: ${user_id} had disabled notifications`);
        }
      });
    }
    else {
      throw new AppError('Error sending notification. This user does not have push notifications registration tokens');
    }




    /* if (token) {
      if (token[0]) {
        if (token[0].enabled) {
          this.firebase.messaging().sendToDevice(
            token[0].registrationToken,
            {
              notification: {
                title,
                body: message,

              }
              ,
            })
            .then(response => {
              Logger.info(`Notification sent successfully to user_id: ${user_id}`);
            })
            .catch(error => {
              Logger.error(`Error sending notification to user_id: ${user_id}`);
              throw new AppError('Error sending notification');
            });
        }
        else {
          Logger.error(`User: ${user_id} had disabled notifications`);
          throw new AppError('Error sending notification. User had disabled notifications');
        }
      }
      else {
        throw new AppError('Error sending notification. This user does not have push notifications registration token');
      }
    } */

  }
}

export default SendPushNotificationService;

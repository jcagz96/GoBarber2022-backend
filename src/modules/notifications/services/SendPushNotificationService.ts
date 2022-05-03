import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain } from 'class-transformer';
import admin from 'firebase-admin';
import 'dotenv/config';
import UserRegistrationTokenRepository from '@modules/users/infra/typeorm/repositories/UserRegistrationTokenRepository';
import { firebase } from '@config/firebase';
import Logger from '../../../shared/infra/logger';


interface IRequest {
  user_id: string;
  title: string;
  message: string;
}

@injectable()
class SendPushNotificationService {

  /*   private firebase: admin.app.App = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
        projectId: process.env.FIREBASE_PROJECT_ID
      }),
    }, String(Date.now())); */

  private firebase = firebase;

  constructor(
    @inject('UserRegistrationTokenRepository')
    private userRegistrationTokenRepository: UserRegistrationTokenRepository,

  ) { }

  public async execute({
    user_id,
    title,
    message
  }: IRequest): Promise<void> {

    const token = await this.userRegistrationTokenRepository.findByUserId(user_id);

    if (token) {

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
          Logger.info(`Notification sent successfully to user_id: ${user_id}`);
        })
        .catch(error => {
          Logger.error(`Error sending notification to user_id: ${user_id}`);
          throw new AppError('Error sending notification');
        });
    }




  }
}

export default SendPushNotificationService;

import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import routes from './routes';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/RateLimiter';
import httpRequestLogger from './middlewares/httpMiddleware';
import Logger from './../logger';
import admin from 'firebase-admin';
import firebaseServiceAccount from '../../../../src/config/google-services.json';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '../../errors/AppError';

const app = express();

app.use([rateLimiter, httpRequestLogger]);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
  Logger.info("Server started on port 3333");



  /*   admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: firebaseServiceAccount.client_email,
        privateKey: firebaseServiceAccount.private_key,
        projectId: firebaseServiceAccount.project_id
      }),
    });

    admin.messaging().sendToDevice(
      "dPcBxXf0QtmjIi7ri4ctqO:APA91bG4A9aUFt0P3HPNHff5XXM5aEH9v3icaRnncIYqlhKKDmguq7O8dSzevvrzOtX4ifYmXyyCJCzPGASZzE5YHTgwwpAydApmFosSbmMBuGBqGD1_m9di-3t1lcbxHCKYhsppGjOG",
      {
        notification: {
          title: "teste",
          body: "teste notificação nodejs"
        }
      })
      .then(response => {

        console.log("Notification sent successfully")

      })
      .catch(error => {
        console.log(error);
      }); */

  /* Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log"); */
});

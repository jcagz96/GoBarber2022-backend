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
//import admin from 'firebase-admin';
//import firebaseServiceAccount from '../../../../src/config/google-services.json';

import '@shared/infra/typeorm';
import '@shared/container';
import { firebase } from '@config/firebase';

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

  Logger.error("Internal server error. Status=500");

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  Logger.info("Server started on port 3333");
});

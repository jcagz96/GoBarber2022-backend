import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersRegistrationController from '../controllers/UsersRegistrationController';
import { celebrate, Joi, Segments } from 'celebrate';

interface User {
  name: string;
  password?: string;
}

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const usersRegistrationController = new UsersRegistrationController();

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

usersRouter.post(
  '/registrationToken',
  ensureAuthenticated,
  usersRegistrationController.create
);

export default usersRouter;

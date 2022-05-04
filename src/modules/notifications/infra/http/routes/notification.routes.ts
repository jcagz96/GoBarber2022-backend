import { Router } from 'express';
import NotificationController from '../controllers/NotificationController';
import { celebrate, Segments, Joi } from 'celebrate';


const notificationRouter = Router();
const notificationController = new NotificationController();

notificationRouter.post('/push-notification/:user_id', celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required()
  },
  [Segments.BODY]: {
    title: Joi.string().required(),
    message: Joi.string().required()
  }
}), notificationController.create);

notificationRouter.post('/push-notification/:user_id/switch', celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required()
  },
  [Segments.BODY]: {
    enabled: Joi.boolean().required(),
  }
}), notificationController.enableDisableNotifications);

export default notificationRouter;

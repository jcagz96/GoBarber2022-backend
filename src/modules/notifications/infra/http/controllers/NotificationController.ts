
import { Request, Response } from 'express';
import SendPushNotificationService from '@modules/notifications/services/SendPushNotificationService';
import EnableDisablePushNotificationService from '@modules/notifications/services/EnableDisablePushNotificationService';
import { container } from 'tsyringe';

export default class SendNotificationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, message } = request.body;
    const { user_id } = request.params;

    const sendPushNotificationService: SendPushNotificationService = container.resolve(SendPushNotificationService);

    await sendPushNotificationService.execute({
      user_id,
      title,
      message
    });

    return response.status(204).json();
  }

  public async enableDisableNotifications(request: Request, response: Response): Promise<Response> {
    const { enabled } = request.body;
    const enabledAux: boolean = enabled;
    const { user_id } = request.params;

    const enableDisablePushNotificationService: EnableDisablePushNotificationService = container.resolve(EnableDisablePushNotificationService);

    await enableDisablePushNotificationService.execute({
      user_id,
      enabled
    });

    return response.status(204).json();
  }
}

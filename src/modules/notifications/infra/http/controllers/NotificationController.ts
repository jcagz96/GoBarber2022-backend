
import { Request, Response } from 'express';

import SendPushNotificationService from '@modules/notifications/services/SendPushNotificationService';
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
}

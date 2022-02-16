import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({ recipient_id, content }: ICreateNotificationDTO): Promise<Notification> {
    const notification: Notification = new Notification();
    notification.content = content;
    notification.recipient_id = recipient_id;
    this.notifications.push(notification);
    return notification;
  }


}

export default FakeNotificationsRepository;

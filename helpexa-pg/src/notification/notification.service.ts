import { Injectable } from '@nestjs/common';
import { NotificationItem } from './notification.model';

@Injectable()
export class NotificationService {
  private items: NotificationItem[] = [
    { id: 'notification-1', title: 'Sample NotificationItem 1' },
    { id: 'notification-2', title: 'Sample NotificationItem 2' },
  ];

  getNotificationItems(): NotificationItem[] {
    return this.items;
  }
}

import { Resolver, Query } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationItem } from './notification.model';

@Resolver(() => NotificationItem)
export class NotificationResolver {
  constructor(private readonly service: NotificationService) {}

  @Query(() => [NotificationItem], { name: 'notificationItems' })
  getNotificationItems() {
    return this.service.getNotificationItems();
  }
}

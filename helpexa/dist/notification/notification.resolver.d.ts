import { NotificationService } from './notification.service';
import { NotificationItem } from './notification.model';
export declare class NotificationResolver {
    private readonly service;
    constructor(service: NotificationService);
    getNotificationItems(): NotificationItem[];
}

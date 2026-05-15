import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class ItsmTicket extends BaseEntity {
    category: string;
    priority: string;
    subject: string;
    description: string;
    status: string;
    assignedTo: string;
    openDate: string;
    closeDate: string;
    user: User;
}

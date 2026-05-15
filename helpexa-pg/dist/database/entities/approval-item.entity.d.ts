import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class ApprovalItem extends BaseEntity {
    title: string;
    requestor: string;
    status: string;
    user: User;
}

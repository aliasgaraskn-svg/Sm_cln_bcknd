import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class HrRequest extends BaseEntity {
    title: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
    type: string;
    user: User;
}

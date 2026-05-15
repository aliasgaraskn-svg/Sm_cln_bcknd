import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class Course extends BaseEntity {
    title: string;
    provider: string;
    duration: string;
    status: string;
    user: User;
}

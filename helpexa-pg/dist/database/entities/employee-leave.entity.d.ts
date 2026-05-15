import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class EmployeeLeave extends BaseEntity {
    casual_allowance: number;
    sick_allowance: number;
    earned_allowance: number;
    user: User;
}

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class ExpenseItem extends BaseEntity {
    title: string;
    status: string;
    amount: string;
    user: User;
}

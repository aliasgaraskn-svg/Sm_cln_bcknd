import { BaseEntity } from './base.entity';
export declare class User extends BaseEntity {
    username: string;
    password: string;
    role: string;
    isActive: boolean;
}

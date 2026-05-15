import { User } from '../database/entities/user.entity';
export declare class LoginInput {
    username: string;
    password: string;
}
export declare class AuthPayload {
    user: User;
    token: string;
}

import { User } from './user.entity';
export declare class UserSession {
    id: string;
    sessionId: string;
    user: User;
    createdAt: Date;
    isActive: boolean;
}

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class ChatMessage extends BaseEntity {
    role: string;
    text: string;
    toolsUsed: string[];
    user: User;
}

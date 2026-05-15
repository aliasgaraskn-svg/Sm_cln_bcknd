import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { UserSession } from '../database/entities/session.entity';
import { LoginInput, AuthPayload } from './auth.model';
export declare class AuthService {
    private userRepository;
    private sessionRepository;
    constructor(userRepository: Repository<User>, sessionRepository: Repository<UserSession>);
    getUserById(id: string): Promise<User | null>;
    login(input: LoginInput, externalSessionId: string): Promise<AuthPayload>;
    logout(sessionId: string): Promise<void>;
}

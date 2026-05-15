import { AuthService } from './auth.service';
import { LoginInput, AuthPayload } from './auth.model';
import { User } from '../database/entities/user.entity';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: LoginInput, context: any): Promise<AuthPayload>;
    me(context: any): Promise<User | null>;
    logout(context: any): Promise<unknown>;
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { UserSession } from '../database/entities/session.entity';
import { LoginInput, AuthPayload } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private sessionRepository: Repository<UserSession>,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async login(input: LoginInput, externalSessionId: string): Promise<AuthPayload> {
    const user = await this.userRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username: input.username })
      .getOne();

    if (!user || user.password !== input.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check active sessions
    const activeSessions = await this.sessionRepository.find({
      where: { user: { id: user.id }, isActive: true },
      order: { createdAt: 'ASC' },
    });

    const maxSessions = parseInt(process.env.MAX_SESSIONS || '5', 10);

    if (activeSessions.length >= maxSessions) {
      // Invalidate the oldest session to make room
      const oldestSession = activeSessions[0];
      oldestSession.isActive = false;
      await this.sessionRepository.save(oldestSession);
    }

    // Create new session entry
    const newSession = this.sessionRepository.create({
      sessionId: externalSessionId,
      user,
      isActive: true,
    });
    await this.sessionRepository.save(newSession);

    return {
      user,
      token: 'session_active', // Using session-based auth, token is mock
    };
  }

  async logout(sessionId: string) {
    const session = await this.sessionRepository.findOne({ where: { sessionId } });
    if (session) {
      session.isActive = false;
      await this.sessionRepository.save(session);
    }
  }
}

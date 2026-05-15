import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserSession } from '../database/entities/session.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSession])],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}

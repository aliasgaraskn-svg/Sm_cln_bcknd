import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrResolver } from './hr.resolver';
import { HrService } from './hr.service';
import { HrRequest } from '../database/entities/hr-request.entity';
import { LeaveBalance } from '../database/entities/leave-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrRequest, LeaveBalance])],
  providers: [HrResolver, HrService],
  exports: [HrService],
})
export class HrModule {}

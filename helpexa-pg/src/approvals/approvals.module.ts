import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalsResolver } from './approvals.resolver';
import { ApprovalsService } from './approvals.service';
import { ApprovalItem } from '../database/entities/approval-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalItem])],
  providers: [ApprovalsResolver, ApprovalsService],
  exports: [ApprovalsService],
})
export class ApprovalsModule {}

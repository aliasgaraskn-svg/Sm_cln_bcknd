import { Module } from '@nestjs/common';
import { ApprovalsResolver } from './approvals.resolver';
import { ApprovalsService } from './approvals.service';

@Module({
  providers: [ApprovalsResolver, ApprovalsService],
})
export class ApprovalsModule {}

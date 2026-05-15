import { Resolver, Query, Context } from '@nestjs/graphql';
import { ApprovalsService } from './approvals.service';
import { ApprovalItem } from '../database/entities/approval-item.entity';

@Resolver(() => ApprovalItem)
export class ApprovalsResolver {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Query(() => [ApprovalItem], { name: 'approvalItems' })
  async getApprovalItems(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.approvalsService.getApprovalItems(userId);
  }
}

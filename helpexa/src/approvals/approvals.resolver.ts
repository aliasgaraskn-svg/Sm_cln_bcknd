import { Resolver, Query } from '@nestjs/graphql';
import { ApprovalsService } from './approvals.service';
import { ApprovalItem } from './approvals.model';

@Resolver(() => ApprovalItem)
export class ApprovalsResolver {
  constructor(private readonly service: ApprovalsService) {}

  @Query(() => [ApprovalItem], { name: 'approvals' })
  getApprovals() {
    return this.service.getApprovals();
  }
}

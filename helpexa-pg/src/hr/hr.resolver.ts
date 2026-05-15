import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { HrService } from './hr.service';
import { HrRequest } from '../database/entities/hr-request.entity';
import { HrDashboard, ApplyLeaveInput } from './hr.model';

@Resolver()
export class HrResolver {
  constructor(private readonly hrService: HrService) {}

  @Query(() => [HrRequest], { name: 'hrRequests' })
  async getHrRequests(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.hrService.getHrRequests(userId);
  }

  @Query(() => HrDashboard, { name: 'hrDashboard' })
  async getHrDashboard(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.hrService.getHrDashboardData(userId);
  }

  @Mutation(() => HrRequest)
  async applyLeave(
    @Args('input') input: ApplyLeaveInput,
    @Context() context: any,
  ) {
    const userId = context.req.session.userId;
    return this.hrService.applyLeave(input, userId);
  }
}

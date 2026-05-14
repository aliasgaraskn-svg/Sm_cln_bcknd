import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HrService } from './hr.service';
import { HrRequest, HrDashboard, ApplyLeaveInput } from './hr.model';

@Resolver()
export class HrResolver {
  constructor(private readonly hrService: HrService) {}

  @Query(() => [HrRequest], { name: 'hrRequests' })
  getHrRequests() {
    return this.hrService.getHrRequests();
  }

  @Query(() => HrDashboard, { name: 'hrDashboard' })
  getHrDashboard() {
    return this.hrService.getHrDashboard();
  }

  @Mutation(() => HrRequest)
  applyLeave(@Args('input') input: ApplyLeaveInput) {
    return this.hrService.applyLeave(input);
  }
}



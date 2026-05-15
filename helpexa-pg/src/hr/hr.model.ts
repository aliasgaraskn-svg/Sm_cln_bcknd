import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { HrRequest } from '../database/entities/hr-request.entity';

@ObjectType()
export class LeaveBalance {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  casual: number;

  @Field(() => Number)
  sick: number;

  @Field(() => Number)
  earned: number;
}

@ObjectType()
export class AttendanceStats {
  @Field(() => Number)
  workedHours: number;

  @Field(() => Number)
  targetHours: number;
}

@ObjectType()
export class HrDashboard {
  @Field(() => LeaveBalance)
  leaveBalance: LeaveBalance;

  @Field(() => AttendanceStats)
  attendance: AttendanceStats;

  @Field(() => [HrRequest])
  recentRequests: HrRequest[];
}

@InputType()
export class ApplyLeaveInput {
  @Field(() => String)
  type: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String, { nullable: true })
  reason?: string;

  @Field(() => String)
  contact: string;
}

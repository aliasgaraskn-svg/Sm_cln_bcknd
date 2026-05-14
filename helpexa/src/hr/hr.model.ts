import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class HrRequest {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  date: string;
}

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
  fromDate: string;

  @Field(() => String)
  toDate: string;

  @Field(() => String, { nullable: true })
  reason?: string;

  @Field(() => String)
  contact: string;
}

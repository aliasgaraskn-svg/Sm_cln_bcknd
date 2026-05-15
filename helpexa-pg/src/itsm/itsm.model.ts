import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { ItsmTicket } from '../database/entities/itsm-ticket.entity';

@ObjectType()
export class ItsmStats {
  @Field(() => Number)
  openCount: number;

  @Field(() => Number)
  inProgressCount: number;

  @Field(() => Number)
  resolvedYtd: number;

  @Field(() => String)
  avgResolutionTime: string;
}

@ObjectType()
export class Asset {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;
}

@ObjectType()
export class ItsmDashboard {
  @Field(() => ItsmStats)
  stats: ItsmStats;

  @Field(() => [ItsmTicket])
  recentTickets: ItsmTicket[];

  @Field(() => [Asset])
  myAssets: Asset[];
}

@InputType()
export class CreateTicketInput {
  @Field(() => String)
  category: string;

  @Field(() => String)
  priority: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  description: string;
}

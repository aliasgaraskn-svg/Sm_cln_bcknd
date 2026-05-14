import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItsmTicket {
  @Field(() => String)
  id: string;

  @Field(() => String)
  issue: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  assignedTo: string;
}

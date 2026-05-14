import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApprovalItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  requestor: string;
}

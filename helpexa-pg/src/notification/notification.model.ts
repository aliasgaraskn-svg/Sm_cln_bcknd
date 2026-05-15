import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}

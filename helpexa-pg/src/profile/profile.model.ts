import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}

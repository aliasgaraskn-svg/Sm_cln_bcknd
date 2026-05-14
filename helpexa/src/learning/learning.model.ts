import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}

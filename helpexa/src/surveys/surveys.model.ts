import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SurveyItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  deadline: string;
}

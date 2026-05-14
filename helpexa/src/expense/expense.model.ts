import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExpenseItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}

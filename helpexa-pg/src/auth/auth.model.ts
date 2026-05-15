import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { User } from '../database/entities/user.entity';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}

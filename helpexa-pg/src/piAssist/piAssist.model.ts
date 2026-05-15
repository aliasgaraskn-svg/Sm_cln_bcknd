import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AiResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}

@ObjectType()
export class AgentResponse {
  @Field(() => String)
  text: string;

  @Field(() => [String], { nullable: true })
  toolsUsed?: string[];
}


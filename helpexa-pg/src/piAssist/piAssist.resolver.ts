import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { PiAssistService } from './piAssist.service';
import { AgentResponse } from './piAssist.model';
import { ChatMessage } from '../database/entities/chat-message.entity';

@Resolver()
export class PiAssistResolver {
  constructor(
    private readonly service: PiAssistService,
  ) {}

  @Query(() => [ChatMessage], { name: 'chatHistory' })
  async getChatHistory(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.service.getChatHistory(userId);
  }

  @Query(() => AgentResponse, { name: 'askAgent' })
  async askAgent(
    @Args('prompt') prompt: string,
    @Context() context: any,
  ) {
    const userId = context.req.session.userId;
    return this.service.askAgent(prompt, userId);
  }
}

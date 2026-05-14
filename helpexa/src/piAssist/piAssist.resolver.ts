import { Resolver, Query, Args } from '@nestjs/graphql';
import { PiAssistService } from './piAssist.service';
import { AgentService } from './agent.service';
import { AiResponse, AgentResponse } from './piAssist.model';

@Resolver()
export class PiAssistResolver {
  constructor(
    private readonly service: PiAssistService,
    private readonly agentService: AgentService,
  ) {}

  @Query(() => [AiResponse], { name: 'piAssistItems' })
  getAiResponses() {
    return this.service.getAiResponses();
  }

  @Query(() => AgentResponse, { name: 'askAgent' })
  async askAgent(@Args('prompt') prompt: string) {
    return this.agentService.processRequest(prompt);
  }
}


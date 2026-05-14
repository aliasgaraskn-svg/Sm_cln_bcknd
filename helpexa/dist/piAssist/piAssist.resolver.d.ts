import { PiAssistService } from './piAssist.service';
import { AgentService } from './agent.service';
import { AiResponse, AgentResponse } from './piAssist.model';
export declare class PiAssistResolver {
    private readonly service;
    private readonly agentService;
    constructor(service: PiAssistService, agentService: AgentService);
    getAiResponses(): AiResponse[];
    askAgent(prompt: string): Promise<AgentResponse>;
}

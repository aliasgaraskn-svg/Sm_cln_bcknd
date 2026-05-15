import { Repository } from 'typeorm';
import { ChatMessage } from '../database/entities/chat-message.entity';
import { AgentService } from './agent.service';
import { AgentResponse } from './piAssist.model';
export declare class PiAssistService {
    private chatRepository;
    private readonly agentService;
    constructor(chatRepository: Repository<ChatMessage>, agentService: AgentService);
    getChatHistory(userId: string): Promise<ChatMessage[]>;
    askAgent(prompt: string, userId: string): Promise<AgentResponse>;
}

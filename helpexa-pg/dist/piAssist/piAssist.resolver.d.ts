import { PiAssistService } from './piAssist.service';
import { AgentResponse } from './piAssist.model';
import { ChatMessage } from '../database/entities/chat-message.entity';
export declare class PiAssistResolver {
    private readonly service;
    constructor(service: PiAssistService);
    getChatHistory(context: any): Promise<ChatMessage[]>;
    askAgent(prompt: string, context: any): Promise<AgentResponse>;
}

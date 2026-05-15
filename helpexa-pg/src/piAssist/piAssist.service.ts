import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '../database/entities/chat-message.entity';
import { AgentService } from './agent.service';
import { AgentResponse } from './piAssist.model';

@Injectable()
export class PiAssistService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepository: Repository<ChatMessage>,
    private readonly agentService: AgentService,
  ) {}

  async getChatHistory(userId: string): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      where: { user: { id: userId } },
      order: { create_datetime: 'ASC' }
    });
  }

  async askAgent(prompt: string, userId: string): Promise<AgentResponse> {
    // 1. Save User Message
    await this.chatRepository.save({
      role: 'user',
      text: prompt,
      user: { id: userId } as any
    });

    // 2. Process with AI
    const response = await this.agentService.processRequest(prompt, userId);

    // 3. Save AI Message
    await this.chatRepository.save({
      role: 'ai',
      text: response.text,
      toolsUsed: response.toolsUsed,
      user: { id: userId } as any
    });

    return response;
  }
}

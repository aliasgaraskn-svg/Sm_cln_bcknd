import { Injectable } from '@nestjs/common';
import { AiResponse } from './piAssist.model';

@Injectable()
export class PiAssistService {
  private items: AiResponse[] = [
    { id: 'piAssist-1', title: 'Sample AiResponse 1' },
    { id: 'piAssist-2', title: 'Sample AiResponse 2' },
  ];

  getAiResponses(): AiResponse[] {
    return this.items;
  }
}

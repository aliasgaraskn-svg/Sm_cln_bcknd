import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';
import { HrService } from '../hr/hr.service';
import { ItsmService } from '../itsm/itsm.service';
import { ExpenseService } from '../expense/expense.service';
import { LearningService } from '../learning/learning.service';
import { AgentResponse } from './piAssist.model';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

@Injectable()
export class AgentService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;

  private activeChat: ChatSession | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly hrService: HrService,
    private readonly itsmService: ItsmService,
    private readonly expenseService: ExpenseService,
    private readonly learningService: LearningService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        tools: [{
          functionDeclarations: [
            { name: 'get_hr_requests', description: 'Fetch ALL HR requests (pending and historical) with dates and status. Use this to count leaves or find history.' },
            { name: 'get_it_tickets', description: 'Fetch all active and past IT helpdesk tickets and asset requests.' },
            { name: 'get_expenses', description: 'Fetch all pending and processed expense claims.' },
            { name: 'get_hr_dashboard', description: 'Fetch HR dashboard data including current leave balances and attendance stats.' },
            { name: 'get_learning_courses', description: 'Fetch all available and enrolled training courses.' }
          ]
        }]
      });
      // Initialize a long-lived chat session for context memory
      this.activeChat = this.model.startChat();
    }
  }

  async processRequest(prompt: string): Promise<AgentResponse> {
    const useRealAI = this.configService.get<string>('USE_REAL_AI') === 'true';
    
    if (useRealAI && this.model) {
      return this.processRealGemini(prompt);
    } else {
      return this.processSimulated(prompt);
    }
  }

  private async processRealGemini(prompt: string): Promise<AgentResponse> {
    if (!this.model || !this.activeChat) throw new Error('AI Model not initialized');
    
    // Send message to the ACTIVE session to maintain history
    const result = await this.activeChat.sendMessage(prompt);
    const response = await result.response;
    
    const toolsUsed: string[] = [];
    let text = '';

    try {
      text = response.text();
    } catch (e) {
      text = '';
    }

    const candidate = response.candidates?.[0];
    const calls = candidate?.content?.parts?.filter((p: any) => p.functionCall) || [];
    
    if (calls.length > 0) {
      const toolResponses = [];
      for (const call of calls) {
        const functionCall = (call as any).functionCall;
        toolsUsed.push(functionCall.name.toUpperCase());
        let toolData;
        if (functionCall.name === 'get_hr_requests') toolData = this.hrService.getHrRequests();
        else if (functionCall.name === 'get_it_tickets') toolData = this.itsmService.getItsmTickets();
        else if (functionCall.name === 'get_expenses') toolData = this.expenseService.getExpenseItems();
        else if (functionCall.name === 'get_hr_dashboard') toolData = this.hrService.getHrDashboard();
        else if (functionCall.name === 'get_learning_courses') toolData = this.learningService.getCourses();

        toolResponses.push({
          functionResponse: { name: functionCall.name, response: { content: toolData } }
        });
      }
      // Continue the same session with tool outputs
      const finalResult = await this.activeChat.sendMessage(toolResponses);
      text = finalResult.response.text();
    }

    return { text, toolsUsed };
  }

  private async processSimulated(prompt: string): Promise<AgentResponse> {
    const input = prompt.toLowerCase();
    const toolsUsed: string[] = [];
    let text = '';

    if (input.includes('hr') || input.includes('leave')) {
      toolsUsed.push('GET_HR_REQUESTS');
      const data = this.hrService.getHrRequests();
      text += `• Found ${data.length} HR requests (Latest: ${data[0].title}, Status: ${data[0].status})\n`;
    }

    if (input.includes('it') || input.includes('ticket') || input.includes('helpdesk')) {
      toolsUsed.push('GET_IT_TICKETS');
      const data = this.itsmService.getItsmTickets();
      text += `• Found ${data.length} IT tickets (Latest: ${data[0].subject}, Assigned: ${data[0].assignedTo})\n`;
    }

    if (input.includes('expense') || input.includes('travel')) {
      toolsUsed.push('GET_EXPENSES');
      const data = this.expenseService.getExpenseItems();
      text += `• Found ${data.length} expenses (Latest: ${data[0].title})\n`;
    }

    if (text === '') {
      text = "I'm Helpexa, your Agentic Assistant. Currently operating in **Offline Simulation Mode** due to network restrictions. I can still access your HR, IT, and Expense data locally!";
    } else {
      text = `[SIMULATED AGENT REASONING]\nI've accessed your enterprise data through local tools:\n\n${text}\nHow can I help you further with these items?`;
    }

    await new Promise(r => setTimeout(r, 1200));
    return { text, toolsUsed };
  }
}

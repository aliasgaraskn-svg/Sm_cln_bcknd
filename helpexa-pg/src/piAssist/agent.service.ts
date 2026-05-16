import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel, ChatSession, SchemaType } from '@google/generative-ai';
import { HrService } from '../hr/hr.service';
import { ItsmService } from '../itsm/itsm.service';
import { ExpenseService } from '../expense/expense.service';
import { LearningService } from '../learning/learning.service';
import { ApprovalsService } from '../approvals/approvals.service';
import { AgentResponse } from './piAssist.model';

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
    private readonly approvalsService: ApprovalsService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: `You are Helpexa AI, a premium enterprise assistant. 
        Keep responses professional, concise, and helpful.
        When you successfully perform an action like applying for leave or creating a ticket, ALWAYS provide a link to the relevant section using markdown.
        For HR actions, include: [View in HRMS](/hrms).
        For IT tickets, include: [View in ITSM](/itsm).
        Always use markdown for formatting.`,
        tools: [{
          functionDeclarations: [
            { name: 'get_hr_requests', description: 'Fetch ALL HR requests for the user.' },
            { name: 'get_it_tickets', description: 'Fetch all IT helpdesk tickets for the user.' },
            { name: 'get_expenses', description: 'Fetch all expense claims for the user.' },
            { name: 'get_hr_dashboard', description: 'Fetch HR dashboard (balances/attendance).' },
            { name: 'get_learning_courses', description: 'Fetch all training courses.' },
            { name: 'get_approvals', description: 'Fetch all pending approvals.' },
            {
              name: 'apply_leave',
              description: 'Create a NEW leave request for the user.',
              parameters: {
                type: SchemaType.OBJECT,
                properties: {
                  type: { type: SchemaType.STRING, description: 'Type of leave (Casual, Sick, Earned)' },
                  startDate: { type: SchemaType.STRING, description: 'Start date in YYYY-MM-DD format' },
                  endDate: { type: SchemaType.STRING, description: 'End date in YYYY-MM-DD format' },
                  reason: { type: SchemaType.STRING, description: 'Optional reason for leave' },
                  contact: { type: SchemaType.STRING, description: 'Emergency contact number' }
                },
                required: ['type', 'startDate', 'endDate']
              }
            },
            {
              name: 'create_it_ticket',
              description: 'Create a NEW IT support ticket for hardware, software, or access issues.',
              parameters: {
                type: SchemaType.OBJECT,
                properties: {
                  category: { type: SchemaType.STRING, description: 'Category (Hardware, Software, Access, Network)' },
                  priority: { type: SchemaType.STRING, description: 'Priority (Low, Medium, High, Urgent)' },
                  subject: { type: SchemaType.STRING, description: 'Short summary of the issue' },
                  description: { type: SchemaType.STRING, description: 'Detailed explanation' }
                },
                required: ['category', 'priority', 'subject', 'description']
              }
            }
          ]
        }]
      });
      this.activeChat = this.model.startChat();
    }
  }

  async processRequest(prompt: string, userId?: string): Promise<AgentResponse> {
    const useRealAI = this.configService.get<string>('USE_REAL_AI') === 'true';

    if (useRealAI && this.model) {
      return this.processRealGemini(prompt, userId);
    } else {
      return this.processSimulated(prompt, userId);
    }
  }

  private async processRealGemini(prompt: string, userId?: string): Promise<AgentResponse> {
    if (!this.model || !this.activeChat) throw new Error('AI Model not initialized');

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
        const uid = userId || '';

        if (functionCall.name === 'get_hr_requests') toolData = await this.hrService.getHrRequests(uid);
        else if (functionCall.name === 'get_it_tickets') toolData = await this.itsmService.getItsmTickets(uid);
        else if (functionCall.name === 'get_expenses') toolData = await this.expenseService.getExpenseItems(uid);
        else if (functionCall.name === 'get_hr_dashboard') toolData = await this.hrService.getHrDashboardData(uid);
        else if (functionCall.name === 'get_learning_courses') toolData = await this.learningService.getMyCourses(uid);
        else if (functionCall.name === 'get_approvals') toolData = await this.approvalsService.getApprovalItems(uid);
        else if (functionCall.name === 'apply_leave') {
          const args = functionCall.args;
          toolData = await this.hrService.applyLeave({
            type: args.type,
            startDate: args.startDate,
            endDate: args.endDate,
            reason: args.reason || 'Requested via AI',
            contact: args.contact || 'N/A'
          }, uid);
        } else if (functionCall.name === 'create_it_ticket') {
          const args = functionCall.args;
          toolData = await this.itsmService.createTicket({
            category: args.category,
            priority: args.priority,
            subject: args.subject,
            description: args.description
          }, uid);
        }

        toolResponses.push({
          functionResponse: { name: functionCall.name, response: { content: toolData } }
        });
      }
      const finalResult = await this.activeChat.sendMessage(toolResponses);
      text = finalResult.response.text();
    }

    return { text, toolsUsed };
  }

  private async processSimulated(prompt: string, userId?: string): Promise<AgentResponse> {
    const input = prompt.toLowerCase();
    const toolsUsed: string[] = [];
    let text = '';
    const uid = userId || '';

    if (input.includes('apply') && (input.includes('leave') || input.includes('casual'))) {
      toolsUsed.push('APPLY_LEAVE');
      const data = await this.hrService.applyLeave({
        type: 'Casual',
        startDate: '2026-06-01',
        endDate: '2026-06-01',
        reason: 'Simulated AI Request',
        contact: '0000000000'
      }, uid);
      text = `I've successfully submitted your Casual leave request for June 1st, 2026.\n\n[View in HRMS](/hrms)`;
    } else if (input.includes('ticket') || input.includes('it issue')) {
      toolsUsed.push('CREATE_IT_TICKET');
      const data = await this.itsmService.createTicket({
        category: 'Software',
        priority: 'Medium',
        subject: 'Issue reported via AI',
        description: prompt
      }, uid);
      text = `I've raised an IT ticket for you regarding: "${data.subject}".\n\n[View in ITSM](/itsm)`;
    } else if (input.includes('hr') || input.includes('leave')) {
      toolsUsed.push('GET_HR_REQUESTS');
      const data = await this.hrService.getHrRequests(uid);
      text += `• Found ${data.length} HR requests (Latest: ${data[0]?.title}, Status: ${data[0]?.status})\n`;
    }

    if (text === '') {
      text = "How can I assist you with your enterprise requests today?";
    }

    await new Promise(r => setTimeout(r, 1000));
    return { text, toolsUsed };
  }
}

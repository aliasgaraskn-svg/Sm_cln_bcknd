import { ConfigService } from '@nestjs/config';
import { HrService } from '../hr/hr.service';
import { ItsmService } from '../itsm/itsm.service';
import { ExpenseService } from '../expense/expense.service';
import { LearningService } from '../learning/learning.service';
import { ApprovalsService } from '../approvals/approvals.service';
import { AgentResponse } from './piAssist.model';
export declare class AgentService {
    private readonly configService;
    private readonly hrService;
    private readonly itsmService;
    private readonly expenseService;
    private readonly learningService;
    private readonly approvalsService;
    private genAI;
    private model;
    private activeChat;
    constructor(configService: ConfigService, hrService: HrService, itsmService: ItsmService, expenseService: ExpenseService, learningService: LearningService, approvalsService: ApprovalsService);
    processRequest(prompt: string, userId?: string): Promise<AgentResponse>;
    private processRealGemini;
    private processSimulated;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
const hr_service_1 = require("../hr/hr.service");
const itsm_service_1 = require("../itsm/itsm.service");
const expense_service_1 = require("../expense/expense.service");
const learning_service_1 = require("../learning/learning.service");
const approvals_service_1 = require("../approvals/approvals.service");
let AgentService = class AgentService {
    configService;
    hrService;
    itsmService;
    expenseService;
    learningService;
    approvalsService;
    genAI = null;
    model = null;
    activeChat = null;
    constructor(configService, hrService, itsmService, expenseService, learningService, approvalsService) {
        this.configService = configService;
        this.hrService = hrService;
        this.itsmService = itsmService;
        this.expenseService = expenseService;
        this.learningService = learningService;
        this.approvalsService = approvalsService;
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (apiKey) {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
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
                                    type: generative_ai_1.SchemaType.OBJECT,
                                    properties: {
                                        type: { type: generative_ai_1.SchemaType.STRING, description: 'Type of leave (Casual, Sick, Earned)' },
                                        startDate: { type: generative_ai_1.SchemaType.STRING, description: 'Start date in YYYY-MM-DD format' },
                                        endDate: { type: generative_ai_1.SchemaType.STRING, description: 'End date in YYYY-MM-DD format' },
                                        reason: { type: generative_ai_1.SchemaType.STRING, description: 'Optional reason for leave' },
                                        contact: { type: generative_ai_1.SchemaType.STRING, description: 'Emergency contact number' }
                                    },
                                    required: ['type', 'startDate', 'endDate']
                                }
                            },
                            {
                                name: 'create_it_ticket',
                                description: 'Create a NEW IT support ticket for hardware, software, or access issues.',
                                parameters: {
                                    type: generative_ai_1.SchemaType.OBJECT,
                                    properties: {
                                        category: { type: generative_ai_1.SchemaType.STRING, description: 'Category (Hardware, Software, Access, Network)' },
                                        priority: { type: generative_ai_1.SchemaType.STRING, description: 'Priority (Low, Medium, High, Urgent)' },
                                        subject: { type: generative_ai_1.SchemaType.STRING, description: 'Short summary of the issue' },
                                        description: { type: generative_ai_1.SchemaType.STRING, description: 'Detailed explanation' }
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
    async processRequest(prompt, userId) {
        const useRealAI = this.configService.get('USE_REAL_AI') === 'true';
        if (useRealAI && this.model) {
            return this.processRealGemini(prompt, userId);
        }
        else {
            return this.processSimulated(prompt, userId);
        }
    }
    async processRealGemini(prompt, userId) {
        if (!this.model || !this.activeChat)
            throw new Error('AI Model not initialized');
        const result = await this.activeChat.sendMessage(prompt);
        const response = await result.response;
        const toolsUsed = [];
        let text = '';
        try {
            text = response.text();
        }
        catch (e) {
            text = '';
        }
        const candidate = response.candidates?.[0];
        const calls = candidate?.content?.parts?.filter((p) => p.functionCall) || [];
        if (calls.length > 0) {
            const toolResponses = [];
            for (const call of calls) {
                const functionCall = call.functionCall;
                toolsUsed.push(functionCall.name.toUpperCase());
                let toolData;
                const uid = userId || '';
                if (functionCall.name === 'get_hr_requests')
                    toolData = await this.hrService.getHrRequests(uid);
                else if (functionCall.name === 'get_it_tickets')
                    toolData = await this.itsmService.getItsmTickets(uid);
                else if (functionCall.name === 'get_expenses')
                    toolData = await this.expenseService.getExpenseItems(uid);
                else if (functionCall.name === 'get_hr_dashboard')
                    toolData = await this.hrService.getHrDashboardData(uid);
                else if (functionCall.name === 'get_learning_courses')
                    toolData = await this.learningService.getMyCourses(uid);
                else if (functionCall.name === 'get_approvals')
                    toolData = await this.approvalsService.getApprovalItems(uid);
                else if (functionCall.name === 'apply_leave') {
                    const args = functionCall.args;
                    toolData = await this.hrService.applyLeave({
                        type: args.type,
                        startDate: args.startDate,
                        endDate: args.endDate,
                        reason: args.reason || 'Requested via AI',
                        contact: args.contact || 'N/A'
                    }, uid);
                }
                else if (functionCall.name === 'create_it_ticket') {
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
    async processSimulated(prompt, userId) {
        const input = prompt.toLowerCase();
        const toolsUsed = [];
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
        }
        else if (input.includes('ticket') || input.includes('it issue')) {
            toolsUsed.push('CREATE_IT_TICKET');
            const data = await this.itsmService.createTicket({
                category: 'Software',
                priority: 'Medium',
                subject: 'Issue reported via AI',
                description: prompt
            }, uid);
            text = `I've raised an IT ticket for you regarding: "${data.subject}".\n\n[View in ITSM](/itsm)`;
        }
        else if (input.includes('hr') || input.includes('leave')) {
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
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        hr_service_1.HrService,
        itsm_service_1.ItsmService,
        expense_service_1.ExpenseService,
        learning_service_1.LearningService,
        approvals_service_1.ApprovalsService])
], AgentService);
//# sourceMappingURL=agent.service.js.map
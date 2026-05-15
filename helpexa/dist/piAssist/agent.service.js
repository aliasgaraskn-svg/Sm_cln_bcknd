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
let AgentService = class AgentService {
    configService;
    hrService;
    itsmService;
    expenseService;
    learningService;
    genAI = null;
    model = null;
    activeChat = null;
    constructor(configService, hrService, itsmService, expenseService, learningService) {
        this.configService = configService;
        this.hrService = hrService;
        this.itsmService = itsmService;
        this.expenseService = expenseService;
        this.learningService = learningService;
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (apiKey) {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
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
            this.activeChat = this.model.startChat();
        }
    }
    async processRequest(prompt) {
        const useRealAI = this.configService.get('USE_REAL_AI') === 'true';
        if (useRealAI && this.model) {
            return this.processRealGemini(prompt);
        }
        else {
            return this.processSimulated(prompt);
        }
    }
    async processRealGemini(prompt) {
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
                if (functionCall.name === 'get_hr_requests')
                    toolData = this.hrService.getHrRequests();
                else if (functionCall.name === 'get_it_tickets')
                    toolData = this.itsmService.getItsmTickets();
                else if (functionCall.name === 'get_expenses')
                    toolData = this.expenseService.getExpenseItems();
                else if (functionCall.name === 'get_hr_dashboard')
                    toolData = this.hrService.getHrDashboard();
                else if (functionCall.name === 'get_learning_courses')
                    toolData = this.learningService.getCourses();
                toolResponses.push({
                    functionResponse: { name: functionCall.name, response: { content: toolData } }
                });
            }
            const finalResult = await this.activeChat.sendMessage(toolResponses);
            text = finalResult.response.text();
        }
        return { text, toolsUsed };
    }
    async processSimulated(prompt) {
        const input = prompt.toLowerCase();
        const toolsUsed = [];
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
        }
        else {
            text = `[SIMULATED AGENT REASONING]\nI've accessed your enterprise data through local tools:\n\n${text}\nHow can I help you further with these items?`;
        }
        await new Promise(r => setTimeout(r, 1200));
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
        learning_service_1.LearningService])
], AgentService);
//# sourceMappingURL=agent.service.js.map
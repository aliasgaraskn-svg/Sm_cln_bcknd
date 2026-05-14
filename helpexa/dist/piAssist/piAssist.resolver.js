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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiAssistResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const piAssist_service_1 = require("./piAssist.service");
const agent_service_1 = require("./agent.service");
const piAssist_model_1 = require("./piAssist.model");
let PiAssistResolver = class PiAssistResolver {
    service;
    agentService;
    constructor(service, agentService) {
        this.service = service;
        this.agentService = agentService;
    }
    getAiResponses() {
        return this.service.getAiResponses();
    }
    async askAgent(prompt) {
        return this.agentService.processRequest(prompt);
    }
};
exports.PiAssistResolver = PiAssistResolver;
__decorate([
    (0, graphql_1.Query)(() => [piAssist_model_1.AiResponse], { name: 'piAssistItems' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PiAssistResolver.prototype, "getAiResponses", null);
__decorate([
    (0, graphql_1.Query)(() => piAssist_model_1.AgentResponse, { name: 'askAgent' }),
    __param(0, (0, graphql_1.Args)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PiAssistResolver.prototype, "askAgent", null);
exports.PiAssistResolver = PiAssistResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [piAssist_service_1.PiAssistService,
        agent_service_1.AgentService])
], PiAssistResolver);
//# sourceMappingURL=piAssist.resolver.js.map
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
exports.HrResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const hr_service_1 = require("./hr.service");
const hr_request_entity_1 = require("../database/entities/hr-request.entity");
const hr_model_1 = require("./hr.model");
let HrResolver = class HrResolver {
    hrService;
    constructor(hrService) {
        this.hrService = hrService;
    }
    async getHrRequests(context) {
        const userId = context.req.session.userId;
        return this.hrService.getHrRequests(userId);
    }
    async getHrDashboard(context) {
        const userId = context.req.session.userId;
        return this.hrService.getHrDashboardData(userId);
    }
    async applyLeave(input, context) {
        const userId = context.req.session.userId;
        return this.hrService.applyLeave(input, userId);
    }
};
exports.HrResolver = HrResolver;
__decorate([
    (0, graphql_1.Query)(() => [hr_request_entity_1.HrRequest], { name: 'hrRequests' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrResolver.prototype, "getHrRequests", null);
__decorate([
    (0, graphql_1.Query)(() => hr_model_1.HrDashboard, { name: 'hrDashboard' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrResolver.prototype, "getHrDashboard", null);
__decorate([
    (0, graphql_1.Mutation)(() => hr_request_entity_1.HrRequest),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_model_1.ApplyLeaveInput, Object]),
    __metadata("design:returntype", Promise)
], HrResolver.prototype, "applyLeave", null);
exports.HrResolver = HrResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [hr_service_1.HrService])
], HrResolver);
//# sourceMappingURL=hr.resolver.js.map
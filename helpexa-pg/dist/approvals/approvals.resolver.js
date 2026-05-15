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
exports.ApprovalsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const approvals_service_1 = require("./approvals.service");
const approval_item_entity_1 = require("../database/entities/approval-item.entity");
let ApprovalsResolver = class ApprovalsResolver {
    approvalsService;
    constructor(approvalsService) {
        this.approvalsService = approvalsService;
    }
    async getApprovalItems(context) {
        const userId = context.req.session.userId;
        return this.approvalsService.getApprovalItems(userId);
    }
};
exports.ApprovalsResolver = ApprovalsResolver;
__decorate([
    (0, graphql_1.Query)(() => [approval_item_entity_1.ApprovalItem], { name: 'approvalItems' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprovalsResolver.prototype, "getApprovalItems", null);
exports.ApprovalsResolver = ApprovalsResolver = __decorate([
    (0, graphql_1.Resolver)(() => approval_item_entity_1.ApprovalItem),
    __metadata("design:paramtypes", [approvals_service_1.ApprovalsService])
], ApprovalsResolver);
//# sourceMappingURL=approvals.resolver.js.map
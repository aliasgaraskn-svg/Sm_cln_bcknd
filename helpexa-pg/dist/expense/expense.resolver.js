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
exports.ExpenseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const expense_service_1 = require("./expense.service");
const expense_item_entity_1 = require("../database/entities/expense-item.entity");
let ExpenseResolver = class ExpenseResolver {
    expenseService;
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async getExpenseItems(context) {
        const userId = context.req.session.userId;
        return this.expenseService.getExpenseItems(userId);
    }
};
exports.ExpenseResolver = ExpenseResolver;
__decorate([
    (0, graphql_1.Query)(() => [expense_item_entity_1.ExpenseItem], { name: 'expenseItems' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "getExpenseItems", null);
exports.ExpenseResolver = ExpenseResolver = __decorate([
    (0, graphql_1.Resolver)(() => expense_item_entity_1.ExpenseItem),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseResolver);
//# sourceMappingURL=expense.resolver.js.map
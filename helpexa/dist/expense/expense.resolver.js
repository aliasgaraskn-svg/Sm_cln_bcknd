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
exports.ExpenseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const expense_service_1 = require("./expense.service");
const expense_model_1 = require("./expense.model");
let ExpenseResolver = class ExpenseResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    getExpenseItems() {
        return this.service.getExpenseItems();
    }
};
exports.ExpenseResolver = ExpenseResolver;
__decorate([
    (0, graphql_1.Query)(() => [expense_model_1.ExpenseItem], { name: 'expenseItems' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "getExpenseItems", null);
exports.ExpenseResolver = ExpenseResolver = __decorate([
    (0, graphql_1.Resolver)(() => expense_model_1.ExpenseItem),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseResolver);
//# sourceMappingURL=expense.resolver.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiAssistModule = void 0;
const common_1 = require("@nestjs/common");
const piAssist_resolver_1 = require("./piAssist.resolver");
const piAssist_service_1 = require("./piAssist.service");
const agent_service_1 = require("./agent.service");
const hr_module_1 = require("../hr/hr.module");
const itsm_module_1 = require("../itsm/itsm.module");
const expense_module_1 = require("../expense/expense.module");
const config_1 = require("@nestjs/config");
const learning_module_1 = require("../learning/learning.module");
let PiAssistModule = class PiAssistModule {
};
exports.PiAssistModule = PiAssistModule;
exports.PiAssistModule = PiAssistModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, hr_module_1.HrModule, itsm_module_1.ItsmModule, expense_module_1.ExpenseModule, learning_module_1.LearningModule],
        providers: [piAssist_resolver_1.PiAssistResolver, piAssist_service_1.PiAssistService, agent_service_1.AgentService],
    })
], PiAssistModule);
//# sourceMappingURL=piAssist.module.js.map
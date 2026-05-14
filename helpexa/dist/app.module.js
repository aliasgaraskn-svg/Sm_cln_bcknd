"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const hr_module_1 = require("./hr/hr.module");
const itsm_module_1 = require("./itsm/itsm.module");
const expense_module_1 = require("./expense/expense.module");
const learning_module_1 = require("./learning/learning.module");
const piAssist_module_1 = require("./piAssist/piAssist.module");
const notification_module_1 = require("./notification/notification.module");
const profile_module_1 = require("./profile/profile.module");
const approvals_module_1 = require("./approvals/approvals.module");
const surveys_module_1 = require("./surveys/surveys.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
            }),
            hr_module_1.HrModule,
            itsm_module_1.ItsmModule,
            expense_module_1.ExpenseModule,
            learning_module_1.LearningModule,
            piAssist_module_1.PiAssistModule,
            notification_module_1.NotificationModule,
            profile_module_1.ProfileModule,
            approvals_module_1.ApprovalsModule,
            surveys_module_1.SurveysModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
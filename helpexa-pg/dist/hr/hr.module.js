"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hr_resolver_1 = require("./hr.resolver");
const hr_service_1 = require("./hr.service");
const hr_request_entity_1 = require("../database/entities/hr-request.entity");
const leave_balance_entity_1 = require("../database/entities/leave-balance.entity");
let HrModule = class HrModule {
};
exports.HrModule = HrModule;
exports.HrModule = HrModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hr_request_entity_1.HrRequest, leave_balance_entity_1.LeaveBalance])],
        providers: [hr_resolver_1.HrResolver, hr_service_1.HrService],
        exports: [hr_service_1.HrService],
    })
], HrModule);
//# sourceMappingURL=hr.module.js.map
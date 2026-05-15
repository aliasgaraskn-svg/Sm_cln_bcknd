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
exports.ApplyLeaveInput = exports.HrDashboard = exports.AttendanceStats = exports.LeaveBalance = void 0;
const graphql_1 = require("@nestjs/graphql");
const hr_request_entity_1 = require("../database/entities/hr-request.entity");
let LeaveBalance = class LeaveBalance {
    total;
    casual;
    sick;
    earned;
};
exports.LeaveBalance = LeaveBalance;
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "casual", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "sick", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "earned", void 0);
exports.LeaveBalance = LeaveBalance = __decorate([
    (0, graphql_1.ObjectType)()
], LeaveBalance);
let AttendanceStats = class AttendanceStats {
    workedHours;
    targetHours;
};
exports.AttendanceStats = AttendanceStats;
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], AttendanceStats.prototype, "workedHours", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], AttendanceStats.prototype, "targetHours", void 0);
exports.AttendanceStats = AttendanceStats = __decorate([
    (0, graphql_1.ObjectType)()
], AttendanceStats);
let HrDashboard = class HrDashboard {
    leaveBalance;
    attendance;
    recentRequests;
};
exports.HrDashboard = HrDashboard;
__decorate([
    (0, graphql_1.Field)(() => LeaveBalance),
    __metadata("design:type", LeaveBalance)
], HrDashboard.prototype, "leaveBalance", void 0);
__decorate([
    (0, graphql_1.Field)(() => AttendanceStats),
    __metadata("design:type", AttendanceStats)
], HrDashboard.prototype, "attendance", void 0);
__decorate([
    (0, graphql_1.Field)(() => [hr_request_entity_1.HrRequest]),
    __metadata("design:type", Array)
], HrDashboard.prototype, "recentRequests", void 0);
exports.HrDashboard = HrDashboard = __decorate([
    (0, graphql_1.ObjectType)()
], HrDashboard);
let ApplyLeaveInput = class ApplyLeaveInput {
    type;
    startDate;
    endDate;
    reason;
    contact;
};
exports.ApplyLeaveInput = ApplyLeaveInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApplyLeaveInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApplyLeaveInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApplyLeaveInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ApplyLeaveInput.prototype, "reason", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApplyLeaveInput.prototype, "contact", void 0);
exports.ApplyLeaveInput = ApplyLeaveInput = __decorate([
    (0, graphql_1.InputType)()
], ApplyLeaveInput);
//# sourceMappingURL=hr.model.js.map
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
exports.CreateTicketInput = exports.ItsmDashboard = exports.Asset = exports.ItsmStats = exports.ItsmTicket = void 0;
const graphql_1 = require("@nestjs/graphql");
let ItsmTicket = class ItsmTicket {
    id;
    category;
    priority;
    subject;
    description;
    status;
    assignedTo;
    date;
};
exports.ItsmTicket = ItsmTicket;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "subject", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "assignedTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmTicket.prototype, "date", void 0);
exports.ItsmTicket = ItsmTicket = __decorate([
    (0, graphql_1.ObjectType)()
], ItsmTicket);
let ItsmStats = class ItsmStats {
    openCount;
    inProgressCount;
    resolvedYtd;
    avgResolutionTime;
};
exports.ItsmStats = ItsmStats;
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ItsmStats.prototype, "openCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ItsmStats.prototype, "inProgressCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ItsmStats.prototype, "resolvedYtd", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItsmStats.prototype, "avgResolutionTime", void 0);
exports.ItsmStats = ItsmStats = __decorate([
    (0, graphql_1.ObjectType)()
], ItsmStats);
let Asset = class Asset {
    id;
    name;
    type;
};
exports.Asset = Asset;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Asset.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Asset.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Asset.prototype, "type", void 0);
exports.Asset = Asset = __decorate([
    (0, graphql_1.ObjectType)()
], Asset);
let ItsmDashboard = class ItsmDashboard {
    stats;
    recentTickets;
    myAssets;
};
exports.ItsmDashboard = ItsmDashboard;
__decorate([
    (0, graphql_1.Field)(() => ItsmStats),
    __metadata("design:type", ItsmStats)
], ItsmDashboard.prototype, "stats", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ItsmTicket]),
    __metadata("design:type", Array)
], ItsmDashboard.prototype, "recentTickets", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Asset]),
    __metadata("design:type", Array)
], ItsmDashboard.prototype, "myAssets", void 0);
exports.ItsmDashboard = ItsmDashboard = __decorate([
    (0, graphql_1.ObjectType)()
], ItsmDashboard);
let CreateTicketInput = class CreateTicketInput {
    category;
    priority;
    subject;
    description;
};
exports.CreateTicketInput = CreateTicketInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTicketInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTicketInput.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTicketInput.prototype, "subject", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTicketInput.prototype, "description", void 0);
exports.CreateTicketInput = CreateTicketInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTicketInput);
//# sourceMappingURL=itsm.model.js.map
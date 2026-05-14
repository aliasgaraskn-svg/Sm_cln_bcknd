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
exports.ItsmResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const itsm_service_1 = require("./itsm.service");
const itsm_model_1 = require("./itsm.model");
let ItsmResolver = class ItsmResolver {
    itsmService;
    constructor(itsmService) {
        this.itsmService = itsmService;
    }
    getItsmTickets() {
        return this.itsmService.getItsmTickets();
    }
};
exports.ItsmResolver = ItsmResolver;
__decorate([
    (0, graphql_1.Query)(() => [itsm_model_1.ItsmTicket], { name: 'itsmTickets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItsmResolver.prototype, "getItsmTickets", null);
exports.ItsmResolver = ItsmResolver = __decorate([
    (0, graphql_1.Resolver)(() => itsm_model_1.ItsmTicket),
    __metadata("design:paramtypes", [itsm_service_1.ItsmService])
], ItsmResolver);
//# sourceMappingURL=itsm.resolver.js.map
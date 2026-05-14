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
exports.ProfileResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const profile_service_1 = require("./profile.service");
const profile_model_1 = require("./profile.model");
let ProfileResolver = class ProfileResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    getUserProfiles() {
        return this.service.getUserProfiles();
    }
};
exports.ProfileResolver = ProfileResolver;
__decorate([
    (0, graphql_1.Query)(() => [profile_model_1.UserProfile], { name: 'profileItems' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileResolver.prototype, "getUserProfiles", null);
exports.ProfileResolver = ProfileResolver = __decorate([
    (0, graphql_1.Resolver)(() => profile_model_1.UserProfile),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileResolver);
//# sourceMappingURL=profile.resolver.js.map
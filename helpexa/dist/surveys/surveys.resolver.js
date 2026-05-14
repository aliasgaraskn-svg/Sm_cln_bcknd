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
exports.SurveysResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const surveys_service_1 = require("./surveys.service");
const surveys_model_1 = require("./surveys.model");
let SurveysResolver = class SurveysResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    getSurveys() {
        return this.service.getSurveys();
    }
};
exports.SurveysResolver = SurveysResolver;
__decorate([
    (0, graphql_1.Query)(() => [surveys_model_1.SurveyItem], { name: 'surveys' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveysResolver.prototype, "getSurveys", null);
exports.SurveysResolver = SurveysResolver = __decorate([
    (0, graphql_1.Resolver)(() => surveys_model_1.SurveyItem),
    __metadata("design:paramtypes", [surveys_service_1.SurveysService])
], SurveysResolver);
//# sourceMappingURL=surveys.resolver.js.map
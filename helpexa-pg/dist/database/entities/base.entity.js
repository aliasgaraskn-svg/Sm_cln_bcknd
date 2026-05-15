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
exports.BaseEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let BaseEntity = class BaseEntity {
    id;
    create_datetime;
    update_datetime;
};
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_datetime' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BaseEntity.prototype, "create_datetime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_datetime' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BaseEntity.prototype, "update_datetime", void 0);
exports.BaseEntity = BaseEntity = __decorate([
    (0, graphql_1.ObjectType)()
], BaseEntity);
//# sourceMappingURL=base.entity.js.map
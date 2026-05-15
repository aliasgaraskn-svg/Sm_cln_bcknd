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
exports.ChatMessage = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let ChatMessage = class ChatMessage extends base_entity_1.BaseEntity {
    role;
    text;
    toolsUsed;
    user;
};
exports.ChatMessage = ChatMessage;
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChatMessage.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChatMessage.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ChatMessage.prototype, "toolsUsed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], ChatMessage.prototype, "user", void 0);
exports.ChatMessage = ChatMessage = __decorate([
    (0, typeorm_1.Entity)('chat_messages'),
    (0, graphql_1.ObjectType)()
], ChatMessage);
//# sourceMappingURL=chat-message.entity.js.map
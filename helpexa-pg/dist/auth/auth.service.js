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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const session_entity_1 = require("../database/entities/session.entity");
let AuthService = class AuthService {
    userRepository;
    sessionRepository;
    constructor(userRepository, sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }
    async getUserById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async login(input, externalSessionId) {
        const user = await this.userRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.username = :username', { username: input.username })
            .getOne();
        if (!user || user.password !== input.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const activeSessions = await this.sessionRepository.find({
            where: { user: { id: user.id }, isActive: true },
            order: { createdAt: 'ASC' },
        });
        const maxSessions = parseInt(process.env.MAX_SESSIONS || '5', 10);
        if (activeSessions.length >= maxSessions) {
            const oldestSession = activeSessions[0];
            oldestSession.isActive = false;
            await this.sessionRepository.save(oldestSession);
        }
        const newSession = this.sessionRepository.create({
            sessionId: externalSessionId,
            user,
            isActive: true,
        });
        await this.sessionRepository.save(newSession);
        return {
            user,
            token: 'session_active',
        };
    }
    async logout(sessionId) {
        const session = await this.sessionRepository.findOne({ where: { sessionId } });
        if (session) {
            session.isActive = false;
            await this.sessionRepository.save(session);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.UserSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map
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
exports.ItsmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const itsm_ticket_entity_1 = require("../database/entities/itsm-ticket.entity");
let ItsmService = class ItsmService {
    itsmRepository;
    constructor(itsmRepository) {
        this.itsmRepository = itsmRepository;
    }
    async getItsmTickets(userId) {
        return this.itsmRepository.find({
            where: { user: { id: userId } },
            order: { openDate: 'DESC' }
        });
    }
    async createTicket(input, userId) {
        const newTicket = this.itsmRepository.create({
            category: input.category,
            priority: input.priority,
            subject: input.subject,
            description: input.description,
            status: 'Open',
            assignedTo: 'Unassigned',
            openDate: new Date().toISOString(),
            user: { id: userId },
        });
        return this.itsmRepository.save(newTicket);
    }
    async getItsmDashboard(userId) {
        const tickets = await this.itsmRepository.find({
            where: { user: { id: userId } }
        });
        const resolvedTickets = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed');
        let totalResolutionTimeMs = 0;
        let resolvedCount = 0;
        resolvedTickets.forEach(t => {
            if (t.openDate && t.closeDate) {
                const start = new Date(t.openDate);
                const end = new Date(t.closeDate);
                const diff = end.getTime() - start.getTime();
                if (diff > 0) {
                    totalResolutionTimeMs += diff;
                    resolvedCount++;
                }
            }
        });
        let avgTimeStr = '0h 0m';
        if (resolvedCount > 0) {
            const avgMs = totalResolutionTimeMs / resolvedCount;
            const hours = Math.floor(avgMs / (1000 * 60 * 60));
            const minutes = Math.floor((avgMs % (1000 * 60 * 60)) / (1000 * 60));
            avgTimeStr = `${hours}h ${minutes}m`;
        }
        return {
            stats: {
                openCount: tickets.filter(t => t.status === 'Open').length,
                inProgressCount: tickets.filter(t => t.status === 'In Progress').length,
                resolvedYtd: resolvedTickets.length,
                avgResolutionTime: avgTimeStr,
            },
            recentTickets: tickets.slice(0, 5),
            myAssets: [
                { id: 'ast-1', name: 'MacBook Pro', type: 'Laptop' },
                { id: 'ast-2', name: 'iPhone 15', type: 'Mobile' },
                { id: 'ast-3', name: 'Monitor', type: 'Display' },
            ],
        };
    }
};
exports.ItsmService = ItsmService;
exports.ItsmService = ItsmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(itsm_ticket_entity_1.ItsmTicket)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItsmService);
//# sourceMappingURL=itsm.service.js.map
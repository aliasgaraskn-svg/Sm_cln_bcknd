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
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hr_request_entity_1 = require("../database/entities/hr-request.entity");
const leave_balance_entity_1 = require("../database/entities/leave-balance.entity");
let HrService = class HrService {
    hrRepository;
    balanceRepository;
    constructor(hrRepository, balanceRepository) {
        this.hrRepository = hrRepository;
        this.balanceRepository = balanceRepository;
    }
    async getHrRequests(userId) {
        return this.hrRepository.find({
            where: { user: { id: userId } },
            order: { startDate: 'DESC' }
        });
    }
    async applyLeave(input, userId) {
        const newRequest = this.hrRepository.create({
            title: `${input.type} Leave Request`,
            status: 'Approved',
            startDate: input.startDate,
            endDate: input.endDate,
            description: input.reason,
            type: input.type,
            user: { id: userId },
        });
        const savedRequest = await this.hrRepository.save(newRequest);
        const start = new Date(input.startDate);
        const end = new Date(input.endDate);
        const diffDays = this.calculateBusinessDays(start, end);
        const balance = await this.balanceRepository.findOne({ where: { user: { id: userId } } });
        if (balance) {
            const type = input.type.toLowerCase();
            if (type.includes('casual'))
                balance.casual -= diffDays;
            else if (type.includes('sick'))
                balance.sick -= diffDays;
            else if (type.includes('earned') || type.includes('planned') || type.includes('privilege'))
                balance.earned -= diffDays;
            await this.balanceRepository.save(balance);
        }
        return savedRequest;
    }
    async getHrDashboardData(userId) {
        const requests = await this.hrRepository.find({
            where: { user: { id: userId } },
            order: { startDate: 'DESC' }
        });
        let balance = await this.balanceRepository.findOne({ where: { user: { id: userId } } });
        if (!balance) {
            balance = { total: 18, casual: 8, sick: 6, earned: 4 };
        }
        else {
            balance.total = balance.casual + balance.sick + balance.earned;
        }
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const totalBusinessDaysInMonth = this.calculateBusinessDays(monthStart, monthEnd);
        const businessDaysTillNow = this.calculateBusinessDays(monthStart, now);
        let leaveDaysTillNow = 0;
        requests.forEach(r => {
            if (r.status === 'Approved' && r.startDate) {
                const start = new Date(r.startDate);
                const end = r.endDate ? new Date(r.endDate) : start;
                if (start <= now && end >= monthStart) {
                    const overlapStart = start < monthStart ? monthStart : start;
                    const overlapEnd = end > now ? now : end;
                    leaveDaysTillNow += this.calculateBusinessDays(overlapStart, overlapEnd);
                }
            }
        });
        const targetHours = totalBusinessDaysInMonth * 9;
        const workedHours = (businessDaysTillNow - leaveDaysTillNow) * 9;
        return {
            leaveBalance: balance,
            attendance: {
                workedHours,
                targetHours,
            },
            recentRequests: requests.slice(0, 5),
        };
    }
    calculateBusinessDays(startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        curDate.setHours(0, 0, 0, 0);
        const normalizedEnd = new Date(endDate.getTime());
        normalizedEnd.setHours(23, 59, 59, 999);
        while (curDate <= normalizedEnd) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6)
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hr_request_entity_1.HrRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(leave_balance_entity_1.LeaveBalance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HrService);
//# sourceMappingURL=hr.service.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let HrService = class HrService {
    dataPath = path.resolve(process.cwd(), 'data', 'hr.json');
    loadData() {
        try {
            const content = fs.readFileSync(this.dataPath, 'utf-8');
            return JSON.parse(content);
        }
        catch (e) {
            return {
                requests: [
                    { id: 'HR-101', title: 'Annual Leave Request', status: 'Approved', date: '2026-05-10' },
                    { id: 'HR-102', title: 'Salary Certificate', status: 'Pending', date: '2026-05-12' },
                ],
                balances: { total: 18, casual: 8, sick: 6, earned: 4 }
            };
        }
    }
    saveData(data) {
        fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
    }
    getHrRequests() {
        return this.loadData().requests;
    }
    applyLeave(input) {
        const data = this.loadData();
        const newRequest = {
            id: `HR-${Math.floor(Math.random() * 1000)}`,
            title: `${input.type} Leave`,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
        };
        data.requests.unshift(newRequest);
        const daysRequested = 1;
        if (input.type.toLowerCase().includes('casual'))
            data.balances.casual -= daysRequested;
        else if (input.type.toLowerCase().includes('sick'))
            data.balances.sick -= daysRequested;
        else if (input.type.toLowerCase().includes('privilege'))
            data.balances.earned -= daysRequested;
        data.balances.total -= daysRequested;
        this.saveData(data);
        return newRequest;
    }
    getHrDashboard() {
        const data = this.loadData();
        return {
            leaveBalance: data.balances,
            attendance: {
                workedHours: 152,
                targetHours: 168,
            },
            recentRequests: data.requests,
        };
    }
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)()
], HrService);
//# sourceMappingURL=hr.service.js.map
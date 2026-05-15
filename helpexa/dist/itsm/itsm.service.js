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
exports.ItsmService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ItsmService = class ItsmService {
    dataPath = path.resolve(process.cwd(), 'data', 'itsm.json');
    loadData() {
        try {
            const content = fs.readFileSync(this.dataPath, 'utf-8');
            return JSON.parse(content);
        }
        catch (e) {
            return { tickets: [] };
        }
    }
    saveData(data) {
        fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
    }
    getItsmTickets() {
        return this.loadData().tickets;
    }
    createTicket(input) {
        const data = this.loadData();
        const newTicket = {
            id: `IT-${Math.floor(Math.random() * 9000) + 1000}`,
            category: input.category,
            priority: input.priority,
            subject: input.subject,
            description: input.description,
            status: 'Open',
            assignedTo: 'Unassigned',
            date: new Date().toISOString().split('T')[0],
        };
        data.tickets.unshift(newTicket);
        this.saveData(data);
        return newTicket;
    }
    getItsmDashboard() {
        const data = this.loadData();
        const tickets = data.tickets;
        return {
            stats: {
                openCount: tickets.filter(t => t.status === 'Open').length,
                inProgressCount: tickets.filter(t => t.status === 'In Progress').length,
                resolvedYtd: 47,
                avgResolutionTime: '4h 12m',
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
    (0, common_1.Injectable)()
], ItsmService);
//# sourceMappingURL=itsm.service.js.map
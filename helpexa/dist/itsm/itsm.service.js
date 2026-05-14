"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItsmService = void 0;
const common_1 = require("@nestjs/common");
let ItsmService = class ItsmService {
    tickets = [
        { id: 'IT-2001', issue: 'Laptop screen flickering', status: 'In Progress', assignedTo: 'John Doe' },
        { id: 'IT-2002', issue: 'VPN Access Request', status: 'Resolved', assignedTo: 'Jane Smith' },
    ];
    getItsmTickets() {
        return this.tickets;
    }
};
exports.ItsmService = ItsmService;
exports.ItsmService = ItsmService = __decorate([
    (0, common_1.Injectable)()
], ItsmService);
//# sourceMappingURL=itsm.service.js.map
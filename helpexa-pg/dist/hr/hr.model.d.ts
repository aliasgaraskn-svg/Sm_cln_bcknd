import { HrRequest } from '../database/entities/hr-request.entity';
export declare class LeaveBalance {
    total: number;
    casual: number;
    sick: number;
    earned: number;
}
export declare class AttendanceStats {
    workedHours: number;
    targetHours: number;
}
export declare class HrDashboard {
    leaveBalance: LeaveBalance;
    attendance: AttendanceStats;
    recentRequests: HrRequest[];
}
export declare class ApplyLeaveInput {
    type: string;
    startDate: string;
    endDate: string;
    reason?: string;
    contact: string;
}

export declare class HrRequest {
    id: string;
    title: string;
    status: string;
    date: string;
}
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
    fromDate: string;
    toDate: string;
    reason?: string;
    contact: string;
}

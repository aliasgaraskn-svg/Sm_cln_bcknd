import { HrRequest, HrDashboard, ApplyLeaveInput } from './hr.model';
export declare class HrService {
    private readonly dataPath;
    private loadData;
    private saveData;
    getHrRequests(): HrRequest[];
    applyLeave(input: ApplyLeaveInput): HrRequest;
    getHrDashboard(): HrDashboard;
}

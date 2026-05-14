import { HrService } from './hr.service';
import { HrRequest, HrDashboard, ApplyLeaveInput } from './hr.model';
export declare class HrResolver {
    private readonly hrService;
    constructor(hrService: HrService);
    getHrRequests(): HrRequest[];
    getHrDashboard(): HrDashboard;
    applyLeave(input: ApplyLeaveInput): HrRequest;
}

import { HrService } from './hr.service';
import { HrRequest } from '../database/entities/hr-request.entity';
import { ApplyLeaveInput } from './hr.model';
export declare class HrResolver {
    private readonly hrService;
    constructor(hrService: HrService);
    getHrRequests(context: any): Promise<HrRequest[]>;
    getHrDashboard(context: any): Promise<any>;
    applyLeave(input: ApplyLeaveInput, context: any): Promise<HrRequest>;
}

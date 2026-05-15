import { Repository } from 'typeorm';
import { HrRequest } from '../database/entities/hr-request.entity';
import { LeaveBalance } from '../database/entities/leave-balance.entity';
import { ApplyLeaveInput } from './hr.model';
export declare class HrService {
    private hrRepository;
    private balanceRepository;
    constructor(hrRepository: Repository<HrRequest>, balanceRepository: Repository<LeaveBalance>);
    getHrRequests(userId: string): Promise<HrRequest[]>;
    applyLeave(input: ApplyLeaveInput, userId: string): Promise<HrRequest>;
    getHrDashboardData(userId: string): Promise<any>;
    private calculateBusinessDays;
}

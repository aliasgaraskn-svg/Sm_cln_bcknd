import { ApprovalsService } from './approvals.service';
import { ApprovalItem } from './approvals.model';
export declare class ApprovalsResolver {
    private readonly service;
    constructor(service: ApprovalsService);
    getApprovals(): ApprovalItem[];
}

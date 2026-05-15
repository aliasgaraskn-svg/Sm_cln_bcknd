import { ApprovalsService } from './approvals.service';
import { ApprovalItem } from '../database/entities/approval-item.entity';
export declare class ApprovalsResolver {
    private readonly approvalsService;
    constructor(approvalsService: ApprovalsService);
    getApprovalItems(context: any): Promise<ApprovalItem[]>;
}

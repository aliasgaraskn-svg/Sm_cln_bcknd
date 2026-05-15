import { Repository } from 'typeorm';
import { ApprovalItem } from '../database/entities/approval-item.entity';
export declare class ApprovalsService {
    private approvalsRepository;
    constructor(approvalsRepository: Repository<ApprovalItem>);
    getApprovalItems(userId: string): Promise<ApprovalItem[]>;
}

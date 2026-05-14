import { Injectable } from '@nestjs/common';
import { ApprovalItem } from './approvals.model';

@Injectable()
export class ApprovalsService {
  private items: ApprovalItem[] = [
    { id: 'APP-01', title: 'New Mac Studio Purchase', requestor: 'Jane Smith' },
    { id: 'APP-02', title: 'Marketing Budget Q3', requestor: 'John Doe' },
  ];

  getApprovals(): ApprovalItem[] {
    return this.items;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalItem } from '../database/entities/approval-item.entity';

@Injectable()
export class ApprovalsService {
  constructor(
    @InjectRepository(ApprovalItem)
    private approvalsRepository: Repository<ApprovalItem>,
  ) {}

  async getApprovalItems(userId: string): Promise<ApprovalItem[]> {
    return this.approvalsRepository.find({
      where: { user: { id: userId } },
      order: { create_datetime: 'DESC' }
    });
  }
}

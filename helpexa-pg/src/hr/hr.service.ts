import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { HrRequest } from '../database/entities/hr-request.entity';
import { LeaveBalance } from '../database/entities/leave-balance.entity';
import { ApplyLeaveInput } from './hr.model';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(HrRequest)
    private hrRepository: Repository<HrRequest>,
    @InjectRepository(LeaveBalance)
    private balanceRepository: Repository<LeaveBalance>,
  ) {}

  async getHrRequests(userId: string): Promise<HrRequest[]> {
    return this.hrRepository.find({ 
      where: { user: { id: userId } },
      order: { startDate: 'DESC' } 
    });
  }

  async applyLeave(input: ApplyLeaveInput, userId: string): Promise<HrRequest> {
    const newRequest = this.hrRepository.create({
      title: `${input.type} Leave Request`,
      status: 'Approved',
      startDate: input.startDate,
      endDate: input.endDate,
      description: input.reason,
      type: input.type,
      user: { id: userId } as any,
    });

    const savedRequest = await this.hrRepository.save(newRequest);

    const start = new Date(input.startDate);
    const end = new Date(input.endDate);
    const diffDays = this.calculateBusinessDays(start, end);

    const balance = await this.balanceRepository.findOne({ where: { user: { id: userId } } });
    if (balance) {
      const type = input.type.toLowerCase();
      if (type.includes('casual')) balance.casual -= diffDays;
      else if (type.includes('sick')) balance.sick -= diffDays;
      else if (type.includes('earned') || type.includes('planned') || type.includes('privilege')) balance.earned -= diffDays;
      
      await this.balanceRepository.save(balance);
    }

    return savedRequest;
  }

  async getHrDashboardData(userId: string): Promise<any> {
    const requests = await this.hrRepository.find({ 
      where: { user: { id: userId } },
      order: { startDate: 'DESC' } 
    });

    let balance = await this.balanceRepository.findOne({ where: { user: { id: userId } } });
    if (!balance) {
      balance = { total: 18, casual: 8, sick: 6, earned: 4 } as any;
    } else {
      (balance as any).total = balance.casual + balance.sick + balance.earned;
    }

    // --- Dynamic Attendance Logic ---
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    // 1. Business days in the ENTIRE month for Target
    const totalBusinessDaysInMonth = this.calculateBusinessDays(monthStart, monthEnd);
    
    // 2. Business days TILL CURRENT DATE
    const businessDaysTillNow = this.calculateBusinessDays(monthStart, now);
    
    // 3. Subtract leaves taken THIS MONTH TILL NOW
    let leaveDaysTillNow = 0;
    requests.forEach(r => {
      if (r.status === 'Approved' && r.startDate) {
        const start = new Date(r.startDate);
        const end = r.endDate ? new Date(r.endDate) : start;
        
        // Calculate overlap with [monthStart, now]
        if (start <= now && end >= monthStart) {
          const overlapStart = start < monthStart ? monthStart : start;
          const overlapEnd = end > now ? now : end;
          leaveDaysTillNow += this.calculateBusinessDays(overlapStart, overlapEnd);
        }
      }
    });

    const targetHours = totalBusinessDaysInMonth * 9;
    const workedHours = (businessDaysTillNow - leaveDaysTillNow) * 9;

    return {
      leaveBalance: balance,
      attendance: {
        workedHours,
        targetHours,
      },
      recentRequests: requests.slice(0, 5),
    };
  }

  private calculateBusinessDays(startDate: Date, endDate: Date): number {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    // Normalize to prevent time issues
    curDate.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(endDate.getTime());
    normalizedEnd.setHours(23, 59, 59, 999);

    while (curDate <= normalizedEnd) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
}

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { HrRequest, HrDashboard, ApplyLeaveInput } from './hr.model';

@Injectable()
export class HrService {
  private readonly dataPath = path.resolve(process.cwd(), 'data', 'hr.json');


  private loadData() {
    try {
      const content = fs.readFileSync(this.dataPath, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      // Fallback if file doesn't exist
      return {
        requests: [
          { id: 'HR-101', title: 'Annual Leave Request', status: 'Approved', date: '2026-05-10' },
          { id: 'HR-102', title: 'Salary Certificate', status: 'Pending', date: '2026-05-12' },
        ],
        balances: { total: 18, casual: 8, sick: 6, earned: 4 }
      };
    }
  }

  private saveData(data: any) {
    fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
  }

  getHrRequests(): HrRequest[] {
    return this.loadData().requests;
  }

  applyLeave(input: ApplyLeaveInput): HrRequest {
    const data = this.loadData();
    
    const newRequest: HrRequest = {
      id: `HR-${Math.floor(Math.random() * 1000)}`,
      title: `${input.type} Leave`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };

    data.requests.unshift(newRequest);

    const daysRequested = 1; 
    if (input.type.toLowerCase().includes('casual')) data.balances.casual -= daysRequested;
    else if (input.type.toLowerCase().includes('sick')) data.balances.sick -= daysRequested;
    else if (input.type.toLowerCase().includes('privilege')) data.balances.earned -= daysRequested;
    
    data.balances.total -= daysRequested;

    this.saveData(data);
    return newRequest;
  }

  getHrDashboard(): HrDashboard {
    const data = this.loadData();
    return {
      leaveBalance: data.balances,
      attendance: {
        workedHours: 152,
        targetHours: 168,
      },
      recentRequests: data.requests,
    };
  }
}




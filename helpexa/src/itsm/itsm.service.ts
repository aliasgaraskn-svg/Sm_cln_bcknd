import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ItsmTicket, CreateTicketInput } from './itsm.model';

@Injectable()
export class ItsmService {
  private readonly dataPath = path.resolve(process.cwd(), 'data', 'itsm.json');

  private loadData() {
    try {
      const content = fs.readFileSync(this.dataPath, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      return { tickets: [] };
    }
  }

  private saveData(data: any) {
    fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
  }

  getItsmTickets(): ItsmTicket[] {
    return this.loadData().tickets;
  }

  createTicket(input: CreateTicketInput): ItsmTicket {
    const data = this.loadData();
    
    const newTicket: ItsmTicket = {
      id: `IT-${Math.floor(Math.random() * 9000) + 1000}`,
      category: input.category,
      priority: input.priority,
      subject: input.subject,
      description: input.description,
      status: 'Open',
      assignedTo: 'Unassigned',
      date: new Date().toISOString().split('T')[0],
    };

    data.tickets.unshift(newTicket);
    this.saveData(data);
    return newTicket;
  }

  getItsmDashboard(): any {
    const data = this.loadData();
    const tickets = data.tickets as ItsmTicket[];
    
    return {
      stats: {
        openCount: tickets.filter(t => t.status === 'Open').length,
        inProgressCount: tickets.filter(t => t.status === 'In Progress').length,
        resolvedYtd: 47, // Mock data matching screenshot
        avgResolutionTime: '4h 12m',
      },
      recentTickets: tickets.slice(0, 5),
      myAssets: [
        { id: 'ast-1', name: 'MacBook Pro', type: 'Laptop' },
        { id: 'ast-2', name: 'iPhone 15', type: 'Mobile' },
        { id: 'ast-3', name: 'Monitor', type: 'Display' },
      ],
    };
  }
}

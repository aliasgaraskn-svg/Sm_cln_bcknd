import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItsmTicket } from '../database/entities/itsm-ticket.entity';
import { CreateTicketInput } from './itsm.model';

@Injectable()
export class ItsmService {
  constructor(
    @InjectRepository(ItsmTicket)
    private itsmRepository: Repository<ItsmTicket>,
  ) {}

  async getItsmTickets(userId: string): Promise<ItsmTicket[]> {
    return this.itsmRepository.find({ 
      where: { user: { id: userId } },
      order: { openDate: 'DESC' } 
    });
  }

  async createTicket(input: CreateTicketInput, userId: string): Promise<ItsmTicket> {
    const newTicket = this.itsmRepository.create({
      category: input.category,
      priority: input.priority,
      subject: input.subject,
      description: input.description,
      status: 'Open',
      assignedTo: 'Unassigned',
      openDate: new Date().toISOString(),
      user: { id: userId } as any,
    });
    return this.itsmRepository.save(newTicket);
  }

  async getItsmDashboard(userId: string): Promise<any> {
    const tickets = await this.itsmRepository.find({
      where: { user: { id: userId } }
    });
    
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed');
    
    let totalResolutionTimeMs = 0;
    let resolvedCount = 0;

    resolvedTickets.forEach(t => {
      if (t.openDate && t.closeDate) {
        const start = new Date(t.openDate);
        const end = new Date(t.closeDate);
        const diff = end.getTime() - start.getTime();
        if (diff > 0) {
          totalResolutionTimeMs += diff;
          resolvedCount++;
        }
      }
    });

    let avgTimeStr = '0h 0m';
    if (resolvedCount > 0) {
      const avgMs = totalResolutionTimeMs / resolvedCount;
      const hours = Math.floor(avgMs / (1000 * 60 * 60));
      const minutes = Math.floor((avgMs % (1000 * 60 * 60)) / (1000 * 60));
      avgTimeStr = `${hours}h ${minutes}m`;
    }

    return {
      stats: {
        openCount: tickets.filter(t => t.status === 'Open').length,
        inProgressCount: tickets.filter(t => t.status === 'In Progress').length,
        resolvedYtd: resolvedTickets.length,
        avgResolutionTime: avgTimeStr,
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

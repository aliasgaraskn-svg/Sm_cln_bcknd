import { Injectable } from '@nestjs/common';
import { ItsmTicket } from './itsm.model';

@Injectable()
export class ItsmService {
  private tickets: ItsmTicket[] = [
    { id: 'IT-2001', issue: 'Laptop screen flickering', status: 'In Progress', assignedTo: 'John Doe' },
    { id: 'IT-2002', issue: 'VPN Access Request', status: 'Resolved', assignedTo: 'Jane Smith' },
  ];

  getItsmTickets(): ItsmTicket[] {
    return this.tickets;
  }
}

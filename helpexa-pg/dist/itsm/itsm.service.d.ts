import { Repository } from 'typeorm';
import { ItsmTicket } from '../database/entities/itsm-ticket.entity';
import { CreateTicketInput } from './itsm.model';
export declare class ItsmService {
    private itsmRepository;
    constructor(itsmRepository: Repository<ItsmTicket>);
    getItsmTickets(userId: string): Promise<ItsmTicket[]>;
    createTicket(input: CreateTicketInput, userId: string): Promise<ItsmTicket>;
    getItsmDashboard(userId: string): Promise<any>;
}

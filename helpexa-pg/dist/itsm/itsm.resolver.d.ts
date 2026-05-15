import { ItsmService } from './itsm.service';
import { ItsmTicket } from '../database/entities/itsm-ticket.entity';
import { CreateTicketInput } from './itsm.model';
export declare class ItsmResolver {
    private readonly itsmService;
    constructor(itsmService: ItsmService);
    getItsmTickets(context: any): Promise<ItsmTicket[]>;
    getItsmDashboard(context: any): Promise<any>;
    createTicket(input: CreateTicketInput, context: any): Promise<ItsmTicket>;
}

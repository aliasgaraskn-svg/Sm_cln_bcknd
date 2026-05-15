import { ItsmService } from './itsm.service';
import { ItsmTicket, CreateTicketInput } from './itsm.model';
export declare class ItsmResolver {
    private readonly itsmService;
    constructor(itsmService: ItsmService);
    getItsmTickets(): ItsmTicket[];
    getItsmDashboard(): any;
    createTicket(input: CreateTicketInput): ItsmTicket;
}

import { ItsmTicket, CreateTicketInput } from './itsm.model';
export declare class ItsmService {
    private readonly dataPath;
    private loadData;
    private saveData;
    getItsmTickets(): ItsmTicket[];
    createTicket(input: CreateTicketInput): ItsmTicket;
    getItsmDashboard(): any;
}

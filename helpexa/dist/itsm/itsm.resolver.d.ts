import { ItsmService } from './itsm.service';
import { ItsmTicket } from './itsm.model';
export declare class ItsmResolver {
    private readonly itsmService;
    constructor(itsmService: ItsmService);
    getItsmTickets(): ItsmTicket[];
}

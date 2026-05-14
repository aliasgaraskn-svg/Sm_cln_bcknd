import { Resolver, Query } from '@nestjs/graphql';
import { ItsmService } from './itsm.service';
import { ItsmTicket } from './itsm.model';

@Resolver(() => ItsmTicket)
export class ItsmResolver {
  constructor(private readonly itsmService: ItsmService) {}

  @Query(() => [ItsmTicket], { name: 'itsmTickets' })
  getItsmTickets() {
    return this.itsmService.getItsmTickets();
  }
}

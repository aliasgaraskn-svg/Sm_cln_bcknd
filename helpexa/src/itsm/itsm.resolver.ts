import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItsmService } from './itsm.service';
import { ItsmTicket, CreateTicketInput, ItsmDashboard } from './itsm.model';

@Resolver(() => ItsmTicket)
export class ItsmResolver {
  constructor(private readonly itsmService: ItsmService) {}

  @Query(() => [ItsmTicket], { name: 'itsmTickets' })
  getItsmTickets() {
    return this.itsmService.getItsmTickets();
  }

  @Query(() => ItsmDashboard, { name: 'itsmDashboard' })
  getItsmDashboard() {
    return this.itsmService.getItsmDashboard();
  }

  @Mutation(() => ItsmTicket)
  createTicket(@Args('input') input: CreateTicketInput) {
    return this.itsmService.createTicket(input);
  }
}

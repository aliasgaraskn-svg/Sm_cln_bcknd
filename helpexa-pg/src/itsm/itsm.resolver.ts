import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ItsmService } from './itsm.service';
import { ItsmTicket } from '../database/entities/itsm-ticket.entity';
import { CreateTicketInput, ItsmDashboard } from './itsm.model';

@Resolver(() => ItsmTicket)
export class ItsmResolver {
  constructor(private readonly itsmService: ItsmService) {}

  @Query(() => [ItsmTicket], { name: 'itsmTickets' })
  async getItsmTickets(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.itsmService.getItsmTickets(userId);
  }

  @Query(() => ItsmDashboard, { name: 'itsmDashboard' })
  async getItsmDashboard(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.itsmService.getItsmDashboard(userId);
  }

  @Mutation(() => ItsmTicket)
  async createTicket(@Args('input') input: CreateTicketInput, @Context() context: any) {
    const userId = context.req.session.userId;
    return this.itsmService.createTicket(input, userId);
  }
}

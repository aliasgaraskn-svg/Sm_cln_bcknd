import { Resolver, Query, Context } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { ExpenseItem } from '../database/entities/expense-item.entity';

@Resolver(() => ExpenseItem)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Query(() => [ExpenseItem], { name: 'expenseItems' })
  async getExpenseItems(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.expenseService.getExpenseItems(userId);
  }
}

import { Resolver, Query } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { ExpenseItem } from './expense.model';

@Resolver(() => ExpenseItem)
export class ExpenseResolver {
  constructor(private readonly service: ExpenseService) {}

  @Query(() => [ExpenseItem], { name: 'expenseItems' })
  getExpenseItems() {
    return this.service.getExpenseItems();
  }
}

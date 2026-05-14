import { Module } from '@nestjs/common';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';

@Module({
  providers: [ExpenseResolver, ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}

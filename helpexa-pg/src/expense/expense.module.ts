import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { ExpenseItem } from '../database/entities/expense-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseItem])],
  providers: [ExpenseResolver, ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}

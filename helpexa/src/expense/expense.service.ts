import { Injectable } from '@nestjs/common';
import { ExpenseItem } from './expense.model';

@Injectable()
export class ExpenseService {
  private items: ExpenseItem[] = [
    { id: 'expense-1', title: 'Sample ExpenseItem 1' },
    { id: 'expense-2', title: 'Sample ExpenseItem 2' },
  ];

  getExpenseItems(): ExpenseItem[] {
    return this.items;
  }
}

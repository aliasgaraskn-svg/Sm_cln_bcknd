import { ExpenseService } from './expense.service';
import { ExpenseItem } from '../database/entities/expense-item.entity';
export declare class ExpenseResolver {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    getExpenseItems(context: any): Promise<ExpenseItem[]>;
}

import { Repository } from 'typeorm';
import { ExpenseItem } from '../database/entities/expense-item.entity';
export declare class ExpenseService {
    private expenseRepository;
    constructor(expenseRepository: Repository<ExpenseItem>);
    getExpenseItems(userId: string): Promise<ExpenseItem[]>;
}

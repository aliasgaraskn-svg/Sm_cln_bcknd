import { ExpenseService } from './expense.service';
import { ExpenseItem } from './expense.model';
export declare class ExpenseResolver {
    private readonly service;
    constructor(service: ExpenseService);
    getExpenseItems(): ExpenseItem[];
}

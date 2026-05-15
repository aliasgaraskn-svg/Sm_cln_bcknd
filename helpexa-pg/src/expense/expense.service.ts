import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseItem } from '../database/entities/expense-item.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseItem)
    private expenseRepository: Repository<ExpenseItem>,
  ) {}

  async getExpenseItems(userId: string): Promise<ExpenseItem[]> {
    return this.expenseRepository.find({
      where: { user: { id: userId } },
      order: { create_datetime: 'DESC' }
    });
  }
}

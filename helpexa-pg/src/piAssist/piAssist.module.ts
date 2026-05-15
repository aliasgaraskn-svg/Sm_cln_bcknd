import { Module } from '@nestjs/common';
import { PiAssistResolver } from './piAssist.resolver';
import { PiAssistService } from './piAssist.service';
import { AgentService } from './agent.service';
import { HrModule } from '../hr/hr.module';
import { ItsmModule } from '../itsm/itsm.module';
import { ExpenseModule } from '../expense/expense.module';
import { ConfigModule } from '@nestjs/config';
import { LearningModule } from '../learning/learning.module';
import { ApprovalsModule } from '../approvals/approvals.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '../database/entities/chat-message.entity';

@Module({
  imports: [
    ConfigModule, 
    HrModule, 
    ItsmModule, 
    ExpenseModule, 
    LearningModule,
    ApprovalsModule,
    TypeOrmModule.forFeature([ChatMessage])
  ],
  providers: [PiAssistResolver, PiAssistService, AgentService],
  exports: [PiAssistService]
})
export class PiAssistModule {}

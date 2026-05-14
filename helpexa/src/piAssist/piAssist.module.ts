import { Module } from '@nestjs/common';
import { PiAssistResolver } from './piAssist.resolver';
import { PiAssistService } from './piAssist.service';
import { AgentService } from './agent.service';
import { HrModule } from '../hr/hr.module';
import { ItsmModule } from '../itsm/itsm.module';
import { ExpenseModule } from '../expense/expense.module';

import { ConfigModule } from '@nestjs/config';
import { LearningModule } from '../learning/learning.module';

@Module({
  imports: [ConfigModule, HrModule, ItsmModule, ExpenseModule, LearningModule],
  providers: [PiAssistResolver, PiAssistService, AgentService],
})
export class PiAssistModule {}



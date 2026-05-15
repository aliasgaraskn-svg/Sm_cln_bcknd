import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItsmService } from './itsm.service';
import { ItsmResolver } from './itsm.resolver';
import { ItsmTicket } from '../database/entities/itsm-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItsmTicket])],
  providers: [ItsmService, ItsmResolver],
  exports: [ItsmService],
})
export class ItsmModule {}

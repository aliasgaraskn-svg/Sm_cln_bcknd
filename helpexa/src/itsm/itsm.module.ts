import { Module } from '@nestjs/common';
import { ItsmResolver } from './itsm.resolver';
import { ItsmService } from './itsm.service';

@Module({
  providers: [ItsmResolver, ItsmService],
  exports: [ItsmService],
})
export class ItsmModule {}

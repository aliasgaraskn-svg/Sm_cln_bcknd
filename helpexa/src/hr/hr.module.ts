import { Module } from '@nestjs/common';
import { HrResolver } from './hr.resolver';
import { HrService } from './hr.service';

@Module({
  providers: [HrResolver, HrService],
  exports: [HrService],
})
export class HrModule {}

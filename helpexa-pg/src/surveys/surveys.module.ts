import { Module } from '@nestjs/common';
import { SurveysResolver } from './surveys.resolver';
import { SurveysService } from './surveys.service';

@Module({
  providers: [SurveysResolver, SurveysService],
})
export class SurveysModule {}

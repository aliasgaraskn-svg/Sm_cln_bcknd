import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningResolver } from './learning.resolver';
import { LearningService } from './learning.service';
import { Course } from '../database/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [LearningResolver, LearningService],
  exports: [LearningService],
})
export class LearningModule {}

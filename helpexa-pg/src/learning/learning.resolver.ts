import { Resolver, Query, Context } from '@nestjs/graphql';
import { LearningService } from './learning.service';
import { Course } from '../database/entities/course.entity';

@Resolver(() => Course)
export class LearningResolver {
  constructor(private readonly learningService: LearningService) {}

  @Query(() => [Course], { name: 'myCourses' })
  async getMyCourses(@Context() context: any) {
    const userId = context.req.session.userId;
    return this.learningService.getMyCourses(userId);
  }
}

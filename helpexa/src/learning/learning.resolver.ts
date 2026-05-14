import { Resolver, Query } from '@nestjs/graphql';
import { LearningService } from './learning.service';
import { Course } from './learning.model';

@Resolver(() => Course)
export class LearningResolver {
  constructor(private readonly service: LearningService) {}

  @Query(() => [Course], { name: 'learningItems' })
  getCourses() {
    return this.service.getCourses();
  }
}

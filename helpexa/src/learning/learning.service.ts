import { Injectable } from '@nestjs/common';
import { Course } from './learning.model';

@Injectable()
export class LearningService {
  private items: Course[] = [
    { id: 'learning-1', title: 'Sample Course 1' },
    { id: 'learning-2', title: 'Sample Course 2' },
  ];

  getCourses(): Course[] {
    return this.items;
  }
}

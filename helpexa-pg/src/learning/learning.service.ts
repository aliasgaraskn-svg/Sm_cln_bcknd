import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../database/entities/course.entity';

@Injectable()
export class LearningService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async getMyCourses(userId: string): Promise<Course[]> {
    return this.courseRepository.find({
      where: { user: { id: userId } },
      order: { create_datetime: 'DESC' }
    });
  }
}

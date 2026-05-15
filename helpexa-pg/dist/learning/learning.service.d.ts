import { Repository } from 'typeorm';
import { Course } from '../database/entities/course.entity';
export declare class LearningService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    getMyCourses(userId: string): Promise<Course[]>;
}

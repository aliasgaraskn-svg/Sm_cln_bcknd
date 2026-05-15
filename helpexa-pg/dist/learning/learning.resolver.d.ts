import { LearningService } from './learning.service';
import { Course } from '../database/entities/course.entity';
export declare class LearningResolver {
    private readonly learningService;
    constructor(learningService: LearningService);
    getMyCourses(context: any): Promise<Course[]>;
}

import { LearningService } from './learning.service';
import { Course } from './learning.model';
export declare class LearningResolver {
    private readonly service;
    constructor(service: LearningService);
    getCourses(): Course[];
}

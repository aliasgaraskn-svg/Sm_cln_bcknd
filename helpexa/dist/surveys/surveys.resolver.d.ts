import { SurveysService } from './surveys.service';
import { SurveyItem } from './surveys.model';
export declare class SurveysResolver {
    private readonly service;
    constructor(service: SurveysService);
    getSurveys(): SurveyItem[];
}

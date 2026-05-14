import { Injectable } from '@nestjs/common';
import { SurveyItem } from './surveys.model';

@Injectable()
export class SurveysService {
  private items: SurveyItem[] = [
    { id: 'SRV-01', title: 'Workplace Satisfaction 2026', deadline: '2026-06-30' },
    { id: 'SRV-02', title: 'Remote Work Feedback', deadline: '2026-05-20' },
  ];

  getSurveys(): SurveyItem[] {
    return this.items;
  }
}

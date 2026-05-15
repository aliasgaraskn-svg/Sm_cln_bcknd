import { Resolver, Query } from '@nestjs/graphql';
import { SurveysService } from './surveys.service';
import { SurveyItem } from './surveys.model';

@Resolver(() => SurveyItem)
export class SurveysResolver {
  constructor(private readonly service: SurveysService) {}

  @Query(() => [SurveyItem], { name: 'surveys' })
  getSurveys() {
    return this.service.getSurveys();
  }
}

import { Resolver, Query } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { UserProfile } from './profile.model';

@Resolver(() => UserProfile)
export class ProfileResolver {
  constructor(private readonly service: ProfileService) {}

  @Query(() => [UserProfile], { name: 'profileItems' })
  getUserProfiles() {
    return this.service.getUserProfiles();
  }
}

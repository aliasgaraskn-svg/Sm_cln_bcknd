import { Injectable } from '@nestjs/common';
import { UserProfile } from './profile.model';

@Injectable()
export class ProfileService {
  private items: UserProfile[] = [
    { id: 'profile-1', title: 'Sample UserProfile 1' },
    { id: 'profile-2', title: 'Sample UserProfile 2' },
  ];

  getUserProfiles(): UserProfile[] {
    return this.items;
  }
}

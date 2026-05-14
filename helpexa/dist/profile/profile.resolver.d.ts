import { ProfileService } from './profile.service';
import { UserProfile } from './profile.model';
export declare class ProfileResolver {
    private readonly service;
    constructor(service: ProfileService);
    getUserProfiles(): UserProfile[];
}

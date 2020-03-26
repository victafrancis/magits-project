import { User } from '../user/user';
import { Membership } from '../membership/membership';
import { Session } from 'protractor';
import { Schedule } from '../schedule/schedule';

export class Course {
    _id: String;
    name: String;
    details: String;
    max_students: Number;
    age_min: Number;
    age_max: Number;
    parental_consent: Boolean;
    members: [{ user: User, membership: Membership}];
    instructors: [{user: User}];
    schedule: [{schedule: Schedule}];
    sessions: [{session: Session}];
    session_membership: {membership: Membership};
    subscription_membership: {membership: Membership};
    
 }
import { User } from '../user/user';
import { Membership } from '../membership/membership';
import { Schedule } from '../schedule';
import { Session } from 'protractor';

export class Course {
    _id: String;
    name: String;
    details: String;
    max_students: Number;
    members: [{ user: User, membership: Membership}];
    instructors: [{user: User}];
    schedule: [{schedule: Schedule}];
    sessions: [{session: Session}];
    session_membership: {membership: Membership};
    subscription_membership: {membership: Membership};
 }
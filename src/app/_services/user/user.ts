import { Course } from '../course/course';
import { Membership } from '../membership/membership';
import { Session } from '../session/session';
import { Feedback } from '../feedback/feedback';
import { Announcement } from '../announcement';

export class User {
    _id: String;
    firstname: String;
    lastname: String;
    birthdate: Date;
    email: String;
    password: String;
    role: String;
    courses: [{course: Course, 
        membership: Membership, 
        sessions_remaining: Number}];
    sessions: [{session: Session}];
    feedback: [{feedback: Feedback}];
    announcements: [{announcements: Announcement}];
 }

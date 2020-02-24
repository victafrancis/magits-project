import { User } from '../user/user';

export class Announcement {
    _id: String;
    date: String;
    subject: String;
    content: String;  
    user: {user: User};
 }
import { User } from '../user/user';
import { Feedback } from '../feedback/feedback';
import { Course } from '../course/course';

export class Session {
  _id: String;
  date: String;
  start_time: Date;
  end_time: Date;
  open: Boolean;
  course: String;
  attendees: [{member: User, time: Date}];
  feedback: [{feedback: Feedback}];
}

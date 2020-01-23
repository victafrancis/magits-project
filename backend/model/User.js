const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  birthdate: {
    type: Date
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
  courses: [{
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    membership: {type: Schema.Types.ObjectId, ref: 'Membership'},
    sessions_remaining: Number,
    _id: false
  }],
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  announcements: [{ type: Schema.Types.ObjectId, ref: 'Announcement' }]
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)


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
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  announcements: { type: Schema.Types.ObjectId, ref: 'Announcement' }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let User = require('./User');

// Define collection and schema
let Session = new Schema({
  date: {
    type: Date
  },
  start_time: {
    type: String
  },
  duration: {
    type: Number
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
}, {
  collection: 'sessions'
})

module.exports = mongoose.model('Session', Session)


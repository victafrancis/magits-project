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
  end_time: {
    type: String
  },
  open: {
    type: Boolean
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  attendees:[{
    member: {type: Schema.Types.ObjectId, ref: 'User'},
    time: {type: Date},
    _id: false
  }],
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
}, {
  collection: 'sessions'
})

module.exports = mongoose.model('Session', Session)


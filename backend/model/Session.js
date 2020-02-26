const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let User = require('./User');

// Define collection and schema
let Session = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  start_time: {
    type: Date
  },
  end_time: {
    type: Date
  },
  open: {
    type: Boolean,
    default: true
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  attendees:[{
    member: {type: Schema.Types.ObjectId, ref: 'User'},
    time: {type: Date, default: Date.now},
    _id: false
  }],
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
}, {
  collection: 'sessions'
})

module.exports = mongoose.model('Session', Session)


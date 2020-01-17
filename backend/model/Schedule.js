const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Schedule = new Schema({
  day: {
    type: String
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course' }
}, {
  collection: 'schedule'
})

module.exports = mongoose.model('Schedule', Schedule)


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Feedback = new Schema({
  content: {
    type: String
  },
  date: {
    type: Date
  },
  member: { type: Schema.Types.ObjectId, ref: 'User' },
  session: { type: Schema.Types.ObjectId, ref: 'Session' }
}, {
  collection: 'feedback'
})

module.exports = mongoose.model('Feedback', Feedback)


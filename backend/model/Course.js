const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Course = new Schema({
  name: {
    type: String
  },
  details: {
    type: String
  },
  max_students: {
    type: Number
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  instructors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
  session_membership_id: { type: Schema.Types.ObjectId, ref: 'Membership' },
  subscription_membership_id: { type: Schema.Types.ObjectId, ref: 'Membership' }
}, {
  collection: 'courses'
})

module.exports = mongoose.model('Course', Course)


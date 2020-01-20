const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Membership = new Schema({
  membership_type: {
    type: String
  },
  cost: {
    type: Number
  },
  number_of_sessions: {
    type: Number
  },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' }
}, {
  collection: 'memberships'
})

module.exports = mongoose.model('Membership', Membership)


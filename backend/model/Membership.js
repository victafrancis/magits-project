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
  sessions_remaining: {
    type: Number
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Courses' }]
}, {
  collection: 'memberships'
})

module.exports = mongoose.model('Membership', Membership)


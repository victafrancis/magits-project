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
  members: [{
    member: {type: Schema.Types.ObjectId, ref: 'User'},
    membership: {type: Schema.Types.ObjectId, ref: 'Membership'},
    _id: false
  }],
  instructors: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule', autopopulate: true }],
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Sessions'}],
  session_membership: { type: Schema.Types.ObjectId, ref: 'Membership', autopopulate: true },
  subscription_membership: { type: Schema.Types.ObjectId, ref: 'Membership', autopopulate: true }
}, {
  collection: 'courses'
})
Course.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Course', Course)


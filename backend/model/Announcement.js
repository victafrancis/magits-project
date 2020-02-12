const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Announcement = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: String
  },
  content: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true }
}, {
  collection: 'announcements'
})
Announcement.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Announcement', Announcement)

